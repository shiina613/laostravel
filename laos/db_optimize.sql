-- ============================================================
-- DATABASE OPTIMIZATION & CONSTRAINTS
-- ============================================================
USE laostravel;

-- 1. REVIEWS: thêm UNIQUE constraint (1 user chỉ review 1 lần/target)
ALTER TABLE reviews
  ADD CONSTRAINT uq_review_user_target UNIQUE (user_id, target_type, target_id);

-- 2. REVIEWS: thêm composite index cho query lấy reviews theo target
CREATE INDEX idx_reviews_target ON reviews (target_type, target_id);

-- 3. REVIEWS: CHECK constraint cho target_type
ALTER TABLE reviews
  ADD CONSTRAINT chk_review_target_type CHECK (target_type IN ('DESTINATION', 'FESTIVAL'));

-- 4. REVIEWS: CHECK constraint cho rating
ALTER TABLE reviews
  ADD CONSTRAINT chk_review_rating CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5));

-- 5. REVIEWS: FK ON DELETE CASCADE — xóa user thì xóa luôn reviews của họ
ALTER TABLE reviews DROP FOREIGN KEY FKcgy7qjc1r99dp117y9en6lxye;
ALTER TABLE reviews
  ADD CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- 6. DESTINATION_IMAGES: FK ON DELETE CASCADE — xóa destination thì xóa ảnh
ALTER TABLE destination_images DROP FOREIGN KEY FKcc0wuw8papfbghqwbnc6hyax3;
ALTER TABLE destination_images
  ADD CONSTRAINT fk_dest_images_destination FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE;

-- 7. ARTICLE_IMAGES: FK ON DELETE CASCADE
ALTER TABLE article_images DROP FOREIGN KEY FKpcdiyyvqcn7o8xugv0ud9ab5x;
ALTER TABLE article_images
  ADD CONSTRAINT fk_article_images_article FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE;

-- 8. DESTINATIONS: index trên status (thường query WHERE status = 'ACTIVE')
CREATE INDEX idx_destinations_status ON destinations (status);

-- 9. FESTIVALS: index trên status
CREATE INDEX idx_festivals_status ON festivals (status);

-- 10. ARTICLES: index trên status
CREATE INDEX idx_articles_status ON articles (status);

-- 11. DESTINATIONS: index trên province (filter theo tỉnh)
CREATE INDEX idx_destinations_province ON destinations (province);

-- 12. DESTINATIONS: index trên created_at (ORDER BY created_at DESC)
CREATE INDEX idx_destinations_created_at ON destinations (created_at DESC);

-- 13. FESTIVALS: index trên start_date (ORDER BY start_date)
CREATE INDEX idx_festivals_start_date ON festivals (start_date);

-- 14. ARTICLES: index trên created_at
CREATE INDEX idx_articles_created_at ON articles (created_at DESC);

-- 15. REVIEWS: index trên created_at (ORDER BY created_at DESC)
CREATE INDEX idx_reviews_created_at ON reviews (created_at DESC);
