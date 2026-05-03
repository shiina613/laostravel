-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: laostravel
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article_images`
--

DROP TABLE IF EXISTS `article_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `caption` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `sort_order` int DEFAULT '0',
  `article_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpcdiyyvqcn7o8xugv0ud9ab5x` (`article_id`),
  CONSTRAINT `FKpcdiyyvqcn7o8xugv0ud9ab5x` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_images`
--

LOCK TABLES `article_images` WRITE;
/*!40000 ALTER TABLE `article_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `slug` varchar(220) NOT NULL,
  `status` varchar(20) DEFAULT 'ACTIVE',
  `summary` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `view_count` int DEFAULT '0',
  `author_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsn7al9fwhgtf98rvn8nxhjt4f` (`slug`),
  KEY `FKe02fs2ut6qqoabfhj325wcjul` (`author_id`),
  CONSTRAINT `FKe02fs2ut6qqoabfhj325wcjul` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Du lịch Lào tự túc ngày càng phổ biến với du khách Việt Nam nhờ khoảng cách gần và chi phí hợp lý. Công dân Việt Nam được miễn visa 30 ngày. Có thể đến bằng máy bay, xe khách qua cửa khẩu Cầu Treo hoặc Lao Bảo. Bữa ăn tại nhà hàng địa phương chỉ từ 20.000-50.000 kip. Thời điểm đẹp nhất là tháng 11 đến tháng 3.','2026-04-12 17:27:17','kinh-nghiem-du-lich-lao-tu-tuc','ACTIVE','Hướng dẫn chi tiết về cách du lịch Lào tự túc với ngân sách hợp lý: từ visa, vé máy bay, phương tiện di chuyển đến chỗ ở và ẩm thực.','/uploads/articles/1/thumbnail.jpg','Kinh nghiệm du lịch Lào tự túc từ A đến Z',0,2),(2,'Lào ẩn chứa vô số điểm đến tuyệt vời. Top 10 không thể bỏ qua: Luang Prabang, Thác Kuang Si, Vientiane, Vang Vieng, Si Phan Don (4000 Đảo), Cánh đồng Chum, Pakse, Wat Phu, Nong Khiaw và Muang Ngoi. Mỗi nơi mang một vẻ đẹp và trải nghiệm hoàn toàn khác biệt.','2026-04-12 17:27:17','top-10-diem-den-khong-the-bo-qua-khi-du-lich-lao','ACTIVE','Danh sách những địa điểm đẹp nhất và ấn tượng nhất tại Lào mà bất kỳ du khách nào cũng nên ghé thăm ít nhất một lần trong đời.','/uploads/articles/2/thumbnail.jpg','Top 10 điểm đến không thể bỏ qua khi du lịch Lào',0,2),(3,'Khi vào chùa cần ăn mặc kín đáo và bỏ giày dép. Không chạm vào đầu người khác. Đơn vị tiền tệ là Kip (LAK), 1 USD xấp xỉ 21.000 kip. Uống nước đóng chai, mang thuốc chống muỗi. Lào là một trong những nước an toàn nhất Đông Nam Á.','2026-04-12 17:27:17','nhung-luu-y-quan-trong-khi-du-lich-lao','ACTIVE','Tổng hợp những điều cần biết trước khi đặt chân đến Lào: văn hóa, phong tục, tiền tệ, sức khỏe và an toàn để có chuyến đi suôn sẻ.','/uploads/articles/3/thumbnail.jpg','Những lưu ý quan trọng khi du lịch Lào dành cho người Việt',0,2);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKt8o6pivur7nn124jehx7cygw5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Các địa điểm thiên nhiên trong Lào','Thiên nhiên'),(3,'Chùa chiền và địa điểm tôn giáo','Tâm linh'),(4,'Các thành phố du lịch','Thành phố'),(5,'Đây là mô tả chi tiết','Địa điểm du lịch'),(6,'','Văn hóa');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destination_images`
--

DROP TABLE IF EXISTS `destination_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destination_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `caption` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `sort_order` int DEFAULT '0',
  `destination_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcc0wuw8papfbghqwbnc6hyax3` (`destination_id`),
  CONSTRAINT `FKcc0wuw8papfbghqwbnc6hyax3` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destination_images`
--

LOCK TABLES `destination_images` WRITE;
/*!40000 ALTER TABLE `destination_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `destination_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `name` varchar(150) NOT NULL,
  `province` varchar(100) DEFAULT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `slug` varchar(180) NOT NULL,
  `status` varchar(20) DEFAULT 'ACTIVE',
  `thumbnail` varchar(255) DEFAULT NULL,
  `view_count` int DEFAULT '0',
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK98g45j49s3s6u1m8ahgcokptt` (`slug`),
  KEY `FKafesyqh4xb927cnii2becigge` (`category_id`),
  CONSTRAINT `FKafesyqh4xb927cnii2becigge` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (32,'2026-04-12 17:27:17','Luang Prabang là cố đô của Lào, được UNESCO công nhận là Di sản Thế giới năm 1995. Thành phố nằm ở ngã ba sông Mekong và sông Nam Khan, bao quanh bởi những ngọn núi xanh mướt. Nơi đây nổi tiếng với hơn 30 ngôi chùa cổ kính, trong đó Wat Xieng Thong là đẹp nhất. Mỗi buổi sáng sớm, du khách có thể chứng kiến nghi lễ dâng cơm (Tak Bat) của các nhà sư mặc áo vàng rực rỡ.','Luang Prabang','Tỉnh Luang Prabang','Thành phố cổ kính được UNESCO công nhận, nổi tiếng với những ngôi chùa vàng và phố cổ bên sông Mekong.','luang-prabang','ACTIVE','/uploads/destinations/2/thumbnail.jpg',0,4),(33,'2026-04-12 17:27:17','Vientiane là thủ đô và thành phố lớn nhất của Lào, nằm bên bờ sông Mekong. Đây là một trong những thủ đô yên tĩnh nhất Đông Nam Á. Điểm nhấn là Pha That Luang - biểu tượng quốc gia, một tháp vàng rực rỡ xây từ thế kỷ 16. Patuxai - Khải Hoàn Môn của Lào - là công trình kiến trúc ấn tượng không thể bỏ qua. Dọc bờ sông Mekong có con đường đi bộ tuyệt đẹp để ngắm hoàng hôn.','Vientiane','Thủ đô Vientiane','Thủ đô yên bình của Lào với kiến trúc Pháp-Lào độc đáo, bảo tàng phong phú và cuộc sống nhẹ nhàng bên sông Mekong.','vientiane','ACTIVE','/uploads/destinations/3/thumbnail.jpg',0,4),(34,'2026-04-12 17:27:17','Thác Kuang Si là một trong những thác nước đẹp nhất Đông Nam Á, nằm cách Luang Prabang khoảng 29km về phía nam. Thác có ba tầng chính với chiều cao tổng cộng khoảng 60m, nước chảy qua các tầng đá vôi tạo thành những hồ bơi tự nhiên với màu xanh ngọc bích tuyệt đẹp. Du khách có thể tắm trong các hồ nước mát lạnh hoặc đi bộ theo đường mòn lên đỉnh thác.','Thác Kuang Si','Tỉnh Luang Prabang','Thác nước ba tầng huyền ảo với làn nước xanh ngọc bích, cách Luang Prabang 29km - điểm đến không thể bỏ qua.','thac-kuang-si','ACTIVE','/uploads/destinations/4/thumbnail.jpg',0,2),(35,'2026-04-12 17:27:17','Vang Vieng là thị trấn du lịch nằm bên bờ sông Nam Song, bao quanh bởi những dãy núi đá vôi hùng vĩ. Đây là thiên đường cho người yêu thích hoạt động ngoài trời: kayaking trên sông, leo núi, đi xe đạp qua cánh đồng lúa xanh, hay khám phá các hang động như Tham Jang, Tham Phu Kham với hồ nước xanh trong vắt bên trong.','Vang Vieng','Tỉnh Vientiane','Thị trấn phiêu lưu nằm giữa những núi đá vôi hùng vĩ, nổi tiếng với kayaking, leo núi và hang động kỳ bí.','vang-vieng','ACTIVE','/uploads/destinations/5/thumbnail.jpg',0,2),(36,'2026-04-12 17:27:17','Wat Xieng Thong được xây dựng năm 1560 dưới triều vua Setthathirath, là ngôi chùa quan trọng và đẹp nhất trong số hơn 30 ngôi chùa tại Luang Prabang. Kiến trúc đặc trưng với mái cong nhiều tầng chạm gần đến mặt đất, được trang trí bằng những mảnh kính màu ghép thành tranh mô tả cây sự sống và các cảnh trong thần thoại Phật giáo.','Wat Xieng Thong','Tỉnh Luang Prabang','Ngôi chùa hoàng gia đẹp nhất Lào tại Luang Prabang, kiệt tác kiến trúc Phật giáo với mái cong chạm đất và khảm kính rực rỡ.','wat-xieng-thong','ACTIVE','/uploads/destinations/6/thumbnail.jpg',0,3),(38,'2026-04-12 19:08:55','Thành phố này nằm ở miền Bắc','Hà Nội','Hà Nội','Thủ đô Việt Nam','ví dụ','ACTIVE','/uploads/destinations/38/thumbnail-0f4a8cb1-2576-4ce4-a710-f1b0936cbda6.jpg',0,4);
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `festivals`
--

DROP TABLE IF EXISTS `festivals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `festivals` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `end_date` date DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `province` varchar(100) DEFAULT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `slug` varchar(180) NOT NULL,
  `start_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT 'ACTIVE',
  `thumbnail` varchar(255) DEFAULT NULL,
  `view_count` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKnn6sumjt3plicsq1pcsxhv7od` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `festivals`
--

LOCK TABLES `festivals` WRITE;
/*!40000 ALTER TABLE `festivals` DISABLE KEYS */;
INSERT INTO `festivals` VALUES (1,'2026-04-12 17:27:17','Bunpimay là lễ hội Năm Mới truyền thống của người Lào, thường diễn ra từ ngày 13 đến 15 tháng 4 hàng năm. Điểm nhấn là tục té nước - người dân và du khách té nước vào nhau như cách chúc phúc, rửa trôi điều xui xẻo của năm cũ. Ngoài ra còn có nghi lễ tắm tượng Phật bằng nước thơm, diễu hành trên đường phố và biểu diễn âm nhạc truyền thống.','2026-04-15','Tết Bunpimay (Năm Mới Lào)','Toàn quốc','Lễ hội Năm Mới lớn nhất của người Lào diễn ra vào tháng 4, với những màn té nước vui nhộn và nghi lễ tắm tượng Phật thiêng liêng.','tet-bunpimay','2026-04-13','ACTIVE','/uploads/festivals/1/thumbnail.jpg',0),(2,'2026-04-12 17:27:17','Lễ hội Thạt Luổng là lễ hội tôn giáo và văn hóa lớn nhất của Lào, diễn ra vào tháng 11 tại khuôn viên tháp vàng Pha That Luang ở Vientiane. Lễ hội kéo dài khoảng một tuần với các nhà sư và người dân từ khắp nơi đổ về hành hương. Ban đêm, hàng nghìn ngọn nến và đèn lồng được thắp sáng tạo nên khung cảnh huyền ảo lung linh.','2026-11-17','Lễ hội Thạt Luổng','Vientiane','Lễ hội Phật giáo lớn nhất Lào tổ chức tại tháp vàng Pha That Luang ở Vientiane, thu hút hàng chục nghìn người hành hương mỗi năm.','le-hoi-that-luang','2026-11-10','ACTIVE','/uploads/festivals/2/thumbnail.jpg',0),(3,'2026-04-12 17:27:17','Boun Lai Heua Fai là lễ hội đẹp nhất và lãng mạn nhất của Lào, diễn ra vào cuối tháng 10 đánh dấu sự kết thúc mùa mưa. Người dân thả những chiếc thuyền nhỏ làm từ lá chuối, trang trí bằng hoa và nến xuống sông Mekong. Hàng nghìn chiếc thuyền đèn lung linh trôi theo dòng nước tạo nên cảnh tượng huyền ảo như trong cổ tích.','2026-10-21','Lễ hội Đèn Lồng (Boun Lai Heua Fai)','Luang Prabang, Vientiane','Lễ hội thả thuyền đèn lồng lung linh trên sông Mekong vào cuối mùa mưa, một trong những cảnh tượng đẹp nhất ở Lào.','le-hoi-den-long-boun-lai-heua-fai','2026-10-20','ACTIVE','/uploads/festivals/3/thumbnail.jpg',0),(4,'2026-04-12 17:27:17','Boun Souang Heua là lễ hội thể thao truyền thống quan trọng của Lào, thường diễn ra vào tháng 10 sau khi mùa mưa kết thúc. Hàng trăm đội thuyền với những chiếc thuyền dài được sơn màu sặc sỡ, mỗi thuyền có từ 50-60 tay chèo, thi đấu trong tiếng trống và tiếng hò reo cổ vũ của hàng nghìn khán giả.','2026-10-07','Lễ hội Đua Thuyền (Boun Souang Heua)','Vientiane, Luang Prabang','Cuộc đua thuyền truyền thống sôi động trên sông Mekong, diễn ra sau mùa mưa với sự tham gia của hàng trăm đội thuyền từ khắp cả nước.','le-hoi-dua-thuyen-boun-souang-heua','2026-10-05','ACTIVE','/uploads/festivals/4/thumbnail.jpg',0);
/*!40000 ALTER TABLE `festivals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'ADMIN'),(1,'USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(20) DEFAULT 'ACTIVE',
  `username` varchar(50) NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`),
  CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-03-15 04:54:33','tung01@gmail.com','tung01','$2a$10$3qqMawilyCHRXe99c7lGpu8WYI6vn5y/4Be.IgAYjQy1Fb6vosuzy','ACTIVE','tung01',1),(2,'2026-03-15 04:57:50','admin@example.com','Administrator','$2a$10$HP7LXSZzmAH8p8D0g6IVTuxvRbo19aLjlR2qkgeG2oHi.8UvxwhOu','ACTIVE','admin',2),(3,'2026-03-15 17:27:30','thain@gmail.com','thain','$2a$10$hMS8cMvB6VAdxqfaNqqsiOBzviizvofTO0XaVtIWcAB5zlzQECGom','ACTIVE','thain',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-17 10:43:04
