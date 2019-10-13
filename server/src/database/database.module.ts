import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        imports: [],
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: process.env.POSTGRE_PASSWORD,
        database: process.env.DATABASE,
        migrationsTableName: "migration_table",
        entities: [__dirname + "/entities/**/*.entity{.ts,.js}"],
        migrations: [__dirname + "/migrations/**/*.ts"],
        subscribers: [__dirname + "/subscribers/**/*.ts"],
        cli: {
          entitiesDir: "/entitys",
          migrationsDir: "/migrations",
          subscribersDir: "/subscribers",
        },
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
