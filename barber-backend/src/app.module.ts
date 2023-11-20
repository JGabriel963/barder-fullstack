import 'dotenv/config';
import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './middleware/is-authenticate';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
