import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService, categoryService } from '../services/api';
import AdminLayout from '../components/AdminLayout';
import DestinationForm from '../components/DestinationForm';

const AdminCreateDestination = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ name: '', slug: '', shortDescription: '', description: '', province: '', region: '', categoryId: '', status: 'ACTIVE' });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    categoryService.getAll().then(r => setCategories(r.data)).catch(console.error);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    const reader = new FileReader();
    reader.onloadend = () => setThumbnailPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) setImagePreviews([...previews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (!formData.name.trim()) throw new Error('Tên địa điểm không được để trống');
      if (!formData.slug.trim()) throw new Error('Slug không được để trống');
      if (!formData.shortDescription.trim()) throw new Error('Mô tả ngắn không được để trống');
      if (!formData.description.trim()) throw new Error('Mô tả chi tiết không được để trống');
      if (!formData.province.trim()) throw new Error('Tỉnh/thành không được để trống');
      if (!formData.categoryId) throw new Error('Danh mục không được để trống');
      if (!thumbnail) throw new Error('Ảnh thumbnail là bắt buộc');

      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append('thumbnail', thumbnail);
      images.forEach(img => fd.append('images', img));

      await adminService.createDestination(fd);
      setSuccess('Thêm địa điểm thành công!');
      setTimeout(() => navigate('/admin/destinations'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Lỗi khi thêm địa điểm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Thêm địa điểm du lịch">
      <div className="max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg mb-5 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {success}
            </div>
          )}
          <DestinationForm
            formData={formData} onInputChange={handleInputChange}
            thumbnail={thumbnail} thumbnailPreview={thumbnailPreview} onThumbnailChange={handleThumbnailChange}
            images={images} imagePreviews={imagePreviews} onImagesChange={handleImagesChange} onRemoveImage={removeImage}
            categories={categories} loading={loading}
            onSubmit={handleSubmit} onCancel={() => navigate('/admin/destinations')}
            submitLabel="Lưu địa điểm"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateDestination;
