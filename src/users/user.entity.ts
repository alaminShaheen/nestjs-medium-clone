import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity()
export class UserEntity {
    @PrimaryColumn({ default: uuidv4() })
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
    
    // profile
    
    // articles
}
