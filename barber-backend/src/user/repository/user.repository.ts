import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;
  update(data: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByEmailWithSubscriptions(email: string): Promise<any>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: data,
    });

    return user;
  }
  async update(data: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data: data,
    });
  }
  findById(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }
  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async findByEmailWithSubscriptions(email: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: {
        subscriptions: true,
      },
    });

    return user;
  }
}
