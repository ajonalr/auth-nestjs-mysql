import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly _userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    // sirve para saber si el email y el password son iguales a lo que esta alojado en la base de datos
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this._userService.findByEmail({ email });
        if (user && await compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    // sirve para crear el token 
    async login(usuario: User) {
        // destructuramos el usuario pra sacar el identificador del resto de los datos
        const { id, ...rest } = usuario;
        const payload = { sub: id }
        return {
            usuario,
            accessToken : this.jwtService.sign(payload)
        }
    }

}
