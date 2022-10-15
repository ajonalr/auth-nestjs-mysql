import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

export interface UserFindOne {
  id?: number;
  email?: string;
}

@ApiTags('User Rout')
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,

  ) { }

  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const userexist = await this.findByEmail({ email });
    if (userexist) throw new NotFoundException(`Email: ${createUserDto.email}, ya registrado`);
    const user = await this.userRepo.create(createUserDto);
    const newuser = await this.userRepo.save(user);
    delete newuser.password;
    return newuser;
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id) {
    const user = await this.userRepo.findBy({ 'id': id });

    if (!user) throw new NotFoundException(`El usuario no existe`);
    return user;

  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    if (!updateUserDto.password) {
      await this.userRepo.update(id, {
        email: updateUserDto.email,
        name: updateUserDto.name,
        role: updateUserDto.role,
        status: updateUserDto.status
      })
      return this.findOne(id);
    } else {
      await this.userRepo.update(id, {
        email: updateUserDto.email,
        name: updateUserDto.name,
        role: updateUserDto.role,
        status: updateUserDto.status,
        password: await bcrypt.hash(updateUserDto.password, 15)
      })
      return this.findOne(id);
    }


  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepo.remove(user);
  }

  async findByEmail(data: UserFindOne) {
    return await this.userRepo
      .createQueryBuilder('user')
      .where({ email: data.email })
      .addSelect('user.password')
      .getOne();

  }


}
