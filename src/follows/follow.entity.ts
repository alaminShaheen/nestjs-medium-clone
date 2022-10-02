import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";

@Entity({ name: "follows" })
export class FollowEntity {
    @PrimaryGeneratedColumn("uuid")
    followId: string;
    
    @PrimaryColumn()
    public followerId: string;
    @ManyToOne(() => UserEntity, (user) => user.followers)
    @JoinColumn({ name: "followerId" })
    follower: UserEntity;
    
    @PrimaryColumn()
    public followingId: string;
    @ManyToOne(() => UserEntity, (user) => user.followings)
    @JoinColumn({ name: "followingId" })
    following: UserEntity;
}
