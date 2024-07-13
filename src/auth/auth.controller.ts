import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieOptions, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { SessionGuard } from './session.guard';
import { UsersService } from 'src/users/users.service';
import { FirebaseService } from './firebase.service';

@Controller('auth')
export class AuthController {
  cookieOptions: CookieOptions = {
    maxAge: 60 * 60 * 24 * 5 * 1000,
    secure: false,
    httpOnly: true,
  };

  constructor(
    private authService: AuthService,
    @Inject(FirebaseService) private firebaseService: FirebaseService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async sessionLogin(@Req() req, @Res() res: Response) {
    const cookie = await this.authService.createSessionCookie(
      req.token,
      this.cookieOptions,
    );

    res.cookie(cookie.name, cookie.value, this.cookieOptions);
    res.send({ status: 'success' });
  }

  @Get()
  async getSession(@Req() req, @Res() res) {
    const session = this.firebaseService.extractSessionCookie(req);
    if (!session) {
      res.status(401).send({ isLogged: false });
    }

    const decodedToken = await this.firebaseService
      .getAuth()
      .verifySessionCookie(session);

    if (!decodedToken) {
      res.status(401).send({ isLogged: false });
    }

    res.status(200).send({
      uid: decodedToken.uid,
    });
  }
}
