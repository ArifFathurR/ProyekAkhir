-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 04, 2026 at 03:47 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistemdokumentasikegiatan`
--

-- --------------------------------------------------------

--
-- Table structure for table `anggota_tims`
--

CREATE TABLE `anggota_tims` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tim_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anggota_tims`
--

INSERT INTO `anggota_tims` (`id`, `created_at`, `updated_at`, `role`, `tim_id`, `user_id`) VALUES
(1, '2025-05-05 20:12:27', '2025-05-05 20:12:27', 'Ketua', 1, 1),
(2, '2025-05-05 20:12:38', '2025-05-05 20:12:38', 'anggota', 1, 2),
(3, '2025-05-05 21:40:11', '2025-05-05 22:03:48', 'Anggota', 1, 3),
(4, '2025-06-20 03:19:10', '2025-07-17 23:34:05', 'Anggota', 1, 6),
(5, '2025-07-13 07:06:30', '2025-07-18 00:31:11', 'Anggota', 1, 7),
(6, '2025-07-13 07:12:01', '2025-07-13 07:12:01', 'Ketua', 2, 4),
(7, '2025-07-18 23:46:40', '2025-07-18 23:46:40', 'Ketua', 1, 5),
(8, '2025-10-11 07:06:30', '2025-10-11 07:06:30', 'Ketua Tim', 2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('pemantau@sipantau.com|127.0.0.1', 'i:1;', 1765202065),
('pemantau@sipantau.com|127.0.0.1:timer', 'i:1765202065;', 1765202065),
('supervisor@gmail.com|127.0.0.1', 'i:2;', 1765203481),
('supervisor@gmail.com|127.0.0.1:timer', 'i:1765203481;', 1765203481),
('udin@gmail.com|127.0.0.1', 'i:1;', 1762257267),
('udin@gmail.com|127.0.0.1:timer', 'i:1762257267;', 1762257267);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dokumentasi_kegiatans`
--

CREATE TABLE `dokumentasi_kegiatans` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `penerima_id` bigint UNSIGNED DEFAULT NULL,
  `undangan_id` bigint UNSIGNED DEFAULT NULL,
  `kegiatan_id` bigint UNSIGNED DEFAULT NULL,
  `notulensi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `link_zoom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `link_materi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dokumentasi_kegiatans`
--

INSERT INTO `dokumentasi_kegiatans` (`id`, `created_at`, `updated_at`, `penerima_id`, `undangan_id`, `kegiatan_id`, `notulensi`, `link_zoom`, `link_materi`) VALUES
(7, '2025-06-20 01:30:44', '2025-06-20 01:30:44', NULL, 2, 1, '', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(8, '2025-06-20 01:32:14', '2025-06-20 01:32:14', NULL, 15, 1, '', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(9, '2025-06-20 01:44:03', '2025-06-20 01:44:03', NULL, NULL, 1, '', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(10, '2025-06-20 01:48:04', '2025-06-20 01:48:04', NULL, NULL, 1, '', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(11, '2025-06-20 01:59:13', '2025-06-20 01:59:13', NULL, NULL, 1, '', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(12, '2025-06-20 03:04:24', '2025-06-20 03:04:24', NULL, 2, 1, '', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(22, '2025-07-08 07:46:04', '2025-07-08 07:46:04', NULL, 15, 1, '', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(26, '2025-07-08 07:52:54', '2025-07-08 07:52:54', NULL, 15, 1, '', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(31, '2025-07-18 01:33:54', '2025-07-18 20:20:25', NULL, 5, 1, 'test', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(36, '2025-07-18 20:26:26', '2025-07-18 20:26:26', NULL, 15, 1, 'sdfasdf', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans11111', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans1'),
(37, '2025-07-18 20:31:21', '2025-07-18 20:31:21', NULL, 20, 1, 'asdfasl;dflasdkfasl;djf;lasdjflsdakjfl;asjdkf;lsajdf;ljkasdf;kljsadfasdf', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans11111', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans1'),
(82, '2025-10-03 07:25:56', '2025-10-03 07:25:56', NULL, 20, 1, 'Tesinggg tambah dokumentasi', 'http://127.0.0.1:8000/', 'http://127.0.0.1:8000/'),
(83, '2025-10-11 07:30:16', '2025-10-11 07:40:28', NULL, 1, 1, '111111', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans'),
(84, '2025-10-11 07:30:19', '2025-10-11 07:30:19', NULL, 1, 1, 'zaaaaaa', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans', 'http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=sistemdokumentasikegiatan&table=undangan_kegiatans');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `connection` text COLLATE utf8mb4_general_ci NOT NULL,
  `queue` text COLLATE utf8mb4_general_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foto_dokumentasis`
--

CREATE TABLE `foto_dokumentasis` (
  `id` bigint UNSIGNED NOT NULL,
  `dokumentasi_id` bigint UNSIGNED DEFAULT NULL,
  `foto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foto_dokumentasis`
--

INSERT INTO `foto_dokumentasis` (`id`, `dokumentasi_id`, `foto`, `created_at`, `updated_at`) VALUES
(8, 7, 'foto_dokumentasi/vYUMyxOHOhTrALYiQB2I.png', '2025-06-20 01:30:45', '2025-06-20 01:30:45'),
(9, 8, 'foto_dokumentasi/0Dc4h1SVrlxAG8sPrEUg.png', '2025-06-20 01:32:14', '2025-06-20 01:32:14'),
(10, 9, 'foto_dokumentasi/E563E8TK1HUc5pmJEMfm.png', '2025-06-20 01:44:03', '2025-06-20 01:44:03'),
(11, 10, 'foto_dokumentasi/p6Onqdy8mNy5NI6VciLY.png', '2025-06-20 01:48:04', '2025-06-20 01:48:04'),
(12, 11, 'foto_dokumentasi/jbsnVuKNyNLbaeJGjJMP.png', '2025-06-20 01:59:13', '2025-06-20 01:59:13'),
(13, 12, 'foto_dokumentasi/eOpzdva77vd0J4DjsKfA.png', '2025-06-20 03:04:24', '2025-06-20 03:04:24'),
(14, 12, 'foto_dokumentasi/GWzgj8JXTLc05yZGZQes.png', '2025-06-20 03:04:24', '2025-06-20 03:04:24'),
(15, 12, 'foto_dokumentasi/bezw46nO4QybjykrRWYX.png', '2025-06-20 03:04:24', '2025-06-20 03:04:24'),
(19, 22, 'foto_dokumentasi/fJjwHpJEfZEEj5SVvPNv.jpg', '2025-07-08 07:46:04', '2025-07-08 07:46:04'),
(20, 22, 'foto_dokumentasi/HnIIxIbjHzc2F7QcqQRk.jpg', '2025-07-08 07:46:06', '2025-07-08 07:46:06'),
(21, 22, 'foto_dokumentasi/hkcSS00Ag6FiAffNc2Ot.jpg', '2025-07-08 07:46:06', '2025-07-08 07:46:06'),
(26, 26, 'foto_dokumentasi/rTka5TjJ5Qt9XLBbO4Vw.jpg', '2025-07-08 07:52:54', '2025-07-08 07:52:54'),
(51, 36, 'foto_dokumentasi/1hiSEbRJOPL0yxwQOz6J.jpg', '2025-07-18 20:26:26', '2025-07-18 20:26:26'),
(55, NULL, 'foto_dokumentasi/f4CHkugVKpAMncTmhemHwlMS7wBYBT8OtWKnKKwr.png', '2025-10-01 02:40:19', '2025-10-01 02:40:19'),
(56, NULL, 'foto_dokumentasi/cDMEWUay4szhgg7q5P7BR9ptWn89FgL1Xpgdvfr2.png', '2025-10-01 02:40:19', '2025-10-01 02:40:19'),
(57, NULL, 'foto_dokumentasi/CiSgNMkTLrsLGxBvDfQyfWZR11gSc5XJlu8BAFjM.png', '2025-10-01 02:55:00', '2025-10-01 02:55:00'),
(58, NULL, 'foto_dokumentasi/Hy6JpYBMyCJLA8vXzAs0esVLODXcDfd36EV6UxCc.png', '2025-10-01 02:55:00', '2025-10-01 02:55:00'),
(59, NULL, 'foto_dokumentasi/qgt4o6AC3TBIgEAMPdhkRocsHcl9LSQEfSG4a5XO.png', '2025-10-01 02:55:30', '2025-10-01 02:55:30'),
(76, 37, 'foto_dokumentasi/DzuUEWlPYAl7h4gVElFn.jpg', '2025-10-02 03:03:38', '2025-10-02 03:03:38'),
(77, 37, 'foto_dokumentasi/e910JBUKuSJEPd0bo8Kw.jpg', '2025-10-02 03:03:38', '2025-10-02 03:03:38'),
(80, 83, 'foto_dokumentasi/bsw9gRbm0hBqYYV79nFS.jpg', '2025-10-11 07:30:18', '2025-10-11 07:30:18'),
(81, 84, 'foto_dokumentasi/dyUkUU7YlBB41nInZvW9.jpg', '2025-10-11 07:30:19', '2025-10-11 07:30:19'),
(87, 82, 'dokumentasi/hNRjtUmHKrLnOLSguzFEM7fIfDJ5rhULH5ENyk0u.jpg', '2025-10-14 01:23:20', '2025-10-14 01:23:20'),
(90, 31, 'foto_dokumentasi/Yf2P62TnaeMpXVJVM13H.jpg', '2025-10-14 03:00:16', '2025-10-14 03:00:16'),
(91, 31, 'foto_dokumentasi/t8dKtXH9WHTfoniJ3DfM.jpg', '2025-10-14 03:00:16', '2025-10-14 03:00:16'),
(92, 31, 'foto_dokumentasi/s15HwyeZvwhoTXr4mDnD.jpg', '2025-10-14 03:00:16', '2025-10-14 03:00:16');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(1, 'default', '{\"uuid\":\"5150cd80-7b0b-4dab-bc7e-a3c6c22fb351\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:10:\\\"Test Email\\\";s:5:\\\"pesan\\\";s:9:\\\"testinggg\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/CZ3LxDHcEVmcw9MuPxp9GXRDIRVJiGevRE0hQTTj.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748147758, 1748147758),
(2, 'default', '{\"uuid\":\"e995233c-5eb7-49c8-9d8f-82dfedd4df3a\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:10:\\\"Test Email\\\";s:5:\\\"pesan\\\";s:9:\\\"testinggg\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/RJ0ICaT5p7eoPp9Fht8bpMgWeZyxJLApSs0gufsP.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748147758, 1748147758),
(3, 'default', '{\"uuid\":\"159d15f1-5e0c-4d5e-880b-e14df46fc4db\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:4:\\\"test\\\";s:5:\\\"pesan\\\";s:4:\\\"test\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/f1uZBKHwHxhVzYwvDrV3XGpAO965xg6LxMMIsncf.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748147873, 1748147873),
(4, 'default', '{\"uuid\":\"c49eb203-d63d-4364-9353-46e4782ca84e\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:4:\\\"Test\\\";s:5:\\\"pesan\\\";s:4:\\\"Test\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/6QsmPM8S5GuXqOGhANOrOU7LmCC4dLgH7PsAGlx3.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748148076, 1748148076),
(5, 'default', '{\"uuid\":\"da97bc42-2d6c-46a7-89c6-ce1cb74345df\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:9:\\\"Testinggg\\\";s:5:\\\"pesan\\\";s:12:\\\"RTsgsdfsdfsa\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/1D04979sYwB1czyYTyZZvylERLZfOAqb4CkVtCHM.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748148290, 1748148290),
(6, 'default', '{\"uuid\":\"a0652a33-1bb4-4018-86c5-ecad8604b848\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:4:\\\"Test\\\";s:5:\\\"pesan\\\";s:4:\\\"Test\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/c79OQ9bZm7DR0FLaGNoddSHx4sxKTaAjtMEWmrWt.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748148545, 1748148545),
(7, 'default', '{\"uuid\":\"1e163582-0d87-4fee-8396-ad029a9ec660\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:7:\\\"sdfsdfs\\\";s:5:\\\"pesan\\\";s:8:\\\"dfsafdas\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/b8p7lWV7Y6S5fE4t4wi7nkcNvipvZ8epSWOfGEDT.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748148577, 1748148577),
(8, 'default', '{\"uuid\":\"0453a51f-694d-49d1-8c10-2e24bf5e65ef\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:9:\\\"Testinggg\\\";s:5:\\\"pesan\\\";s:9:\\\"Testinggg\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/3Q2I8aSLYcN1Q8wqxOEDm1WmCJzxBGBBsjKhMzWR.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748148935, 1748148935),
(9, 'default', '{\"uuid\":\"45b01236-25aa-4ad6-bf46-24aede54f176\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:3:\\\"RRR\\\";s:5:\\\"pesan\\\";s:4:\\\"sdfs\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/pJZ3zrnWN9vRdjQfUoEKzA46xnQtEtRoLgxqNkcX.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748149005, 1748149005),
(10, 'default', '{\"uuid\":\"5abd4d08-929d-4cca-82a3-3a10060600f5\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:9:\\\"testinggg\\\";s:5:\\\"pesan\\\";s:8:\\\"Testinhh\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/nfjEykL1cowZyKElCPMIEhrh8D6QphVPzIdzFJoe.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748149453, 1748149453),
(11, 'default', '{\"uuid\":\"49429481-59a1-4436-bd80-1f82d5c161da\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:5:\\\"Tetsa\\\";s:5:\\\"pesan\\\";s:6:\\\"sfdsfs\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/19EIbGU339ji2KHnDkMw8ngkdVGhi0CyDvu7ZtDs.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748149826, 1748149826),
(12, 'default', '{\"uuid\":\"229265a2-4aab-46b5-8eb3-6bea54bbda4b\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":5:{s:6:\\\"subjek\\\";s:38:\\\"Undangan Rapat Tim Pengembangan Sistem\\\";s:5:\\\"pesan\\\";s:80:\\\"Dengan hormat, kami mengundang Bapak\\/Ibu untuk menghadiri rapat pada tanggal ...\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/IdhhX3zmSkimlwkhJIko5rttXluq3nrBtmhDMEr8.pdf\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748150054, 1748150054),
(13, 'default', '{\"uuid\":\"b86522b9-48fe-43bb-b92c-ec0ebe02dd45\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":6:{s:6:\\\"subjek\\\";s:23:\\\"Surat Undangan Kegiatan\\\";s:5:\\\"pesan\\\";s:32:\\\"waktu : 12\\/1\\/2025\\r\\nruangan : 312\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/iiYPiEWoBsaN9SqFXTyVOzfdkQcARusj6Mtj1ujL.pdf\\\";s:4:\\\"from\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";s:15:\\\"Sistem Undangan\\\";s:7:\\\"address\\\";s:28:\\\"arif22ti@mahasiswa.pcr.ac.id\\\";}}s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748150587, 1748150587),
(14, 'default', '{\"uuid\":\"dcee5ba0-a5a4-415a-9615-dfe8248a6aca\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":6:{s:6:\\\"subjek\\\";s:23:\\\"Surat Undangan Kegiatan\\\";s:5:\\\"pesan\\\";s:32:\\\"waktu : 12\\/1\\/2025\\r\\nruangan : 312\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/10OLxrlHRevfTlCqdOLtrPQaDG4LLnYbgrsJSIDC.pdf\\\";s:4:\\\"from\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";s:15:\\\"Sistem Undangan\\\";s:7:\\\"address\\\";s:28:\\\"arif22ti@mahasiswa.pcr.ac.id\\\";}}s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748151117, 1748151117),
(15, 'default', '{\"uuid\":\"8fc7aed1-584d-422a-baed-6407dbceb84c\",\"displayName\":\"App\\\\Mail\\\\UndanganKegiatanMail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:29:\\\"App\\\\Mail\\\\UndanganKegiatanMail\\\":6:{s:6:\\\"subjek\\\";s:34:\\\"Undangan Kegiatan Rapat Koordinasi\\\";s:5:\\\"pesan\\\";s:240:\\\"Yth. Bapak\\/Ibu,\\r\\n\\r\\nDengan hormat, kami mengundang Anda untuk menghadiri rapat yang akan dilaksanakan pada:\\r\\n\\r\\n📅 Hari\\/Tanggal: Senin, 27 Mei 2025  \\r\\n🕒 Pukul: 10.00 WIB  \\r\\n📍 Tempat: Ruang 312\\r\\n\\r\\nTerima kasih atas perhatian Bapak\\/Ibu.\\\";s:8:\\\"filePath\\\";s:53:\\\"undangan\\/8VOAc6Tbbknrmg7KOY9a4ikx0NnC4S9SrszNflxR.pdf\\\";s:4:\\\"from\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";s:15:\\\"Sistem Undangan\\\";s:7:\\\"address\\\";s:28:\\\"arif22ti@mahasiswa.pcr.ac.id\\\";}}s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:28:\\\"ariffathurrahman43@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:3:\\\"job\\\";N;}\"}}', 0, NULL, 1748151486, 1748151486);

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_general_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kegiatans`
--

CREATE TABLE `kegiatans` (
  `id` bigint UNSIGNED NOT NULL,
  `tim_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `nama_kegiatan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_general_ci,
  `tanggal` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kegiatans`
--

INSERT INTO `kegiatans` (`id`, `tim_id`, `user_id`, `nama_kegiatan`, `deskripsi`, `tanggal`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Test', 'sdfsdfsdafsfdfasfasdf', '2025-05-09', '2025-05-05 20:13:52', '2025-05-05 20:13:52'),
(2, 2, 1, 'Test 2', 'test', '2025-10-11', '2025-10-11 07:08:37', '2025-10-11 07:08:37');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(173, '0001_01_01_000000_create_users_table', 1),
(174, '0001_01_01_000001_create_cache_table', 1),
(175, '0001_01_01_000002_create_jobs_table', 1),
(176, '2025_04_20_033301_create_pegawais_table', 1),
(177, '2025_04_20_033436_create_tims_table', 2),
(178, '2025_04_20_033412_create_kegiatans_table', 3),
(179, '2025_04_20_033444_create_anggota_tims_table', 4),
(180, '2025_04_20_033502_create_undangan_kegiatans_table', 4),
(181, '2025_04_20_033514_create_penerima_undangans_table', 4),
(182, '2025_04_20_033529_create_dokumentasi_kegiatans_table', 4),
(183, '2025_04_20_033558_create_foto_dokumentasis_table', 4),
(184, '2025_04_22_144256_create_personal_access_tokens_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penerima_undangans`
--

CREATE TABLE `penerima_undangans` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `tim_id` bigint UNSIGNED NOT NULL,
  `undangan_id` bigint UNSIGNED DEFAULT NULL,
  `status_penerima` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `status_kehadiran` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `ttd` text COLLATE utf8mb4_general_ci,
  `latitude` text COLLATE utf8mb4_general_ci,
  `longitude` text COLLATE utf8mb4_general_ci,
  `koordinat` point DEFAULT NULL,
  `waktu_presensi` timestamp NULL DEFAULT NULL,
  `alasan_berhalangan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penerima_undangans`
--

INSERT INTO `penerima_undangans` (`id`, `created_at`, `updated_at`, `user_id`, `tim_id`, `undangan_id`, `status_penerima`, `status_kehadiran`, `ttd`, `latitude`, `longitude`, `koordinat`, `waktu_presensi`, `alasan_berhalangan`) VALUES
(3, '2025-05-26 11:25:48', '2025-05-26 11:25:48', 2, 1, 15, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(4, '2025-05-26 11:25:48', '2025-08-02 06:00:34', 3, 1, 15, 'terima', 'hadir', 'data:image/png;base64,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', NULL, NULL, NULL, '2025-08-02 06:00:34', NULL),
(5, '2025-05-26 11:28:47', '2025-10-15 07:41:42', 2, 1, 16, 'terima', 'terlambat', 'data_ttd_base64_di_sini', '-0.456789', '101.123456', NULL, '2025-10-15 07:41:42', NULL),
(6, '2025-05-26 11:28:47', '2025-10-14 01:53:11', 3, 1, 16, 'terima', 'terlambat', 'data:image/png;base64,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', '0.51026075875576', '101.45447853952', NULL, '2025-10-14 01:53:11', NULL),
(7, '2025-05-26 12:03:31', '2025-05-26 12:03:31', 2, 1, 17, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(8, '2025-05-26 12:03:31', '2025-10-15 08:40:39', 3, 1, 17, 'terima', 'hadir', 'storage/ttd/ttd_8_1760517639.png', '37.421998333333335', '-122.084', NULL, '2025-10-15 08:40:39', NULL),
(9, '2025-06-20 03:20:42', '2025-06-20 03:20:42', 2, 1, 19, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(10, '2025-06-20 03:20:42', '2025-10-01 01:53:56', 3, 1, 19, 'terima', 'hadir', 'data-base64-tanda-tangan', NULL, NULL, NULL, '2025-10-01 01:53:56', NULL),
(11, '2025-06-20 03:20:42', '2025-06-20 03:20:42', 6, 1, 19, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(24, '2025-07-18 00:42:26', '2025-07-18 00:42:26', 2, 1, 20, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(25, '2025-07-18 00:42:26', '2025-07-18 00:42:26', 3, 1, 20, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(26, '2025-07-18 00:42:26', '2025-07-18 00:42:26', 6, 1, 20, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(27, '2025-07-18 00:42:26', '2025-07-18 00:42:26', 1, 1, 20, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(28, '2025-07-18 00:42:26', '2025-07-18 00:42:26', 7, 1, 20, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(29, '2025-07-18 23:47:04', '2025-10-11 08:22:41', 3, 1, 5, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(30, '2025-07-18 23:47:04', '2025-07-18 23:47:04', 5, 1, 5, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(31, '2025-12-08 15:10:15', '2025-12-08 15:10:15', 2, 1, 21, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(32, '2025-12-08 15:10:15', '2025-12-08 15:10:15', 3, 1, 21, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(33, '2025-12-08 15:10:15', '2025-12-08 15:10:15', 6, 1, 21, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL),
(34, '2025-12-08 15:10:15', '2025-12-08 15:10:15', 7, 1, 21, 'terima', 'belum', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_general_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 9, 'android_token', '783e370502831b5ba24a4d6fa64a552e37e77a46b79c6484002d8128cd92c748', '[\"*\"]', NULL, NULL, '2025-07-21 07:06:23', '2025-07-21 07:06:23'),
(4, 'App\\Models\\User', 3, 'android_token', 'ede80d757e35865315097b0ea3572407f4657bb730f19a0b9f9b7abce2454483', '[\"*\"]', NULL, NULL, '2025-07-21 07:24:39', '2025-07-21 07:24:39'),
(6, 'App\\Models\\User', 5, 'android_token', '90fd2cffdbee8a8a3fce49ff49703416e3ffc997a212fb4d82bded931e7366bb', '[\"*\"]', NULL, NULL, '2025-07-22 01:57:00', '2025-07-22 01:57:00'),
(7, 'App\\Models\\User', 5, 'android_token', 'b18d4e86dc750a8ed9fd3ba2823c0f8410142d14111c70ba90eed2f8b300a77e', '[\"*\"]', '2025-07-22 02:00:51', NULL, '2025-07-22 01:59:44', '2025-07-22 02:00:51'),
(8, 'App\\Models\\User', 5, 'android_token', '8dd045dbb109087b671f37bf866eede02242ec7e6a534285d40db1c9831cd5a6', '[\"*\"]', NULL, NULL, '2025-07-22 02:00:24', '2025-07-22 02:00:24'),
(9, 'App\\Models\\User', 5, 'android_token', 'c07bcf0adf9539cf540c486531c9a96799eee5f3ce48debaac3489aa59cc94a9', '[\"*\"]', '2025-07-22 02:10:17', NULL, '2025-07-22 02:09:36', '2025-07-22 02:10:17'),
(10, 'App\\Models\\User', 3, 'android_token', '7765e9e4d0fbf367b6190efc467df25c648b8a4888e27925a99afecae865ff16', '[\"*\"]', '2025-07-22 02:12:54', NULL, '2025-07-22 02:12:37', '2025-07-22 02:12:54'),
(11, 'App\\Models\\User', 6, 'android_token', '9795582c6b44d109e60d03991431053c7813a7853e6a33426d74265dca5f7257', '[\"*\"]', '2025-07-22 02:26:57', NULL, '2025-07-22 02:13:47', '2025-07-22 02:26:57'),
(12, 'App\\Models\\User', 6, 'android_token', '3f7c846ba6e203d702f68f8054d0dcee6e835f5d1425bb227f1ff0424b23ec73', '[\"*\"]', '2025-07-22 02:39:43', NULL, '2025-07-22 02:32:47', '2025-07-22 02:39:43'),
(13, 'App\\Models\\User', 3, 'android_token', '0818e7147beffca2eb814ce18b3b80954a1cb788a0c37961a8eb11f66d1d035b', '[\"*\"]', '2025-07-22 06:42:53', NULL, '2025-07-22 06:42:52', '2025-07-22 06:42:53'),
(14, 'App\\Models\\User', 3, 'android_token', 'dc01f85f29c1a635ef752cc829b95be89a377552b98d872439ac313d972ba164', '[\"*\"]', '2025-07-23 01:08:15', NULL, '2025-07-23 01:06:46', '2025-07-23 01:08:15'),
(15, 'App\\Models\\User', 6, 'android_token', 'c01517cc650cf822373010b0abbf92a86b929e7356e4f41a36ff79ce05384703', '[\"*\"]', '2025-07-23 01:08:36', NULL, '2025-07-23 01:07:57', '2025-07-23 01:08:36'),
(16, 'App\\Models\\User', 3, 'android_token', '30001580212dff861fd5c8fca6d3e6cefe32038d750a3723f6a477240d9f2c65', '[\"*\"]', '2025-07-23 01:17:21', NULL, '2025-07-23 01:17:20', '2025-07-23 01:17:21'),
(17, 'App\\Models\\User', 3, 'android_token', 'd4fd24fe1692591b604af8aad66da44acbaab34b3006a16bf6631711591ebcd1', '[\"*\"]', '2025-07-23 01:19:23', NULL, '2025-07-23 01:18:55', '2025-07-23 01:19:23'),
(20, 'App\\Models\\User', 5, 'android_token', 'd644bab04c4823f3d7bb08d5d06f400d0142e93aaecf88993837864f4d95ea1d', '[\"*\"]', '2025-07-23 02:27:06', NULL, '2025-07-23 02:19:25', '2025-07-23 02:27:06'),
(21, 'App\\Models\\User', 1, 'android_token', '280ebb07949118d0fe3bf15c0b116521dda1c2d7bf964e98e4222cfd845cbb86', '[\"*\"]', NULL, NULL, '2025-09-02 18:55:27', '2025-09-02 18:55:27'),
(22, 'App\\Models\\User', 3, 'android_token', '2419a725543b8bdd44efdfc29d1ff51aac994ed3629050ec60dd17796558026f', '[\"*\"]', NULL, NULL, '2025-09-02 18:57:34', '2025-09-02 18:57:34'),
(23, 'App\\Models\\User', 3, 'android_token', 'adfbc953e6be6378bbae815ff2f8c108b6267f2fddba8b54b3fbf580a3ff96a1', '[\"*\"]', '2025-09-02 19:04:23', NULL, '2025-09-02 18:59:58', '2025-09-02 19:04:23'),
(25, 'App\\Models\\User', 3, 'android_token', '98279c9b76b8f836f1233f7474e33578919f32a788a15b4e3943b627a0359256', '[\"*\"]', '2025-10-02 02:10:03', NULL, '2025-10-01 01:42:11', '2025-10-02 02:10:03'),
(26, 'App\\Models\\User', 3, 'android_token', 'dc1327b76913f101ee7b7da95cd449d767b4d79b33e985fd91a267e3d403c316', '[\"*\"]', '2025-10-02 02:51:42', NULL, '2025-10-01 07:10:56', '2025-10-02 02:51:42'),
(27, 'App\\Models\\User', 3, 'android_token', 'c2efbe452b7424834f015d3ab10a50ff9e61fdf06a188aec4fe4191c5eb61b96', '[\"*\"]', '2025-10-02 02:20:56', NULL, '2025-10-02 02:19:51', '2025-10-02 02:20:56'),
(32, 'App\\Models\\User', 3, 'android_token', '6c245e737d0d62b6e70cf6c420744ec8887d0abc1bd511a48d5bdaa3411af2b1', '[\"*\"]', '2025-10-15 07:41:42', NULL, '2025-10-14 02:08:38', '2025-10-15 07:41:42'),
(33, 'App\\Models\\User', 3, 'android_token', 'ab17b1625f74756d57e01593180c0d04a7dcf21a8121bb860824e8dbe0eb12f3', '[\"*\"]', '2025-10-15 02:20:50', NULL, '2025-10-15 00:58:39', '2025-10-15 02:20:50'),
(34, 'App\\Models\\User', 3, 'android_token', '0c07a41fd48e8f19200d6c6fbb8cd1add78a884b7bd60a871a7740b92d7cba97', '[\"*\"]', '2025-11-12 08:07:05', NULL, '2025-10-15 04:07:48', '2025-11-12 08:07:05'),
(35, 'App\\Models\\User', 5, 'android_token', '6b363b5e40a3787082f6ab64c7b7f54c3e896563360f18f80bbfcf1f10a19a1e', '[\"*\"]', '2025-11-25 02:46:56', NULL, '2025-11-25 02:45:50', '2025-11-25 02:46:56');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_general_ci,
  `payload` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('dqlGaYZeozAPGtjhJKK8fHjxMUy0OUS5sdgeVgdk', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiODRlVUhoSEg3ZmxLNFdpdzRkY2N2V2pHVkNTWHMwMW43YTJLZlQzTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZWdhd2FpL3VuZGFuZ2FuLzE2Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mzt9', 1765205010),
('vl6ajEVqIy11BXU2uM9YPU6D0HH0dgaLuz0MwPGu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNU1uVWU3aDEwazVKa3dPa2RIN3hMOGwyMTdBMDdLUEY3SUx5aTZQTyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1765206890),
('y00RJV3uYlTzK2gyReGTdHtkftFukRoCEZpjrvj7', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiS2JqZ21MVkVlcmNRM1VPTVNxeVVMeGxaTjdHUGNUOFhnTWY2TGVWdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjM7fQ==', 1772595990);

-- --------------------------------------------------------

--
-- Table structure for table `tims`
--

CREATE TABLE `tims` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_tim` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tims`
--

INSERT INTO `tims` (`id`, `nama_tim`, `created_at`, `updated_at`) VALUES
(1, 'Tim IT.', '2025-05-05 20:12:14', '2025-05-06 21:12:06'),
(2, 'Tim Neraca', '2025-05-05 21:39:37', '2025-05-05 21:39:45');

-- --------------------------------------------------------

--
-- Table structure for table `undangan_kegiatans`
--

CREATE TABLE `undangan_kegiatans` (
  `id` bigint UNSIGNED NOT NULL,
  `kegiatan_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `nomor_surat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `sifat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `judul` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `deskripsi` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `hari` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tanggal` date NOT NULL,
  `waktu` time NOT NULL,
  `tempat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `agenda` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status_pelaksanaan` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `komentar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_supervisor` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `undangan_kegiatans`
--

INSERT INTO `undangan_kegiatans` (`id`, `kegiatan_id`, `user_id`, `nomor_surat`, `sifat`, `judul`, `deskripsi`, `hari`, `tanggal`, `waktu`, `tempat`, `agenda`, `status`, `status_pelaksanaan`, `komentar`, `created_at`, `updated_at`, `id_supervisor`) VALUES
(1, 1, 2, '200', 'Rahasia', 'Rapat testing', 'sfsdfdsfsdfs', 'fsfdfsfd', '2025-06-02', '05:31:00', 'dfdsafsdfsdf', 'dfsadsdf', 'Diterima', 'Selesai', NULL, NULL, '2025-06-02 07:29:05', 5),
(2, 1, 3, '1231112', 'Terbuka', 'Rapat Rutin Bulanan', 'sdfsd', 'Senin', '2025-05-06', '15:50:00', 'Ruangan 10', 'Rapat internal', 'Ditolak', 'Belum Dilaksanakan', NULL, '2025-05-05 20:49:11', '2025-07-18 23:50:51', 5),
(5, 1, 3, '1111', 'Umum', 'Kegiatan Testing Software', '666', '666', '2025-05-08', '17:35:00', '66', 'Rapata testing website', 'Diterima', 'Selesai', 'ulangi', '2025-05-06 21:29:30', '2025-07-18 23:47:04', 4),
(10, 1, 3, 'asda', 'dasda', 'sda', 'dasda', 'dsdad', '2025-05-29', '01:10:00', 'dasd', 'dsad', 'Diterima', 'Selesai', NULL, '2025-05-26 11:10:12', '2025-06-02 07:29:09', 5),
(15, 1, 3, '1', '1', 'Rapat Test 1', 'dasdas', 'dsasd', '2025-05-27', '02:25:00', 'sda', 'dsad', 'Diterima', 'Selesai', NULL, '2025-05-26 11:25:48', '2025-06-02 07:29:38', 5),
(16, 1, 3, 'sdsa', 'sdasd', 'Rapat Test 2', 'fasfsda', 'fasas', '2025-05-12', '01:28:00', 'fasasd', 'fdass', 'Diterima', 'Selesai', NULL, '2025-05-26 11:28:47', '2025-06-02 07:42:48', 5),
(17, 1, 3, 'asa', 'sasa', 'Rapat Test 3\r\n', 'dasdas', 'sadasd', '2025-05-26', '02:03:00', 'dsadas', 'dasda', 'Diterima', 'Selesai', NULL, '2025-05-26 12:03:31', '2025-06-02 07:28:59', 5),
(19, 1, 3, '111221', 'Rahasia', 'Rapat Pengolahan IT', 'sfasdasfas', 'Jumat', '2025-06-20', '17:20:00', 'Ruangan 104', 'Rapat Rutin', 'Diterima', 'Selesai', NULL, '2025-06-20 03:20:42', '2025-06-20 03:21:02', 5),
(20, 1, 3, '1234123', 'Rahasia', 'Rapat Rutin Tim IT', 'rtesdfasdfsdafsdfsdafsdaf', 'Jumat', '2025-07-18', '15:18:00', 'Raungan Rapat', 'Rapat Rutin', 'Ditolak', 'Selesai', NULL, '2025-07-18 00:18:17', '2025-07-18 00:42:26', 5),
(21, 1, 3, '01283092801', 'Umum', 'Rapat persiapa susenas', 'Di harapkan untuk semua pegawai yang di undang untuk dapat hadir pada rapat ini', 'Senin', '2025-12-01', '22:09:00', 'Ruanga Sungkai', 'Rapat Persiapan susenas', 'Menunggu', 'Belum Dilaksanakan', NULL, '2025-12-08 15:10:15', '2025-12-08 15:10:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `no_hp` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pegawai',
  `remember_token` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `no_hp`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Arif Fathur Rahman_1', 'arif22ti@mahasiswa.pcr.ac.id', NULL, '$2y$12$6uoYiPiyYFlBkBZoP8SfuuBZRyf9q5IIBli/v1Kwrunb4gW3UWTGa', '124323421', 'admin', NULL, '2025-05-05 19:57:36', '2025-05-29 09:30:27'),
(2, 'test4', 'test4@gmail.com', NULL, '$2y$12$ETj0JwICFunX/PJ5cL/HQ.YjqU6MeSKTbOAWRJKENx3a2t.Pr3UcC', '342323423423', 'pegawai', NULL, '2025-05-05 19:58:42', '2025-05-05 19:58:42'),
(3, 'test4', 'test@gmail.com', NULL, '$2y$12$tWXhQH3KJCHB/3i5J7B1mO82pJL1aPcO.94q2DxeaqPzAAxzYu1Ye', '342323423423', 'pegawai', NULL, '2025-05-05 20:14:35', '2025-05-05 20:14:35'),
(4, 'test5', 'test5@gmail.com', NULL, '$2y$12$ozEBclrhLmOBln2Ls8sMsufV8eis8ORX81xiCWgXtRBuUHGkG80wC', '342323423423', 'supervisor', NULL, '2025-05-06 20:59:11', '2025-05-06 20:59:11'),
(5, 'Supervisor Test', 'test6@gmail.com', NULL, '$2y$12$2BSvk5mO3eJX6MiSp3ZlfevExmZFKHJ8pqvyGsuZcPjoMTjgNuhua', '1232321', 'supervisor', NULL, '2025-05-23 00:02:19', '2025-05-23 00:02:19'),
(6, 'Arif Fathur Rahman_1', 'ariffathurrahman43@gmail.com', NULL, '$2y$12$88U51glna/eL1KH3NWUXoOOVZq5hOg00JvAb128.l/9o9wfaW1N5e', '1234243', 'pegawai', NULL, '2025-05-24 21:35:34', '2025-05-24 21:35:34'),
(7, 'Pegawai', 'pegawai@gmail.com', NULL, '$2y$12$25VVdkB7uid3zfy5lbkSTObO0vHZaDVk82SPTA/PTuDQZHCA9Uf8y', '09090900', 'pegawai', NULL, '2025-06-20 00:24:25', '2025-06-20 00:24:25'),
(8, 'api test', 'api@gmail.com', NULL, '$2y$12$H5B8e2g6rd9Nf7b/wZNP7.34EHck/MSofqus4PaXddinnQYXXzCmu', '090987978', 'admin', NULL, '2025-06-23 04:22:02', '2025-06-23 04:22:02'),
(9, 'Pemantau Test User', 'pemantau@gmail.com', NULL, '$2y$12$d34t.noYiwYeIc0kONGl2uDVHbfKIpw.c6rOo03PSwyHYuBzMxgiO', '089080808', 'pemantau', NULL, '2025-07-20 02:26:16', '2025-07-20 02:36:04'),
(10, 'dummyuser', 'vallkry998@gmail.com', NULL, '$2y$12$HoPiNeL6C5IrrEoE3rE.OOi7xpRJH5LdNlak3cBYsEZy7T/FrUwcO', '967845653464', 'pegawai', NULL, '2025-10-11 07:05:55', '2025-10-11 07:05:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota_tims`
--
ALTER TABLE `anggota_tims`
  ADD PRIMARY KEY (`id`),
  ADD KEY `anggota_tims_tim_id_foreign` (`tim_id`),
  ADD KEY `anggota_tims_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `dokumentasi_kegiatans`
--
ALTER TABLE `dokumentasi_kegiatans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kegiatan_id` (`kegiatan_id`),
  ADD KEY `undangan_id` (`undangan_id`),
  ADD KEY `penerima_id` (`penerima_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `foto_dokumentasis`
--
ALTER TABLE `foto_dokumentasis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dokumentasi_id` (`dokumentasi_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kegiatans`
--
ALTER TABLE `kegiatans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kegiatans_tim_id_foreign` (`tim_id`),
  ADD KEY `kegiatans_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `penerima_undangans`
--
ALTER TABLE `penerima_undangans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penerima_undangans_ibfk_1` (`user_id`),
  ADD KEY `penerima_undangans_ibfk_2` (`tim_id`),
  ADD KEY `undangan_id` (`undangan_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tims`
--
ALTER TABLE `tims`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `undangan_kegiatans`
--
ALTER TABLE `undangan_kegiatans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `undangan_kegiatans_kegiataan_id_foreign` (`kegiatan_id`),
  ADD KEY `undangan_kegiatans_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anggota_tims`
--
ALTER TABLE `anggota_tims`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `dokumentasi_kegiatans`
--
ALTER TABLE `dokumentasi_kegiatans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foto_dokumentasis`
--
ALTER TABLE `foto_dokumentasis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kegiatans`
--
ALTER TABLE `kegiatans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT for table `penerima_undangans`
--
ALTER TABLE `penerima_undangans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `tims`
--
ALTER TABLE `tims`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `undangan_kegiatans`
--
ALTER TABLE `undangan_kegiatans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anggota_tims`
--
ALTER TABLE `anggota_tims`
  ADD CONSTRAINT `anggota_tims_tim_id_foreign` FOREIGN KEY (`tim_id`) REFERENCES `tims` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `anggota_tims_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `dokumentasi_kegiatans`
--
ALTER TABLE `dokumentasi_kegiatans`
  ADD CONSTRAINT `dokumentasi_kegiatans_ibfk_2` FOREIGN KEY (`kegiatan_id`) REFERENCES `kegiatans` (`id`),
  ADD CONSTRAINT `dokumentasi_kegiatans_ibfk_3` FOREIGN KEY (`undangan_id`) REFERENCES `undangan_kegiatans` (`id`),
  ADD CONSTRAINT `dokumentasi_kegiatans_ibfk_4` FOREIGN KEY (`penerima_id`) REFERENCES `penerima_undangans` (`id`);

--
-- Constraints for table `foto_dokumentasis`
--
ALTER TABLE `foto_dokumentasis`
  ADD CONSTRAINT `foto_dokumentasis_ibfk_1` FOREIGN KEY (`dokumentasi_id`) REFERENCES `dokumentasi_kegiatans` (`id`);

--
-- Constraints for table `kegiatans`
--
ALTER TABLE `kegiatans`
  ADD CONSTRAINT `kegiatans_tim_id_foreign` FOREIGN KEY (`tim_id`) REFERENCES `tims` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kegiatans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penerima_undangans`
--
ALTER TABLE `penerima_undangans`
  ADD CONSTRAINT `penerima_undangans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penerima_undangans_ibfk_2` FOREIGN KEY (`tim_id`) REFERENCES `tims` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penerima_undangans_ibfk_3` FOREIGN KEY (`undangan_id`) REFERENCES `undangan_kegiatans` (`id`);

--
-- Constraints for table `undangan_kegiatans`
--
ALTER TABLE `undangan_kegiatans`
  ADD CONSTRAINT `undangan_kegiatans_kegiataan_id_foreign` FOREIGN KEY (`kegiatan_id`) REFERENCES `kegiatans` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `undangan_kegiatans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
