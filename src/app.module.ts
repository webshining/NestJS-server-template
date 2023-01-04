import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get("NODE_ENV") == "prod"
                    ? {
                          type: "postgres",
                          database: configService.get("DB_NAME"),
                          username: configService.get("DB_USER"),
                          password: configService.get("DB_PASS"),
                          host: configService.get("DB_HOST"),
                          port: configService.get("DB_PORT"),
                          entities: [],
                          synchronize: true,
                          autoLoadEntities: true,
                      }
                    : {
                          type: "sqlite",
                          database: "database.sqlite3",
                          entities: [],
                          synchronize: true,
                          autoLoadEntities: true,
                      },
        }),
        UsersModule,
    ],
    providers: [],
})
export class AppModule {}
