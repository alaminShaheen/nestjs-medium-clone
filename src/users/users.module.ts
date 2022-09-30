import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { ErrorMessagesModule } from "../error-messages/error-messages.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), ErrorMessagesModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {
}
