import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (
      req.headers['Authorization'] &&
      typeof req.headers['Authorization'] == 'string'
    ) {
      const idToken = req.headers['Authorization'].split(' ')[1];

      try {
        this.firebaseService.getAuth().verifyIdToken(idToken);
        req.token = idToken;
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
