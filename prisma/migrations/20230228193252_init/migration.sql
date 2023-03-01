-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_cartsId_fkey`;

-- DropIndex
DROP INDEX `Cart_productsId_fkey` ON `cart`;

-- AlterTable
ALTER TABLE `product` MODIFY `cartsId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cartsId_fkey` FOREIGN KEY (`cartsId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
