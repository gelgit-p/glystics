import {
	Body,
	Controller,
	Post,
} from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { MessageDto } from './dto/instagram.dto';

@Controller('instagram')
export class InstagramController {
	constructor(
		private readonly instagramService: InstagramService,
	) {}

	/**
	 * Initialize/login to Instagram.
	 */
	@Post('initialize')
	async initialize() {
		await this.instagramService.initialize();

		return {
			success: true,
			message: 'Instagram client initialized successfully',
		};
	}

	/**
	 * Start Instagram realtime messaging.
	 */
	@Post('realtime/start')
	async startRealtime() {
		await this.instagramService.startRealtime();

		return {
			success: true,
			message: 'Instagram realtime client started successfully',
		};
	}

	/**
	 * Send a message specifically to michael9782d.
	 *
	 * POST /instagram/message/michael
	 * {
	 *   "message": "Hello Michael!"
	 * }
	 */
	@Post('message/michael')
	async messageMichael(
		@Body() dto: MessageDto,
	) {
		const { message } = dto;

		if (!message?.trim()) {
			return {
				success: false,
				message: 'Message is required',
			};
		}

		await this.instagramService.messageMichael(message);

		return {
			success: true,
			target: 'michael9782d',
			message: 'Instagram message sent successfully',
		};
	}

	/**
	 * Bulk message users.
	 *
	 * POST /instagram/message/bulk
	 *
	 * {
	 *   "usernames": [
	 *     "michael9782d",
	 *     "user2",
	 *     "user3"
	 *   ],
	 *   "message": "Hello!",
	 *   "delayMs": 5000
	 * }
	 */
	@Post('message/bulk')
	async bulkMessage(
		@Body()
		body: {
			usernames: string[];
			message: string;
			delayMs?: number;
		},
	) {
		const {
			usernames,
			message,
			delayMs = 5000,
		} = body;

		if (!Array.isArray(usernames) || usernames.length === 0) {
			return {
				success: false,
				message: 'usernames must be a non-empty array',
			};
		}

		if (!message?.trim()) {
			return {
				success: false,
				message: 'Message is required',
			};
		}

		await this.instagramService.bulkMessage(
			usernames,
			message,
			delayMs,
		);

		return {
			success: true,
			count: usernames.length,
			message: 'Bulk Instagram messaging completed',
		};
	}
}
// ```

// ### Add it to your module

// ```ts
// import { Module } from '@nestjs/common';
// import { InstagramController } from './instagram.controller';
// import { InstagramService } from './instagram.service';

// @Module({
// 	controllers: [InstagramController],
// 	providers: [InstagramService],
// 	exports: [InstagramService],
// })
// export class InstagramModule {}
// ```

// Then import the module in `AppModule`:

// ```ts
// import { Module } from '@nestjs/common';
// import { InstagramModule } from './instagram/instagram.module';

// @Module({
// 	imports: [
// 		InstagramModule,
// 	],
// })
// export class AppModule {}
// ```

// ### API calls

// Send to your specific target:

// ```http
// POST /instagram/message/michael
// Content-Type: application/json

// {
//   "message": "Hello Michael!"
// }
// ```

// Bulk:

// ```http
// POST /instagram/message/bulk
// Content-Type: application/json

// {
//   "usernames": [
//     "michael9782d",
//     "user2",
//     "user3"
//   ],
//   "message": "Hello! Thanks for connecting.",
//   "delayMs": 5000
// }
// ```

// Start realtime:

// ```http
// POST /instagram/realtime/start
// ```

// For production, I'd also put authentication/authorization on the messaging endpoints so an unauthenticated caller cannot trigger Instagram messages.
