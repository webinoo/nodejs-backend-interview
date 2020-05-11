CREATE TABLE `User` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(50),
    `email` VARCHAR(50),
    `accessToken` TINYTEXT
) ENGINE=InnoDB;

CREATE TABLE `MonitorEndpoint` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(50),
    `url` VARCHAR(150) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME,
    `checkedAt` DATETIME,
    `monitorInterval` INT DEFAULT 300,
    `userId` INT NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
) ENGINE=InnoDB;

CREATE TABLE `MonitorResult` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `statusCode` INT NOT NULL,
    `payload` MEDIUMTEXT,
    `monitorEndpointId` INT NOT NULL,
    FOREIGN KEY (`monitorEndpointId`) REFERENCES `MonitorEndpoint`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO `User`(`name`,`email`,`accessToken`) VALUES ("Applifting", "info@applifting.cz", "93f39e2f-80de-4033-99ee-249d92736a25"),("Batman","batman@example.com","dcb20f8a-5657-4f1b-9f7f-ce65739b359e");