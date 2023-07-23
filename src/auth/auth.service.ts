import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersServices: UsersService,private jwtServices:JwtService ){}
    
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
            access_token:this.jwtServices.sign({username:user.username,sub:user.id}),
            user:user
        };
    }
}
