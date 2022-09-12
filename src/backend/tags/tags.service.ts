import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { paginateResponse } from "../interceptor/paginateResponse";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}
  create(createTagDto: CreateTagDto) {
    const tag = Tag.create(createTagDto as any);
    tag.save();
    return tag;
  }

  async findAll(query: { page: number; pageSize: number; keyword: string }) {
    const take = query.pageSize || 10;
    const page = query.page || 1;
    const skip = (page - 1) * take;
    const keyword = query.keyword || "";

    const data = await this.tagRepository.findAndCount({
      where: { name: Like("%" + keyword + "%") },
      order: { tag_id: "DESC" },
      take: take,
      skip: skip,
    });
    return paginateResponse(data, page, take);
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne({
      where: { tag_id: id },
    });
    console.log(tag);

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const updataRes = await this.tagRepository.update(id, updateTagDto);
    return updataRes;
  }

  async remove(id: number) {
    return await this.tagRepository.delete(id);
  }
}
