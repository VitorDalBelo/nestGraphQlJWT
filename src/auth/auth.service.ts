import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async validadeUser(username:string,password:string):Promise<any> {
        const user = await this.usersService.findOne(username);

        if(user && user.password == password){
            const {password,...result} =user;
            return result;
        } 
        return null ;
    }
}
