import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(data: CreateUserDto) {
    try {
      if (!data.email) throw new BadRequestException('Email is missing!');

      if (!data.name) throw new BadRequestException('Name is missing!');

      if (!data.password) throw new BadRequestException('Password is missing!');

      const userAlreadyExists = await this.userRepo.findByEmail(data.email);

      if (userAlreadyExists) {
        throw new BadRequestException('User/Email already exists');
      }

      data.password = await hash(data.password, 8);

      const user = await this.userRepo.create(data);

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
