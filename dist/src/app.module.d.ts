import { OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from './user/user.service';
export declare class AppModule implements OnApplicationBootstrap {
    private readonly userService;
    constructor(userService: UserService);
    onApplicationBootstrap(): Promise<void>;
}
