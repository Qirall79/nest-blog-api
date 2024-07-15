import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from './firebase.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, FirebaseService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
