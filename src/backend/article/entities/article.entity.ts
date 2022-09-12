import { Category } from "src/backend/category/entities/category.entity";
import { Tag } from "src/backend/tags/entities/tag.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  article_id: number;

  @Column("date")
  @CreateDateColumn()
  createdAt: Date;

  @Column("varchar")
  title: string;

  @Column("int", { default: 0 })
  views: number;

  @Column("varchar")
  summary: string;

  @Column("bool", { default: false })
  top_flag: boolean;

  @Column("longtext")
  content: string;

  @Column("varchar")
  sammaryPic: string;

  @Column("varchar")
  categorys: string;

  @Column("bool", { default: false })
  isPublish: boolean;

  @ManyToMany(() => Tag, {
    cascade: true,
    eager:true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => Category, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinTable()
  category: Category;
}
