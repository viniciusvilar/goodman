import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindByEmailDto } from './dto/find-by-email.dto';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository : Repository<User>


  async create(createUserDto: CreateUserDto) : Promise<User> {

    const userExist = await this.findByEmail(createUserDto.email)

    if (userExist) {
      throw new Error("This email existed!")
    }

    const user = await this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }

  async findAll() : Promise<User[]> {
    const user = await this.userRepository.find()
    return user
  }

  async findOne(id: number) : Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id })
    return user
  }

  async findByEmail(email: string) : Promise<User[] | null> {
    const user = await this.userRepository.find({
      where: { email: email },
    });
    return user
  }
  

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<User | null> {
    const user = await this.findOne(id)

    if (!user) {
      throw new Error("User not found!")
    }

    const userUpdated = await this.userRepository.merge(user, updateUserDto)

    return await this.userRepository.save(userUpdated)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
