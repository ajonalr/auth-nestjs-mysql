import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from 'src/config/database';

@Module({

   imports: [
      TypeOrmModule.forRootAsync({
         inject: [ConfigService],
         useFactory: (config: ConfigService) => ({
            type: 'mysql',
            host: config.get<string>(DB_HOST),
            port: parseInt(config.get<string>(DB_PORT), 10),
            username: config.get<string>(DB_USERNAME),
            password: config.get<string>(DB_PASSWORD),
            database: config.get<string>(DB_NAME),
            entities: ["dist/**/*.entity{.ts,.js}"],
            autoLoadEntities: true,
            charset: 'utf8mb4',
            synchronize: true,
            logging: true,
            logger: 'file',
            timezone: "+00:00",
            seederStorage: "sequelize",
            operatorsAliases: false
         })
      }),
   ]


})
export class DatabaseModule { }
