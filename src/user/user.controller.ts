import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    return {
      message: `Usuario ${data.name} creado con Exito`,
      data
    }
  }

  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    return {
      data
    }
  }

  @Get('one/:id')
  async findOne(@Param('id') id: string) {
    console.log(id);
    
    return await this.userService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(+id, updateUserDto);
    return {
      data
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @Get('/email/:email')
  async findEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail({ email });
    if (user) {
      throw new NotFoundException('Existe un Usario con este email')
    }
    return {
      user
    }
  }



}
