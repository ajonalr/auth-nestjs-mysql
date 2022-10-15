
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JWTKEY } from 'src/config/global';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private _userService: UserService, private config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>(JWTKEY),
        });
    }

    async validate(payload: any) {
        const { sub: id } = payload;
        const user = await this._userService.findOne(id);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}