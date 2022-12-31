import { CustomAuth } from 'src/auth/entities/customAuth.entity'
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'

@Entity({ name: 'users_profile' })
export class UserProfile {
  @PrimaryGeneratedColumn()
  userId: number

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  taxNumber: string

  @Column({ nullable: true })
  companyName: string

  @Column({ nullable: true })
  companyAddress: string

  @OneToOne(() => CustomAuth, (customAuth) => customAuth.userProfile, {})
  @JoinColumn()
  customAuth: CustomAuth

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
