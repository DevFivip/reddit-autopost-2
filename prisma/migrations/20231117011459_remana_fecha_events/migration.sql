/*
  Warnings:

  - You are about to drop the column `postedAt` on the `event` table. All the data in the column will be lost.
  - Added the required column `fechaAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `postedAt`,
    ADD COLUMN `fechaAt` DATETIME(3) NOT NULL;
