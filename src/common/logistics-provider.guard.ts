import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

/**
 * Role is read from the DB on every request (JWT carries only sub/email),
 * so promoting/demoting a user takes effect without re-login.
 * The spec calls this account field "status"; in this codebase it is User.role.
 * Apply after AuthGuard('jwt'): @UseGuards(AuthGuard('jwt'), LogisticsProviderGuard)
 */
@Injectable()
export class LogisticsProviderGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{ user?: { id?: string } }>();
    const userId = req.user?.id;
    if (!userId) throw new ForbiddenException('Logistics provider access required');
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    if (user?.role !== 'LOGISTICS_PROVIDER') throw new ForbiddenException('Logistics provider access required');
    return true;
  }
}
