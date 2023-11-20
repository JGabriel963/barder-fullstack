import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './case-uses/create-user.use-case';
import { Public } from 'src/middleware/is-public';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthenticateUserUseCase } from './case-uses/authenticate-user.use-case';

@Controller('user')
export class UserController {
  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase;

  @Inject(AuthenticateUserUseCase)
  private readonly authenticateUserUseCase: AuthenticateUserUseCase;

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Public()
  @Post('session')
  singIn(@Body() authUser: AuthUserDto) {
    return this.authenticateUserUseCase.execute(authUser);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
