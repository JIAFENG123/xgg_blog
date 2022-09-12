import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  tags: Array<string | number>;

  category: string | number;
}
