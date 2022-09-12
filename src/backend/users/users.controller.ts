import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Res,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransformInterceptor } from '../interceptor/transform.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //register
  @Post('register')
  @UseInterceptors(TransformInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);

    return this.usersService.create(createUserDto);
  }

  // select one by id
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformInterceptor)
  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }
}
