import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { UserEntity } from "../users/user.entity";

@Entity({ name: "articles" })
export class ArticleEntity {
    @PrimaryGeneratedColumn("uuid")
    public slug: string;
    
    @Column({ length: 150 })
    public title: string;
    
    @Column({ nullable: true, length: 300 })
    public description: string;
    
    @Column()
    public body: string;
    
    @Index()
    @CreateDateColumn()
    public createdAt: Date;
    
    @UpdateDateColumn()
    public updatedAt: Date;
    
    @Column({ default: 0, type: "int" })
    public clapCount: number;
    
    @Column()
    public authorId: string;
    @ManyToOne(() => UserEntity, (user) => user.articles)
    @JoinColumn({ name: "authorId" })
    public author: UserEntity;
}
