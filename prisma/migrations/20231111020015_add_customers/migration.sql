-- CreateTable
CREATE TABLE `Customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `reddit_username` VARCHAR(191) NOT NULL,
    `reddit_password` VARCHAR(191) NOT NULL,
    `reddit_clientId` VARCHAR(191) NOT NULL,
    `reddit_clientSecret` VARCHAR(191) NOT NULL,
    `imgur_username` VARCHAR(191) NOT NULL,
    `imgur_password` VARCHAR(191) NOT NULL,
    `imgur_clientId` VARCHAR(191) NOT NULL,
    `imgur_clientSecret` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Customers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customers` ADD CONSTRAINT `Customers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `users_email_key` TO `Users_email_key`;
