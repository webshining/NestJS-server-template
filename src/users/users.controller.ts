import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private usersService: UsersService) {}
}
