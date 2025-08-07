import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ClerkGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const decoded = jwt.decode(token) as { sub: string; email?: string };

      if (!decoded?.sub) {
        return false;
      }

      (request as any).auth = {
        sub: decoded.sub,
      };

      return true;
    } catch (error) {
      return false;
    }
  }
}
