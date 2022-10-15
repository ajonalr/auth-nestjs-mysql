import { IsBoolean, IsEmail, IsString, MaxLength, maxLength, MinLength } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {


    @IsString()
    @MaxLength(255)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, { message: 'la Contraseña debe tener minimo 8 caracteres' })
    @MaxLength(125)
    password: string;

    @IsBoolean()
    status: boolean;

    @IsString()
    role: UserRole;

}
