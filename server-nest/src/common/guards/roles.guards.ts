import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
      console.log('ROLE = ', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    let user = request.user;
    if (!user) user = {roles: roles};
    //console.log("USER ROLE = ",user)
    const hasRole = () =>
      user.roles.some((role) => !!roles.find((item) => item === role));

    return user && user.roles && hasRole();
  }
}
