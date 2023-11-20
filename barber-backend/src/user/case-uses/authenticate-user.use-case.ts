import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthUserDto } from '../dto/auth-user.dto';
import { IUserRepository } from '../repository/user.repository';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: AuthUserDto) {
    const user = await this.userRepo.findByEmailWithSubscriptions(data.email);

    if (!user) {
      throw new BadRequestException('Email/password incorrect');
    }

    const passwordMatch = await compare(data.password, user?.password);

    if (!passwordMatch) {
      throw new BadRequestException('Email/password incorrect');
    }

    const payload = { sub: user.id, name: user.name, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    const own = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      address: user?.address,
      subscriptions: user?.subscriptions
        ? {
            id: user?.subscriptions.id,
            status: user?.subscriptions?.status,
          }
        : null,
    };

    return {
      user: own,
      acess_token: token,
    };
  }
}
