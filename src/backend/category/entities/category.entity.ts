import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";

@Entity()
@Tree("closure-table")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date")
  @CreateDateColumn()
  createdAt: Date;

  @Column("varchar")
  name: string;

  @Column("int", { default: 0 })
  parent_id: number;

  @TreeChildren({cascade: ["soft-remove"]})
  children: Category[];

  @TreeParent({onDelete: 'CASCADE'})
  parent: Category;
}
