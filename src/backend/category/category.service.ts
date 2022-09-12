import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Like, DataSource } from 'typeorm';
import { paginateResponse } from '../interceptor/paginateResponse';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = Category.create(createCategoryDto as any);
    if(createCategoryDto.parent_id){
      const parent = await this.categoryRepository.manager.getTreeRepository(Category).findOne({
        where: {
          id: createCategoryDto.parent_id
        }
      })
      category.parent = parent
    }
    category.save();
    return category;
  }

  async findAll() {
    // const take = query.pageSize || 10;
    // const page = query.page || 1;
    // const skip = (page - 1) * take;
    // const keyword = query.keyword || "";

    // const data = await this.categoryRepository.findAndCount({
    //   where: { name: Like("%" + keyword + "%") },
    //   order: { id: "DESC" },
    //   take: take,
    //   skip: skip,
    // });
    // return paginateResponse(data, page, take);

    const trees = await this.categoryRepository.manager.getTreeRepository(Category).findTrees()
    return trees
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {  id },
    });

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updataRes = await this.categoryRepository.update(id, updateCategoryDto);
    return updataRes;
  }

  async remove(id: number) {
    return await this.categoryRepository.manager.getTreeRepository(Category).delete(id);
  }
}
