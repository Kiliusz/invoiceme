import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserProfile } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly usersRepo: Repository<UserProfile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepo.create(createUserDto)
    try {
      return await this.usersRepo.save(user)
    } catch (e) {
      if (e.errno === 1062) {
        throw new BadRequestException('Email already in use by another user')
      }
      throw new BadRequestException()
    }
  }

  findAll() {
    // TODO some pagination
    return this.usersRepo.find()
  }

  async findOne(userId: number) {
    const user = await this.usersRepo.findOneBy({ userId })
    if (!user) throw new NotFoundException('user not found')
    return user
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepo.findOneBy({ userId })
    if (!user) throw new NotFoundException('user not found')
    const updatedUser = { ...user, ...updateUserDto }
    try {
      return await this.usersRepo.save(updatedUser)
    } catch (e) {
      if (e.errno === 1062) {
        throw new BadRequestException('Email already in use by another user')
      }
      throw new BadRequestException()
    }
  }

  async remove(userId: number) {
    const user = await this.usersRepo.findOneBy({ userId })
    if (!user) throw new NotFoundException('user not found')
    return this.usersRepo.remove(user)
  }
}
