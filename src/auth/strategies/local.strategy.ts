import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategie extends PassportStrategy(Strategy) {

    constructor(
        private readonly _authService: AuthService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }


    // 
    async validate(email: string, password: string) {
        const user = this._authService.validateUser(email, password);

        if (!user) {
            console.log('no match');

            throw new UnauthorizedException();
        }

        return user;

    }


}