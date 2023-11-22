-- AlterTable
ALTER TABLE `post` ADD COLUMN `reddit_submission_name` VARCHAR(191) NULL,
    MODIFY `status` INTEGER NOT NULL DEFAULT 1;
