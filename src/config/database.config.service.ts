import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

export class DatabaseConfigService implements TypeOrmOptionsFactory{
    constructor(private configService: ConfigService){}
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
       return{
            type:"postgres",
            host:process.env.DB_HOST,
            port:parseInt(process.env.DB_PORT,10),
            username:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME,
            entities:[]

       }
    }

}