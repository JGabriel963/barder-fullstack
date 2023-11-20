import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { CreateUserUseCase } from './case-uses/create-user.use-case';
import { PrismaService } from 'src/database/prisma.service';
import { AuthenticateUserUseCase } from './case-uses/authenticate-user.use-case';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/middleware/is-authenticate';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    UserRepository,
    PrismaService,
    {
      provide: 'IUserRepository',
      useExisting: UserRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserModule {}
