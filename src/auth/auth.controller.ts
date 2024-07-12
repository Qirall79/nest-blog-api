import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieOptions, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { SessionGuard } from './session.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  cookieOptions: CookieOptions = {
    maxAge: 60 * 60 * 24 * 5 * 1000,
    secure: false,
    httpOnly: true,
  };

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async sessionLogin(@Req() req, @Res() res: Response) {
    const cookie = await this.authService.createSessionCookie(
      req.token,
      this.cookieOptions,
    );

    res.cookie(cookie.name, cookie.value, this.cookieOptions);
    res.send(JSON.stringify({ status: 'success' }));
  }

  @UseGuards(SessionGuard)
  @Post('create')
  async createUser(@Req() req) {
    return await this.usersService.createUser(req.auth);
  }
}
