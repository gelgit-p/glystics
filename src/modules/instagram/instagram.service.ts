import { Injectable, OnModuleDestroy } from '@nestjs/common';
import {
	IgApiClient,
	RealtimeClient,
	useMultiFileAuthState,
} from 'instagram-bot-api';

@Injectable()
export class InstagramService implements OnModuleDestroy {
	private client?: InstanceType<typeof IgApiClient>;
	private realtime?: InstanceType<typeof RealtimeClient>;
	private authState?: Awaited<ReturnType<typeof useMultiFileAuthState>>;
	private initialization?: Promise<InstanceType<typeof IgApiClient>>;
	private realtimeInitialization?: Promise<void>;

	async initialize(): Promise<InstanceType<typeof IgApiClient>> {
		if (this.client) {
			return this.client;
		}

		if (!this.initialization) {
			this.initialization = this.login();
		}

		try {
			this.client = await this.initialization;
			return this.client;
		} finally {
			this.initialization = undefined;
		}
	}

	async startRealtime(): Promise<void> {
		if (this.realtime) {
			return;
		}

		if (!this.realtimeInitialization) {
			this.realtimeInitialization = this.connectRealtime();
		}

		try {
			await this.realtimeInitialization;
		} finally {
			this.realtimeInitialization = undefined;
		}
	}

	/**
	 * Send a message to one user.
	 */
	async sendMessage(
		username: string,
		message: string,
	): Promise<void> {
		const ig = await this.initialize();

		const userId = await ig.user.getIdByUsername(username);

		// Adjust this call if your installed version exposes
		// direct messaging under a different API.
		const thread = await ig.entity.directThread([userId]);

		await thread.broadcastText(message);
	}

	/**
	 * Bulk messaging.
	 *
	 * Keep recipients limited to people who have opted in /
	 * expect the messages.
	 */
	async bulkMessage(
		usernames: string[],
		message: string,
		delayMs = 5000,
	): Promise<void> {
		if (!usernames.length) {
			return;
		}

		if (!message.trim()) {
			throw new Error('Message cannot be empty');
		}

		for (const username of usernames) {
			await this.sendMessage(username, message);

			console.log(
				`Instagram message sent to @${username}`,
			);

			// Rate-limit between recipients.
			if (username !== usernames[usernames.length - 1]) {
				await this.sleep(delayMs);
			}
		}
	}

	/**
	 * Convenience function with michael9782d as the target.
	 */
	async messageMichael(message: string): Promise<void> {
		await this.bulkMessage(
			['michael9782d'],
			message,
		);
	}

	private sleep(ms: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

	async onModuleDestroy(): Promise<void> {
		await this.realtime?.disconnect();

		this.realtime = undefined;
		this.client = undefined;
		this.authState = undefined;
	}

	private async connectRealtime(): Promise<void> {
		const client = await this.initialize();
		const realtime = new RealtimeClient(client);

		realtime.on('message', (payload) => {
			const { message, thread } = payload;
			const text =
				typeof message?.text === 'string'
					? message.text
					: '';

			console.log(
				`New message in ${thread.thread_id}: ${text}`,
			);

			if (text.toLowerCase() === 'hi') {
				void thread.broadcastText(
					'Hello! This is an automated response.',
				);
			}
		});

		await realtime.connect();
		this.realtime = realtime;
	}

	private async login(): Promise<InstanceType<typeof IgApiClient>> {
		const username = process.env.IG_USERNAME;
		const password = process.env.IG_PASSWORD;

		if (!username || !password) {
			throw new Error(
				'IG_USERNAME and IG_PASSWORD must be configured',
			);
		}

		const client = new IgApiClient();

		client.state.generateDevice(username);

		if (process.env.IG_PROXY_URL) {
			client.state.proxyUrl = process.env.IG_PROXY_URL;
		}

		this.authState = await useMultiFileAuthState(
			process.env.IG_AUTH_DIR ?? './auth_sessions',
		);

		if (await this.authState.loadCreds(client)) {
			return client;
		}

		await client.account.login(username, password);
		await this.authState.saveCreds(client);

		return client;
	}
}