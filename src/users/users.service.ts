import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { ErrorMessagesService } from "../error-messages/error-messages.service";

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly errorMessagesService: ErrorMessagesService
    ) {
    }
    
    create (email: string, password: string, salt: string) {
        const user = this.userRepository.create({ email, password, salt });
        return this.userRepository.save(user);
    }
    
    async findOneByEmail (email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }
    
    async findOneById (id: string) {
        return await this.userRepository.findOne({ where: { id } });
    }
    
    async update (userId: string, userInfo: Partial<UserEntity>) {
        try {
            const userToUpdate = await this.findOneById(userId);
    
            if (!userToUpdate) throw new NotFoundException(this.errorMessagesService.USER_NOT_FOUND);
            
            Object.assign(userToUpdate, userInfo);
            return this.userRepository.save(userToUpdate);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            else throw new InternalServerErrorException(this.errorMessagesService.SERVER_ERROR);
            
        }
    }
}
