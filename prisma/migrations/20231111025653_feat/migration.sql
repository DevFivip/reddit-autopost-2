/*
  Warnings:

  - You are about to alter the column `status` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `customers` ADD COLUMN `tags` VARCHAR(191) NULL,
    ADD COLUMN `telegram_channel` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `reddit_username` VARCHAR(191) NULL,
    MODIFY `reddit_password` VARCHAR(191) NULL,
    MODIFY `reddit_clientId` VARCHAR(191) NULL,
    MODIFY `reddit_clientSecret` VARCHAR(191) NULL,
    MODIFY `imgur_username` VARCHAR(191) NULL,
    MODIFY `imgur_password` VARCHAR(191) NULL,
    MODIFY `imgur_clientId` VARCHAR(191) NULL,
    MODIFY `imgur_clientSecret` VARCHAR(191) NULL,
    MODIFY `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role_id` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `lastName` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `imagen_name` VARCHAR(191) NULL,
    `imagen_link_imgur` VARCHAR(191) NULL,
    `contenido` VARCHAR(191) NULL,
    `customer_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `postedAt` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    INDEX `idx_posts_customer_id`(`customer_id`),
    INDEX `idx_posts_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tags` VARCHAR(191) NOT NULL,
    `archivo_nombre` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    INDEX `idx_medias_customer_id`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subreddit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `verificacion` BOOLEAN NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Subreddit_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerOnSubreddit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `subreddit_id` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `idx_subreddit_customer_id`(`customer_id`),
    INDEX `idx_subreddit_subreddit_id`(`subreddit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerOnSubreddit` ADD CONSTRAINT `CustomerOnSubreddit_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerOnSubreddit` ADD CONSTRAINT `CustomerOnSubreddit_subreddit_id_fkey` FOREIGN KEY (`subreddit_id`) REFERENCES `Subreddit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
