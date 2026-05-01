CREATE TABLE IF NOT EXISTS services (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  service_code VARCHAR(64) NOT NULL,
  category ENUM('packages', 'makeup', 'hair', 'henna', 'eyelash') NOT NULL DEFAULT 'makeup',
  name_az VARCHAR(255) NOT NULL DEFAULT '',
  name_ru VARCHAR(255) NOT NULL DEFAULT '',
  duration_az VARCHAR(255) NOT NULL DEFAULT '',
  duration_ru VARCHAR(255) NOT NULL DEFAULT '',
  price_az VARCHAR(255) NOT NULL DEFAULT '',
  price_ru VARCHAR(255) NOT NULL DEFAULT '',
  description_az TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_services_service_code (service_code),
  KEY idx_services_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS home_photos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  photo_code VARCHAR(64) NOT NULL,
  image_url TEXT NOT NULL,
  alt_az VARCHAR(255) NOT NULL DEFAULT '',
  alt_ru VARCHAR(255) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_home_photos_photo_code (photo_code),
  KEY idx_home_photos_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS gallery_photos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  photo_code VARCHAR(64) NOT NULL,
  category ENUM('lashes', 'makeup', 'skincare') NOT NULL DEFAULT 'makeup',
  image_url TEXT NOT NULL,
  alt_az VARCHAR(255) NOT NULL DEFAULT '',
  alt_ru VARCHAR(255) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_gallery_photos_photo_code (photo_code),
  KEY idx_gallery_photos_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reservations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  reservation_code VARCHAR(64) NOT NULL,
  category VARCHAR(128) NOT NULL,
  service VARCHAR(255) NOT NULL,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) DEFAULT NULL,
  phone VARCHAR(80) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  notes TEXT,
  source VARCHAR(50) NOT NULL DEFAULT 'site',
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_reservations_code (reservation_code),
  KEY idx_reservations_created (created_at),
  KEY idx_reservations_date_time (reservation_date, reservation_time),
  KEY idx_reservations_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
