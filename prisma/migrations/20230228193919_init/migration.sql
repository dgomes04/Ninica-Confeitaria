-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_cartsId_fkey`;

-- CreateTable
CREATE TABLE `_CartsToProducts` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CartsToProducts_AB_unique`(`A`, `B`),
    INDEX `_CartsToProducts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CartsToProducts` ADD CONSTRAINT `_CartsToProducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartsToProducts` ADD CONSTRAINT `_CartsToProducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
