import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Put,
  Query,
} from "@nestjs/common";
import { TransformInterceptor } from "../interceptor/transform.interceptor";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Controller("article")
@UseInterceptors(TransformInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post("create")
  create(@Body() body: CreateArticleDto) {
    return this.articleService.create(body);
  }

  @Get()
  findAll(
    @Query("page") page: number,
    @Query("pageSize") pageSize: number,
    @Query("keyword") keyword: string,
    @Query("cate") cate: number,
    @Query("tag") tag: number
  ) {
    return this.articleService.findAll({
      page: +page,
      pageSize: +pageSize,
      keyword,
      cate,
      tag
    });
  }
  @Get("/tagGroup")
  tagGroup() {
    return this.articleService.tagGroup();
  }
  @Get("categoryGroup")
  categoryGroup() {
    return this.articleService.categoryGroup();
  }
  @Get("dateGroup")
  dateGroup(@Query("page") page: number, @Query("pageSize") pageSize: number, @Query("date") date?:number) {
    return this.articleService.dateGroup({
      page,
      pageSize,
      date
    });
  }
  @Get("yearGroup")
  yearGroup() {
    return this.articleService.yearGroup();
  }

  @Get('summaryCount')
  summaryCount(){
    return this.articleService.summaryCount();
  }
  //:id will match first.
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.articleService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.articleService.remove(+id);
  }

  @Post("changePublish")
  changePublish(@Query("id") id: string, @Body() body: { isPublish: boolean }) {
    return this.articleService.changePublish(+id, body);
  }
}
