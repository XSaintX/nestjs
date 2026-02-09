import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UserService {

 constructor(private userRepository: UsersRepository) {}

 async getUser (username: any) {
    //const { username } = params;
    //Logic 
    return this.userRepository.repo.findOne({where: {username: username}});
 }
}