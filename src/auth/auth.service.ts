import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private usersServices: UsersService,private jwtServices:JwtService ){}
    
    async validadeUser(username:string,password:string):Promise<any> {
        const user = await this.usersServices.findOne(username);
        if(!user) return null;
        const checkHash = await bcrypt.compare(password , user.password)
        if(user.password == password || checkHash){
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

    async signup(loginUserInput: LoginUserInput) {
        const user = await this.usersServices.findOne(loginUserInput.username)
        if(user) throw new Error('User already exixists');

        const password = await bcrypt.hash(loginUserInput.password,10);
        return this.usersServices.create({...loginUserInput,password})

    }
}
