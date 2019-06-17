import {MigrationInterface, QueryRunner} from "typeorm";

export class buildAll1558771710564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `votes` (`id` varchar(36) NOT NULL, `vote` tinyint NOT NULL, `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, `userId` varchar(36) NULL, `postId` varchar(36) NULL, `commentId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ban` (`id` varchar(36) NOT NULL, `isBanned` tinyint NOT NULL DEFAULT 0, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `notifications` (`id` varchar(36) NOT NULL, `reason` varchar(255) NOT NULL, `reportedBy` varchar(255) NOT NULL, `status` enum ('Unread', 'Read') NOT NULL DEFAULT 'Unread', `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `activities` (`id` varchar(36) NOT NULL, `actionType` enum ('created', 'deleted', 'updated') NOT NULL, `featureType` enum ('post', 'comment') NOT NULL, `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, `ownerId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `roles` enum ('Basic', 'Moderator', 'Admin') NOT NULL DEFAULT 'Basic', `isDeleted` tinyint NOT NULL DEFAULT 0, `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, `banStatusId` varchar(36) NULL, `notificationsId` varchar(36) NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `REL_73284a017a1b03deabe9ed279e` (`banStatusId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `posts` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `status` enum ('Published', 'Locked', 'Flagged', 'Archived') NOT NULL DEFAULT 'Published', `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, `authorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comments` (`id` varchar(36) NOT NULL, `message` text NOT NULL, `status` enum ('Published', 'Locked', 'Flagged', 'Archived') NOT NULL DEFAULT 'Published', `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, `authorId` varchar(36) NULL, `postId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_followers_users` (`usersId_1` varchar(36) NOT NULL, `usersId_2` varchar(36) NOT NULL, INDEX `IDX_8d63f6043394b4d32343bdea11` (`usersId_1`), INDEX `IDX_1433e3275a501bc09f5c33c7ca` (`usersId_2`), PRIMARY KEY (`usersId_1`, `usersId_2`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `votes` ADD CONSTRAINT `FK_5169384e31d0989699a318f3ca4` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `votes` ADD CONSTRAINT `FK_b5b05adc89dda0614276a13a599` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `votes` ADD CONSTRAINT `FK_554879cbc33538bf15d6991f400` FOREIGN KEY (`commentId`) REFERENCES `comments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `activities` ADD CONSTRAINT `FK_59be570df4b6211e78a57ad6f21` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_73284a017a1b03deabe9ed279e1` FOREIGN KEY (`banStatusId`) REFERENCES `ban`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_bd902269f49e3f3b0d20d5f7bf2` FOREIGN KEY (`notificationsId`) REFERENCES `notifications`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `posts` ADD CONSTRAINT `FK_c5a322ad12a7bf95460c958e80e` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comments` ADD CONSTRAINT `FK_4548cc4a409b8651ec75f70e280` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comments` ADD CONSTRAINT `FK_e44ddaaa6d058cb4092f83ad61f` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users_followers_users` ADD CONSTRAINT `FK_8d63f6043394b4d32343bdea11d` FOREIGN KEY (`usersId_1`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users_followers_users` ADD CONSTRAINT `FK_1433e3275a501bc09f5c33c7ca2` FOREIGN KEY (`usersId_2`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users_followers_users` DROP FOREIGN KEY `FK_1433e3275a501bc09f5c33c7ca2`");
        await queryRunner.query("ALTER TABLE `users_followers_users` DROP FOREIGN KEY `FK_8d63f6043394b4d32343bdea11d`");
        await queryRunner.query("ALTER TABLE `comments` DROP FOREIGN KEY `FK_e44ddaaa6d058cb4092f83ad61f`");
        await queryRunner.query("ALTER TABLE `comments` DROP FOREIGN KEY `FK_4548cc4a409b8651ec75f70e280`");
        await queryRunner.query("ALTER TABLE `posts` DROP FOREIGN KEY `FK_c5a322ad12a7bf95460c958e80e`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_bd902269f49e3f3b0d20d5f7bf2`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_73284a017a1b03deabe9ed279e1`");
        await queryRunner.query("ALTER TABLE `activities` DROP FOREIGN KEY `FK_59be570df4b6211e78a57ad6f21`");
        await queryRunner.query("ALTER TABLE `votes` DROP FOREIGN KEY `FK_554879cbc33538bf15d6991f400`");
        await queryRunner.query("ALTER TABLE `votes` DROP FOREIGN KEY `FK_b5b05adc89dda0614276a13a599`");
        await queryRunner.query("ALTER TABLE `votes` DROP FOREIGN KEY `FK_5169384e31d0989699a318f3ca4`");
        await queryRunner.query("DROP INDEX `IDX_1433e3275a501bc09f5c33c7ca` ON `users_followers_users`");
        await queryRunner.query("DROP INDEX `IDX_8d63f6043394b4d32343bdea11` ON `users_followers_users`");
        await queryRunner.query("DROP TABLE `users_followers_users`");
        await queryRunner.query("DROP TABLE `comments`");
        await queryRunner.query("DROP TABLE `posts`");
        await queryRunner.query("DROP INDEX `REL_73284a017a1b03deabe9ed279e` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `activities`");
        await queryRunner.query("DROP TABLE `notifications`");
        await queryRunner.query("DROP TABLE `ban`");
        await queryRunner.query("DROP TABLE `votes`");
    }

}
