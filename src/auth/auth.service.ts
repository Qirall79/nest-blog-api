import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';

@Injectable()
export class AuthService {

	async createSessionCookie (token: string, cookieOptions: CookieOptions) {
		return {
			name: 'session',
			value: token
		}
	}
}
