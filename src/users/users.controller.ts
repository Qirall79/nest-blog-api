import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SessionGuard } from 'src/auth/session.guard';
import { UsersService } from './users.service';
import { AuthDto } from 'src/dto/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(SessionGuard)
  @Post('')
  async createUser(@Req() req) {
    console.log(req.auth);
    
    const [firstName, lastName] = req.auth?.name.split(' ');
    const user: AuthDto = {
      uid: req.auth?.uid,
      firstName,
      lastName,
      email: req.auth?.email,
      picture: req.auth?.email,
    };
    return await this.usersService.createUser(user);
  }

  @UseGuards(SessionGuard)
  @Get('me')
  async getUser(@Req() req) {
    return await this.usersService.getUser(req.auth.uid)
  }

  @Get('clear')
  async clearUsers() {
    await this.usersService.clearUsers();
    return {msg: 'cleared User database'}
  }
}
