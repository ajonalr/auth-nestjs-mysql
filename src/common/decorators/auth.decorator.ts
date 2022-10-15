import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';

export function  AuthDecorator(){
    return applyDecorators(
        UseGuards(JwtAuthGuard),
        ApiBearerAuth()
    )
    // el ApiBearerAuth es un decorador de Sawger
    // y el UseGaurd es un decorador simple
}