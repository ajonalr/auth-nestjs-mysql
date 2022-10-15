import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/localauth.guard';
import { UserRequest } from '../common/decorators/user.decorators';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwtauth.guard';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
@ApiTags('Auth Routes')
@Controller('auth')
export class AuthController {

    constructor(private readonly _authServide: AuthService) {

    }

    // Decorador que Inyecta otro Decorador 
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@UserRequest() user: User) {
        const data = await this._authServide.login(user);
        delete data.usuario.password;
        return {
            data
        };
    }

    @AuthDecorator()
    @Get('profile')
    async profile(
        @UserRequest() user: User
    ) {
        return {
            user
        }
    }

    // refresh Toke
    @AuthDecorator()
    @Get('refresh')
    async refreshToke(
        @UserRequest() user: User
    ) {
        const data = await this._authServide.login(user);
        delete data.usuario.password;
        return {
            message: 'Refresh Token Exitoso',
            data
        };
    }

}
