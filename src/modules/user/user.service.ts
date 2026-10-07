import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma } from '../../../prisma/generated';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(`Failed to find user with ID ${id}:`, error);
      throw error;
    }
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

  async addToken(userId: string, facebookAccessToken: string, facebookLongLivedAccessToken: string, expiresIn: string, dataAccessExpirationTime: string) {
    let save_token = await this.prisma.token.create({
      data: {userId,
      facebookAccessToken,
      facebookLongLivedAccessToken,
      expiresIn,
      dataAccessExpirationTime,
      }
    });

    return save_token;
  }
}
