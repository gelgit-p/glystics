import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'node:http';
import { WebSocket, WebSocketServer } from 'ws';
import { PrismaService } from 'prisma/prisma.service';

export type VerificationPendingEvent = {
  type: 'verification.pending';
  providerId: string;
  companyName: string;
  documentName: string;
  submittedAt: string;
};

/**
 * Authenticated realtime channel for SUPER_ADMIN users only: /ws/admin?token=<access JWT>.
 * Browsers can't set WS headers, so the JWT rides in the query string and is verified
 * exactly like the REST JwtStrategy before the upgrade is accepted (401 on failure).
 */
@Injectable()
export class AdminNotificationsGateway {
  private readonly logger = new Logger(AdminNotificationsGateway.name);
  private wss?: WebSocketServer;
  private readonly clients = new Set<WebSocket>();

  constructor(private readonly jwt: JwtService, private readonly prisma: PrismaService) {}

  attach(server: unknown) {
    this.wss = new WebSocketServer({ noServer: true });
    (server as { on: (e: string, cb: (...a: never[]) => void) => void }).on('upgrade', (req: IncomingMessage, socket: never, head: never) => {
      void this.handleUpgrade(req, socket, head);
    });
    this.wss.on('connection', (ws: WebSocket) => {
      this.clients.add(ws);
      ws.on('close', () => this.clients.delete(ws));
      ws.on('error', () => this.clients.delete(ws));
      ws.send(JSON.stringify({ type: 'connected' }));
    });
  }

  private async handleUpgrade(req: IncomingMessage, socket: never, head: never) {
    const reject = () => (socket as unknown as { write: (s: string) => void; destroy: () => void }).write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    try {
      const url = new URL(req.url ?? '', 'http://localhost');
      if (url.pathname !== '/ws/admin') return; // not ours; leave socket for other handlers
      const token = url.searchParams.get('token');
      if (!token) return reject();
      const payload = await this.jwt.verifyAsync<{ sub?: string }>(token, { secret: process.env.JWT_SECRET });
      if (!payload.sub) return reject();
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub }, select: { role: true } });
      if (user?.role !== 'SUPER_ADMIN') return reject();
      this.wss?.handleUpgrade(req, socket, head, (ws) => this.wss?.emit('connection', ws, req));
    } catch { reject(); }
  }

  notifyVerificationPending(event: VerificationPendingEvent) {
    const payload = JSON.stringify(event);
    for (const ws of this.clients) {
      if (ws.readyState === WebSocket.OPEN) ws.send(payload);
    }
    this.logger.log(`verification.pending broadcast to ${this.clients.size} admin socket(s): ${event.companyName}`);
  }

  clientCount() { return this.clients.size; }
}
