import { Injectable, Logger } from "@nestjs/common";
import { Command, Console, createSpinner } from "nestjs-console";
import { EntityManager } from "typeorm";
import * as bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { UserEntity } from "../users/user.entity";
import { ArticleEntity } from "../articles/article.entity";
import { AppErrorMessagesService } from "../app-messages/app-error-messages.service";
import { DatabaseConstantsService } from "./database-constants.service";

@Injectable()
@Console()
export class DatabaseSeederService {
    private logger = new Logger(DatabaseSeederService.name);
    
    constructor (
        private readonly entityManager: EntityManager,
        private readonly appErrorMessagesService: AppErrorMessagesService,
        private readonly databaseConstantsService: DatabaseConstantsService
    ) {
    }
    
    @Command({
        command: "seed",
        description: "Populate DB with seed data"
    })
    async seed (): Promise<void> {
        const spin = createSpinner({
            color: "green",
            spinner: "circle",
            text: "Starting database seeding"
        });
        
        try {
            spin.info("Creating Users");
            const seedUserPromises = Array(
                this.databaseConstantsService.DB_SEED_USER_COUNT
            ).fill(0)
            .map(() => this.userFactory());
            const seedUsers = await Promise.all(seedUserPromises);
            spin.succeed(`Created ${seedUsers.length} users successfully`);
            
            
            spin.info("Creating articles");
            for (const seedUser of seedUsers) {
                const seedArticlePromises = Array(
                    this.databaseConstantsService.DB_SEED_POST_PER_USER_COUNT
                )
                .fill(0)
                .map(() => {
                    const randomUser = seedUsers[faker.datatype.number(
                        { min: 0, max: seedUsers.length - 1 }
                    )];
                    return this.articleFactory(randomUser.id);
                });
                const seedArticles = await Promise.all(seedArticlePromises);
                spin.succeed(`Created ${seedArticles.length} articles successfully`);
            }
            
            spin.succeed("Database seeding complete");
        } catch (error) {
            spin.fail("Database seeding failed");
            this.logger.error(this.appErrorMessagesService.DATABASE_SEEDING);
        }
    }
    
    async userFactory (): Promise<UserEntity> {
        try {
            const seedUser = new UserEntity();
            
            seedUser.email = faker.internet.email();
            seedUser.salt = await bcrypt.genSalt();
            seedUser.password = await bcrypt.hash(seedUser.email, seedUser.salt);
            
            return await this.entityManager.save(UserEntity, seedUser);
        } catch (error) {
            this.logger.error("Could not create seed User");
        }
    }
    
    async articleFactory (authorId: string): Promise<ArticleEntity> {
        try {
            const seedArticle = new ArticleEntity();
            
            seedArticle.authorId = authorId;
            seedArticle.body = faker.lorem.paragraph(10);
            seedArticle.description = faker.lorem.sentence(15);
            seedArticle.title = faker.lorem.words(faker.datatype.number({ min: 2, max: 8 }));
            seedArticle.clapCount = faker.datatype.number({ min: 1, max: 100 });
            
            return await this.entityManager.save(ArticleEntity, seedArticle);
        } catch (error) {
            this.logger.error("Could not create seed Article");
        }
    }
    
}
