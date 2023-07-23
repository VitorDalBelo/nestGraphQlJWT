import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private usersServices: UsersService){}
    
    async validadeUser(username:string,password:string):Promise<any> {
        const user = await this.usersServices.findOne(username);
        
        if(user && user.password == password){
            const {password,...result} =user;
            return result;
        } 
        return null ;
    }
    async login(user: User) {

        return{
            access_token:"jwt",
            user:user
        };
    }
}
