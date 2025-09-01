/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.5.29-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: blog_arte_db
-- ------------------------------------------------------
-- Server version	10.5.29-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `analises`
--

DROP TABLE IF EXISTS `analises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `analises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo_analise` varchar(255) NOT NULL,
  `conteudo_analise` text DEFAULT NULL,
  `nome_autor` varchar(100) DEFAULT NULL,
  `data_publicacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `obra_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `obra_id` (`obra_id`),
  CONSTRAINT `analises_ibfk_1` FOREIGN KEY (`obra_id`) REFERENCES `obras` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analises`
--

LOCK TABLES `analises` WRITE;
/*!40000 ALTER TABLE `analises` DISABLE KEYS */;
INSERT INTO `analises` VALUES (1,'A Simbologia Oculta em \'O Nascimento de Vênus\'',NULL,NULL,'2025-09-01 10:18:15',1),(4,'Luz e Sombra: O Contraste na \'Ronda Noturna\'','Análise sobre a obra \"A Ronda Noturna\" de Rembrandt.','Visitante','2025-09-01 10:21:19',4);
/*!40000 ALTER TABLE `analises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimentos_arte`
--

DROP TABLE IF EXISTS `movimentos_arte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimentos_arte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_movimento` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimentos_arte`
--

LOCK TABLES `movimentos_arte` WRITE;
/*!40000 ALTER TABLE `movimentos_arte` DISABLE KEYS */;
INSERT INTO `movimentos_arte` VALUES (1,'Renascimento','renascimento'),(2,'Barroco','barroco');
/*!40000 ALTER TABLE `movimentos_arte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obras`
--

DROP TABLE IF EXISTS `obras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `obras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo_obra` varchar(255) NOT NULL,
  `nome_artista` varchar(255) NOT NULL,
  `ano_criacao` varchar(50) DEFAULT NULL,
  `url_imagem` varchar(255) NOT NULL,
  `movimento_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movimento_id` (`movimento_id`),
  CONSTRAINT `obras_ibfk_1` FOREIGN KEY (`movimento_id`) REFERENCES `movimentos_arte` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obras`
--

LOCK TABLES `obras` WRITE;
/*!40000 ALTER TABLE `obras` DISABLE KEYS */;
INSERT INTO `obras` VALUES (1,'O Nascimento de Vênus','Sandro Botticelli',NULL,'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/800px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',1),(2,'Análise sobre a obra \"A Ronda Noturna\" de Rembrandt.','Artista Desconhecido',NULL,'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/800px-The_Night_Watch_-_HD.jpg',1),(3,'Análise sobre a obra \"A Ronda Noturna\" de Rembrandt.','Artista Desconhecido',NULL,'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/800px-The_Night_Watch_-_HD.jpg',1),(4,'Análise sobre a obra \"A Ronda Noturna\" de Rembrandt.','Artista Desconhecido',NULL,'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/800px-The_Night_Watch_-_HD.jpg',1);
/*!40000 ALTER TABLE `obras` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 10:42:20
