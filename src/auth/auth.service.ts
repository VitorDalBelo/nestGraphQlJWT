import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';

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
    async login(loginUserInput: LoginUserInput) {

        const user = await this.usersServices.findOne(loginUserInput.username);
        const {password,...result} =user;

        return{
            access_token:"jwt",
            user:result
        };
    }
}
