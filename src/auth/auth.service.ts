import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserProfile } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { SignupDto } from './dto/signup.dto'
import { CustomAuth } from './entities/customAuth.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CustomAuth)
    private readonly authRepo: Repository<CustomAuth>,
    @InjectRepository(UserProfile)
    private readonly usersRepo: Repository<UserProfile>,
  ) {}

  signUp(signupDto: SignupDto) {
    const { email, password } = signupDto
    const userCred = this.usersRepo.create({ email })
    userCred.customAuth = new CustomAuth()
    userCred.customAuth.email = email
    userCred.customAuth.password = password
    return this.usersRepo.save(userCred)
  }

  signIn() {
    return 'sign in'
  }
}
