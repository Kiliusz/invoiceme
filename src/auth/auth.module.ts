import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserProfile } from 'src/users/entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CustomAuth } from './entities/customAuth.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CustomAuth, UserProfile])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
