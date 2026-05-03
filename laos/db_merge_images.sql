-- ============================================================
-- MERGE destination_images + article_images -> images
-- target_type: DESTINATION | FESTIVAL | ARTICLE
-- ============================================================
USE laostravel;

-- 1. Tạo bảng images mới
CREATE TABLE images (
  id          BIGINT        NOT NULL AUTO_INCREMENT,
  target_type VARCHAR(20)   NOT NULL,
  target_id   BIGINT        NOT NULL,
  image_url   VARCHAR(255)  NOT NULL,
  caption     VARCHAR(255)  DEFAULT NULL,
  sort_order  INT           DEFAULT 0,
  PRIMARY KEY (id),
  CONSTRAINT chk_images_target_type CHECK (target_type IN ('DESTINATION', 'FESTIVAL', 'ARTICLE')),
  INDEX idx_images_target (target_type, target_id),
  INDEX idx_images_sort   (target_type, target_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 2. Migrate data từ destination_images
INSERT INTO images (target_type, target_id, image_url, caption, sort_order)
SELECT 'DESTINATION', destination_id, image_url, caption, sort_order
FROM destination_images;

-- 3. Migrate data từ article_images
INSERT INTO images (target_type, target_id, image_url, caption, sort_order)
SELECT 'ARTICLE', article_id, image_url, caption, sort_order
FROM article_images;

-- 4. Drop bảng cũ
DROP TABLE destination_images;
DROP TABLE article_images;
