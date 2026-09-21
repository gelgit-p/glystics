import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '../../../prisma/generated';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async confirmEmail(email: string) {
    return this.prisma.user.update({
      where: { email },
      data: { emailConfirmed: true },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    console.log(id, data, 'log id')

    let fin_user = await this.prisma.user.findFirst({
      where: {id}
    })

    console.log(fin_user, 'findUser')
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
