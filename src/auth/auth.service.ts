import { Inject, Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService,
  ) {}

  async createSessionCookie(token: string, cookieOptions: CookieOptions) {
    const sessionCookie = await this.firebaseService.createSessionCookie(
      token,
      {
        expiresIn: cookieOptions.maxAge,
      },
    );

    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: cookieOptions.maxAge,
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
    };
    return options;
  }
}
