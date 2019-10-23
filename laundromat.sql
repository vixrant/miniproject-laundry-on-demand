-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: laundromat
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.19.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `user_id` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `latitude` double(10,4) DEFAULT NULL,
  `longitude` double(10,4) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES ('5ZRjASFa2idaJYr61HWVhM','102, vishnu chs, dadar west','mumbai',19.9281,72.3633),('9Ar5JSFfz7Rx8HM59e67A6','953, ramesh chs, kandivali west','mumbai',19.1938,72.4228),('moafK4qor4YKKCMAD7TtWa','192, suresh chs, borivali west','mumbai',19.3811,72.2922);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment_items`
--

DROP TABLE IF EXISTS `appointment_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointment_items` (
  `appointment_id` varchar(255) NOT NULL,
  `item_type_id` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`appointment_id`,`item_type_id`),
  KEY `item_type_id` (`item_type_id`),
  CONSTRAINT `appointment_items_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`) ON DELETE CASCADE,
  CONSTRAINT `appointment_items_ibfk_2` FOREIGN KEY (`item_type_id`) REFERENCES `item_types` (`type_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_items`
--

LOCK TABLES `appointment_items` WRITE;
/*!40000 ALTER TABLE `appointment_items` DISABLE KEYS */;
INSERT INTO `appointment_items` VALUES ('bkUsBizKMYAf3DRFmMh3QE','42ZUvCdgWc7EN3svPv7vFf',2),('bkUsBizKMYAf3DRFmMh3QE','5vr92CvxpJZkPiYoKpxsFP',4);
/*!40000 ALTER TABLE `appointment_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `appointment_id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `shop_id` varchar(255) DEFAULT NULL,
  `address_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `scheduled_for` date DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `user_id` (`user_id`),
  KEY `shop_id` (`shop_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `appointments_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `appointments_ibfk_5` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `appointments_ibfk_6` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES ('bkUsBizKMYAf3DRFmMh3QE','moafK4qor4YKKCMAD7TtWa','9Ar5JSFfz7Rx8HM59e67A6','moafK4qor4YKKCMAD7TtWa','2019-10-02 19:24:04','2019-10-03');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!50001 DROP VIEW IF EXISTS `customers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `customers` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `password`,
 1 AS `email`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `item_types`
--

DROP TABLE IF EXISTS `item_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_types` (
  `type_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `ironing_price` double(10,2) DEFAULT NULL,
  `dry_cleaning_price` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_types`
--

LOCK TABLES `item_types` WRITE;
/*!40000 ALTER TABLE `item_types` DISABLE KEYS */;
INSERT INTO `item_types` VALUES ('42ZUvCdgWc7EN3svPv7vFf','trouser',20.00,30.00),('5vr92CvxpJZkPiYoKpxsFP','shirt',15.00,25.00),('ivHsAZzutc3KpNkt7EdcXG','jeans',25.00,35.00),('wNFaMXVhdbCmPEfwPkdhXA','t-shirt',10.00,20.00);
/*!40000 ALTER TABLE `item_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratings` (
  `shop_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`shop_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ratings_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_ibfk_6` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES ('5ZRjASFa2idaJYr61HWVhM','moafK4qor4YKKCMAD7TtWa',3,'very good shop'),('9Ar5JSFfz7Rx8HM59e67A6','moafK4qor4YKKCMAD7TtWa',1,'very bad shop');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shops`
--

DROP TABLE IF EXISTS `shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shops` (
  `user_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shops`
--

LOCK TABLES `shops` WRITE;
/*!40000 ALTER TABLE `shops` DISABLE KEYS */;
INSERT INTO `shops` VALUES ('5ZRjASFa2idaJYr61HWVhM','pals salon'),('9Ar5JSFfz7Rx8HM59e67A6','mans supermarket');
/*!40000 ALTER TABLE `shops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_shop_owner` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('5ZRjASFa2idaJYr61HWVhM','palash','$2b$10$ohMRj.QfnUOuBbrNLpD11eUfdxut05LvJN7yioaHpsJUbxo/euSB.','pals@gmail.com',0),('9Ar5JSFfz7Rx8HM59e67A6','manan','$2b$10$tdGabdrIteJRW7UpsqZndeGXpQmx4h7hAmAIzuWFTqgvvXT2XMO0y','man@gmail.com',0),('moafK4qor4YKKCMAD7TtWa','vikrant','$2b$10$sAQh0tgmvwIcdSmq9Bpbx..91mM3oO7T7oTeUTX62ypoD4yJb9itm','vik@gmail.com',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `customers`
--

/*!50001 DROP VIEW IF EXISTS `customers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50001 VIEW `customers` AS (select `users`.`id` AS `id`,`users`.`name` AS `name`,`users`.`password` AS `password`,`users`.`email` AS `email` from `users` where (not(`users`.`id` in (select `shops`.`user_id` from `shops`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-04 19:04:15
