-- Migration: Thêm cột region vào bảng destinations
-- Region values: MIEN_BAC, MIEN_TRUNG, MIEN_NAM

ALTER TABLE destinations ADD COLUMN region VARCHAR(20) DEFAULT NULL AFTER province;
