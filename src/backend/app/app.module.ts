import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { UsersModule } from "../users/users.module";
import { User } from "../users/entities/user.entity";
import { AuthModule } from "../auth/auth.module";
import { ArticleModule } from "../article/article.module";
import { TagsModule } from "../tags/tags.module";
import { Article } from "../article/entities/article.entity";
import { Tag } from "../tags/entities/tag.entity";
import { CategoryModule } from "../category/category.module";
import { Category } from "../category/entities/category.entity";

const entities = [User, Article, Tag, Category];


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as any),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ArticleModule,
    TagsModule,
    CategoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
