import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DIR } from "./paths";
import { UsersModule } from "./user/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) =>
                configService.get("NODE_ENV") == "prod"
                    ? {
                          type: "postgres",
                          database: configService.get("DB_NAME"),
                          username: configService.get("DB_USER"),
                          password: configService.get("DB_PASS"),
                          host: configService.get("DB_HOST"),
                          port: configService.get("DB_PORT"),
                          synchronize: true,
                          entities: [__dirname + "/**/*.model{.ts,.js}"],
                          autoLoadEntities: true,
                      }
                    : {
                          type: "sqlite",
                          database: `${DIR}/data/${configService.get("DB_NAME") || "database"}.sqlite3`,
                          synchronize: true,
                          entities: [__dirname + "/**/*.model{.ts,.js}"],
                          autoLoadEntities: true,
                      },
            inject: [ConfigService],
        }),
        UsersModule,
    ],
})
export class AppModule {}
