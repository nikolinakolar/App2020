/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

DROP DATABASE IF EXISTS `aplikacijapica`;
CREATE DATABASE IF NOT EXISTS `aplikacijapica` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacijapica`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(1, 'nina', '347037976A22CBE3B942958FB94B294DCC0F2D4E98E7593AA9AB0543116CE9390D221C9F2B16EA824C091AA2F5B0F979F06A24359BE6E7A6BDAE52E270F76B41'),
	(2, 'test_user', '90856ufgjg98tyuhgrehg34'),
	(3, 'pperic', '6A4C0DC4FCC43BDEA28963DF73E4F8351BCDAE08FDA1516234E8D764AF8178A610BCCA2813D204DFF92A43F0511EB0016C7682CCF7B343D99E01739FC26EF104'),
	(5, 'mmilic', '522721D74CC4451EE9960BFA0B8B8419139A7FE87EDBADB6F24B320244FEB0B2321A53BF90D166BEA63A174B4E97DB1963722890ADBC007E464BF42B018446ED'),
	(7, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC'),
	(11, 'admin1', '58B5444CF1B6253A4317FE12DAFF411A78BDA0A95279B1D5768EBF5CA60829E78DA944E8A9160A0B6D428CB213E813525A72650DAC67B88879394FF624DA482F'),
	(13, 'admin2', '661BB43140229AD4DC3E762E7BDD68CC14BB9093C158C386BD989FEA807ACD9BD7F805CA4736B870B6571594D0D8FCFC57B98431143DFB770E083FA9BE89BC72'),
	(14, 'admin3', '448D8CA07486257065ADD370C87E61A3C778C70D4FCB5DB89F011ADE315E7A942FB3352E6BDED66C4F9ADEF6F3314588ACE81AA12096111EE306FA5ED4294182'),
	(16, 'admin4', '1BEE03396CC6C1C645B61C6AC87A941E7ABF5E42CE5B6CA5927B2013362756FFB4934326EBA570CA34CD4521E5AC02A31DD9FCD1BD11268A7345DED443DA1DD6'),
	(17, 'test', 'EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `allergen`;
CREATE TABLE IF NOT EXISTS `allergen` (
  `allergen_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `topping_id` int unsigned NOT NULL,
  `pizza_id` int unsigned NOT NULL,
  PRIMARY KEY (`allergen_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_allergen_topping_id_idx` (`topping_id`),
  KEY `fk_allergen_pizza_id_idx` (`pizza_id`),
  CONSTRAINT `fk_allergen_pizza_id` FOREIGN KEY (`pizza_id`) REFERENCES `pizza` (`pizza_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_allergen_topping_id` FOREIGN KEY (`topping_id`) REFERENCES `topping` (`topping_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `allergen`;
/*!40000 ALTER TABLE `allergen` DISABLE KEYS */;
INSERT INTO `allergen` (`allergen_id`, `name`, `description`, `topping_id`, `pizza_id`) VALUES
	(1, 'Cili', 'Ljuto', 1, 1);
/*!40000 ALTER TABLE `allergen` ENABLE KEYS */;

DROP TABLE IF EXISTS `allergen_image`;
CREATE TABLE IF NOT EXISTS `allergen_image` (
  `allergen_image_id` int unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `allergen_id` int unsigned NOT NULL,
  PRIMARY KEY (`allergen_image_id`),
  UNIQUE KEY `allergen_id_UNIQUE` (`allergen_id`),
  KEY `fk_allergen_image_allergen_id_idx` (`allergen_id`),
  CONSTRAINT `fk_allergen_image_allergen_id` FOREIGN KEY (`allergen_id`) REFERENCES `allergen` (`allergen_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `allergen_image`;
/*!40000 ALTER TABLE `allergen_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `allergen_image` ENABLE KEYS */;

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int unsigned NOT NULL AUTO_INCREMENT,
  `price` int DEFAULT '0',
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `cart`;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int unsigned NOT NULL DEFAULT '0',
  `customer_name` varchar(64) NOT NULL,
  `customer_address` varchar(200) NOT NULL,
  `customer_phone` varchar(64) NOT NULL,
  `status` enum('accepted','rejected','pending') NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_order_cart_id` (`cart_id`),
  CONSTRAINT `fk_order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `order`;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `pizza_id` int unsigned NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_image_path` (`image_path`),
  KEY `FK_photo_pizza_id` (`pizza_id`),
  CONSTRAINT `FK_photo_pizza_id` FOREIGN KEY (`pizza_id`) REFERENCES `pizza` (`pizza_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `photo`;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` (`photo_id`, `pizza_id`, `image_path`) VALUES
	(4, 2, '20201021-6488527278-pizza1-slika.jpg'),
	(7, 2, '20201025-5377306449-pizza1-slika.jpg');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

DROP TABLE IF EXISTS `pizza`;
CREATE TABLE IF NOT EXISTS `pizza` (
  `pizza_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`pizza_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `pizza`;
/*!40000 ALTER TABLE `pizza` DISABLE KEYS */;
INSERT INTO `pizza` (`pizza_id`, `name`, `description`) VALUES
	(1, 'Vegeteriana', 'Pica za vegane'),
	(2, 'Margarita', 'Opis pice');
/*!40000 ALTER TABLE `pizza` ENABLE KEYS */;

DROP TABLE IF EXISTS `pizza_cart`;
CREATE TABLE IF NOT EXISTS `pizza_cart` (
  `pizza_cart_id` int unsigned NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL DEFAULT '0',
  `cart_id` int unsigned NOT NULL DEFAULT '0',
  `pizza_id` int unsigned NOT NULL,
  PRIMARY KEY (`pizza_cart_id`),
  KEY `fk_pizza_cart_cart_id` (`cart_id`),
  KEY `fk_pizza_cart_pizza_id` (`pizza_id`),
  CONSTRAINT `fk_pizza_cart_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_pizza_cart_pizza_id` FOREIGN KEY (`pizza_id`) REFERENCES `pizza` (`pizza_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `pizza_cart`;
/*!40000 ALTER TABLE `pizza_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `pizza_cart` ENABLE KEYS */;

DROP TABLE IF EXISTS `pizza_price`;
CREATE TABLE IF NOT EXISTS `pizza_price` (
  `pizza_price_id` int unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(10,0) NOT NULL,
  `pizza_id` int unsigned NOT NULL,
  PRIMARY KEY (`pizza_price_id`),
  KEY `fk_pizza_price_pizza_id_idx` (`pizza_id`),
  CONSTRAINT `fk_pizza_price_pizza_id` FOREIGN KEY (`pizza_id`) REFERENCES `pizza` (`pizza_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `pizza_price`;
/*!40000 ALTER TABLE `pizza_price` DISABLE KEYS */;
INSERT INTO `pizza_price` (`pizza_price_id`, `price`, `pizza_id`) VALUES
	(1, 10, 1),
	(2, 12, 2),
	(3, 15, 2);
/*!40000 ALTER TABLE `pizza_price` ENABLE KEYS */;

DROP TABLE IF EXISTS `pizza_size`;
CREATE TABLE IF NOT EXISTS `pizza_size` (
  `pizza_size_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `size` int unsigned NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `pizza_id` int unsigned NOT NULL,
  PRIMARY KEY (`pizza_size_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_pizza_size_pizza_id_idx` (`pizza_id`),
  CONSTRAINT `fk_pizza_size_pizza_id` FOREIGN KEY (`pizza_id`) REFERENCES `pizza` (`pizza_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `pizza_size`;
/*!40000 ALTER TABLE `pizza_size` DISABLE KEYS */;
/*!40000 ALTER TABLE `pizza_size` ENABLE KEYS */;

DROP TABLE IF EXISTS `topping`;
CREATE TABLE IF NOT EXISTS `topping` (
  `topping_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `pizza_id` int unsigned NOT NULL,
  PRIMARY KEY (`topping_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_topping_pizza_id_idx` (`pizza_id`),
  CONSTRAINT `fk_topping_pizza_id` FOREIGN KEY (`pizza_id`) REFERENCES `pizza` (`pizza_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `topping`;
/*!40000 ALTER TABLE `topping` DISABLE KEYS */;
INSERT INTO `topping` (`topping_id`, `name`, `description`, `price`, `pizza_id`) VALUES
	(1, 'Kecap', 'Blagi kecap', 30, 1);
/*!40000 ALTER TABLE `topping` ENABLE KEYS */;

DROP TABLE IF EXISTS `topping_image`;
CREATE TABLE IF NOT EXISTS `topping_image` (
  `topping_image_id` int unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  `topping_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`topping_image_id`),
  UNIQUE KEY `uq_topping_image_image_path` (`image_path`),
  KEY `fk_topping_image_topping_id` (`topping_id`),
  CONSTRAINT `fk_topping_image_topping_id` FOREIGN KEY (`topping_id`) REFERENCES `topping` (`topping_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `topping_image`;
/*!40000 ALTER TABLE `topping_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `topping_image` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
