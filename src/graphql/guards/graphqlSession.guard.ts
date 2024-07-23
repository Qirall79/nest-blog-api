import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseService } from 'src/auth/firebase.service';

@Injectable()
export class GraphqlSessionGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const req = ctx.req;
    const session = this.firebaseService.extractSessionCookie(req);

    if (!session) return false;
    else {
      try {
        const decodedToken = await this.firebaseService
          .getAuth()
          .verifySessionCookie(session);
        req.auth = decodedToken;
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}
