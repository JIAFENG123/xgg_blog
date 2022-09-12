import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository, In, Raw, ArrayContains, Equal } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Category } from "../category/entities/category.entity";
import { paginateResponse } from "../interceptor/paginateResponse";
import { Tag } from "../tags/entities/tag.entity";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  async create(createArticleDto: CreateArticleDto) {
    const article = Article.create(createArticleDto as any);
    const tags: Tag[] = await this.tagRepository.findBy({
      tag_id: In(createArticleDto.tags),
    });
    const category: Category = await this.categoryRepository.findOne({
      where: {
        id: createArticleDto.category as number,
      },
    });
    article.tags = tags;
    article.category = category;
    article.save();
    return article;
  }

  async findAll(query: {
    page: number;
    pageSize: number;
    keyword: string;
    cate: number;
    tag: number;
  }) {
    const cate = query.cate || 0;
    const tag = query.tag || 0;
    const take = query.pageSize || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || "";

    const tagSql = tag
      ? {
          tags: {
            tag_id: tag,
          },
        }
      : {};
    const cateSql = cate
      ? {
          category: {
            id: cate,
          },
        }
      : {};

    const data = await this.articleRepository.findAndCount({
      where: {
        title: Like("%" + keyword + "%"),
        ...tagSql,
        ...cateSql,
      },
      order: { createdAt: "DESC" },
      take: take,
      skip: skip,
      relations: ["tags", "category"],
    });
    return paginateResponse(data, page, take);
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { article_id: id },
      relations: ["tags", "category"],
    });

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.findOne({
      where: { article_id: id },
      relations: ["tags", "category"],
    });

    const tags: Tag[] = await this.tagRepository.findBy({
      tag_id: In(updateArticleDto.tags),
    });
    const category: Category = await this.categoryRepository.findOne({
      where: {
        id: updateArticleDto.category as number,
      },
    });
    Object.assign(article, updateArticleDto);
    article.tags = tags;
    article.category = category;

    article.save();

    return article;
  }

  async remove(id: number) {
    return await this.articleRepository.delete(id);
  }

  async changePublish(id: number, body: { isPublish: boolean }) {
    const updataRes = await this.articleRepository.update(id, body);
    return updataRes;
  }

  async tagGroup() {
    const res = await this.articleRepository
      .createQueryBuilder("article")
      // .where('image.created_at > :created_at', {
      //   created_at: '2022-08-26 21:03:00', // make sure you set your own date here
      // })
      .leftJoinAndSelect("article.tags", "tag")
      .groupBy("tag.tag_id")
      .addGroupBy("tag.tag_id")
      .select("tag.tag_id,count(tag.tag_id) as count,tag.name")
      .orderBy("count(tag.tag_id)", "DESC")
      .execute();

    return res;
  }

  async categoryGroup() {
    const res = await this.articleRepository
      .createQueryBuilder("article")
      // .where('image.created_at > :created_at', {
      //   created_at: '2022-08-26 21:03:00', // make sure you set your own date here
      // })
      .leftJoinAndSelect("article.category", "category")
      .groupBy("category.id")
      .addGroupBy("category.id")
      .select("category.id,count(category.id) as count")
      .orderBy("count(category.id)", "DESC")
      .execute();

    return res;
  }
  async yearGroup() {
    const res = await this.articleRepository
      .createQueryBuilder("article")
      .groupBy("Year(createdAt)")
      .select("Year(createdAt) as date,count(Year(createdAt)) as count")
      .orderBy("Year(createdAt)", "DESC")
      .execute();

    return res;
  }
  async getDateGroupData() {
    const res = await this.articleRepository
      .createQueryBuilder("article")
      .groupBy("Year(createdAt)")
      .select("Year(createdAt) as date")
      .orderBy("Year(createdAt)", "DESC")
      .execute();

    const archives = [] as {
      year: number;
      articles: Article[];
    }[];
    for (const { date } of res) {
      const articles = await this.articleRepository.find({
        where: {
          createdAt: Raw((alias) => `Year(${alias}) = ${date}`),
        },
        relations: ["tags", "category"],
        order: { createdAt: "DESC" },
      });

      archives.push({
        year: date,
        articles,
      });
    }

    return archives;
  }
  async dateGroup(query: { page: number; pageSize: number; date?: number }) {
    const count = await this.articleRepository.count();
    const archives = await this.getDateGroupData();
    const range = { start: 0, end: 0 };
    let { page, pageSize, date } = query;
    page = +page || 1;
    pageSize = +pageSize || 10;
    range.start = (page - 1) * pageSize;
    range.end = page * pageSize;
    const { start, end } = range;

    const data = date
      ? [
          archives.filter((i) => i.year === +date),
          archives.filter((i) => i.year === +date).length,
        ]
      : [archives.slice(start, end), archives.length];
    return paginateResponse(data, page, pageSize, count);
  }

  async summaryCount() {
    const articleCount = await this.articleRepository.count();
    const tagCount = await this.tagRepository.count();
    const categoryCount = await this.categoryRepository.count();

    return {
      articleCount,
      tagCount,
      categoryCount,
    };
  }
}
