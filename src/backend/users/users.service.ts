import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto ) {
    await this.userRepository.save(createUserDto)
    return this.userRepository;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;

    return user;
  }

  async findById(id: number) {
    return await this.findById(id)
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
