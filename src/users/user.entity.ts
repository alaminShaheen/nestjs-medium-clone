import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ArticleEntity } from "../articles/article.entity";
import { FollowEntity } from "../follows/follow.entity";


@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    
    @Index({ unique: true })
    @Column({ unique: true, nullable: false })
    public email: string;
    
    @Column({ nullable: false })
    public password: string;
    
    @CreateDateColumn()
    public createdAt: Date;
    
    @UpdateDateColumn()
    public updatedAt: Date;
    
    @Column()
    public salt: string;
    
    @Column({ nullable: true })
    public refreshToken: string;
    
    @OneToMany(() => ArticleEntity, (article) => article.author)
    public articles: ArticleEntity[];
    
    @OneToMany(() => FollowEntity, (follow) => follow.followerId)
    public followers: FollowEntity[];
    
    @OneToMany(() => FollowEntity, (follow) => follow.followerId)
    public followings: FollowEntity[];
}
