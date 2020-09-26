import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, ReflectMetadata } from "@nestjs/common";
import { User } from "../endpoints/users/user.entity";
import { Reflector } from "@nestjs/core";

export const UserHasRole = (role: string) => ReflectMetadata('role', role);

/** Restricts API access to users with the "admin" role */
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {
        //
    }

    canActivate(
        context: ExecutionContext
    ): boolean {
        const handler = context.getHandler();
        const userRole = this._reflector.get<string>('role', handler);

        const req = context.switchToHttp().getRequest();
        const authUser: User = req.authUser;
        if (!authUser) throw new HttpException('could not authenticate user', HttpStatus.UNAUTHORIZED);

        if (!authUser.role) return false;

        // Admins can access anything
        return (authUser.role === userRole);
    }
}