/*
  Warnings:

  - Added the required column `postedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `postedAt` DATETIME(3) NOT NULL;
