import React from 'react';
import { imgUrl } from '../services/api';

const inputCls = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent";
const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";

const DestinationForm = ({
  formData, onInputChange,
  thumbnail, thumbnailPreview, onThumbnailChange,
  images, imagePreviews, onImagesChange, onRemoveImage,
  existingImages, onRemoveExistingImage,
  categories, loading, onSubmit, onCancel, submitLabel
}) => (
  <form onSubmit={onSubmit} className="space-y-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className={labelCls}>Tên địa điểm <span className="text-red-500">*</span></label>
        <input type="text" name="name" value={formData.name} onChange={onInputChange} className={inputCls} required />
      </div>
      <div>
        <label className={labelCls}>Slug <span className="text-red-500">*</span></label>
        <input type="text" name="slug" value={formData.slug} onChange={onInputChange} className={inputCls} required />
      </div>
    </div>

    <div>
      <label className={labelCls}>Mô tả ngắn <span className="text-red-500">*</span></label>
      <input type="text" name="shortDescription" value={formData.shortDescription} onChange={onInputChange} className={inputCls} required />
    </div>

    <div>
      <label className={labelCls}>Mô tả chi tiết <span className="text-red-500">*</span></label>
      <textarea name="description" value={formData.description} onChange={onInputChange} rows="5" className={`${inputCls} resize-none`} required />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <div>
        <label className={labelCls}>Tỉnh/Thành <span className="text-red-500">*</span></label>
        <input type="text" name="province" value={formData.province} onChange={onInputChange} className={inputCls} required />
      </div>
      <div>
        <label className={labelCls}>Miền <span className="text-red-500">*</span></label>
        <select name="region" value={formData.region} onChange={onInputChange} className={inputCls} required>
          <option value="">-- Chọn miền --</option>
          <option value="MIEN_BAC">Miền Bắc</option>
          <option value="MIEN_TRUNG">Miền Trung</option>
          <option value="MIEN_NAM">Miền Nam</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Danh mục <span className="text-red-500">*</span></label>
        <select name="categoryId" value={formData.categoryId} onChange={onInputChange} className={inputCls} required>
          <option value="">-- Chọn danh mục --</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Trạng thái</label>
        <select name="status" value={formData.status} onChange={onInputChange} className={inputCls}>
          <option value="ACTIVE">Hoạt động</option>
          <option value="INACTIVE">Không hoạt động</option>
        </select>
      </div>
    </div>

    {/* Thumbnail */}
    <div>
      <label className={labelCls}>Ảnh thumbnail {!thumbnailPreview && <span className="text-red-500">*</span>}</label>
      <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-emerald-400 transition-colors">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        <span className="text-sm text-gray-500">{thumbnail ? thumbnail.name : 'Chọn ảnh thumbnail...'}</span>
        <input type="file" accept="image/*" onChange={onThumbnailChange} className="hidden" />
      </label>
      {thumbnailPreview && (
        <div className="mt-3">
          <img src={imgUrl(thumbnailPreview)} alt="Thumbnail preview" className="h-40 w-full object-cover rounded-lg" />
        </div>
      )}
    </div>

    {/* Existing images (only shown when editing) */}
    {existingImages && existingImages.length > 0 && (
      <div>
        <label className={labelCls}>Ảnh phụ hiện tại ({existingImages.length} ảnh)</label>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {existingImages.map((img) => (
            <div key={img.id} className="relative group">
              <img src={imgUrl(img.imageUrl)} alt={img.caption || `Ảnh ${img.id}`} className="h-24 w-full object-cover rounded-lg border border-gray-200" />
              {onRemoveExistingImage && (
                <button
                  type="button" onClick={() => onRemoveExistingImage(img.id)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  title="Xóa ảnh này"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Extra images (new upload) */}
    <div>
      <label className={labelCls}>Thêm ảnh phụ mới</label>
      <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-emerald-400 transition-colors">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        <span className="text-sm text-gray-500">Chọn nhiều ảnh...</span>
        <input type="file" accept="image/*" multiple onChange={onImagesChange} className="hidden" />
      </label>
      {imagePreviews.length > 0 && (
        <div className="mt-3 grid grid-cols-3 md:grid-cols-4 gap-3">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <img src={preview} alt={`Preview ${index}`} className="h-24 w-full object-cover rounded-lg" />
              <button
                type="button" onClick={() => onRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >×</button>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="flex gap-3 pt-2">
      <button type="submit" disabled={loading} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
        {loading ? 'Đang lưu...' : submitLabel}
      </button>
      <button type="button" onClick={onCancel} className="flex-1 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
        Quay lại
      </button>
    </div>
  </form>
);

export default DestinationForm;
