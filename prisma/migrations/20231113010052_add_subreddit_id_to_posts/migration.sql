-- AlterTable
ALTER TABLE `post` ADD COLUMN `subreddit_id` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_subreddit_id_fkey` FOREIGN KEY (`subreddit_id`) REFERENCES `Subreddit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
