import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    tag_id: number;
  
    @Column('date')
    @CreateDateColumn()
    createdAt: Date;
  
    @Column('varchar')
    name: string;

  }
  