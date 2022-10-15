import { createParamDecorator, ExecutionContext } from "@nestjs/common";
// import * as request from 'supertest';

export const UserRequest = createParamDecorator(

    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return data ? user && user[data] : user;
    }

)