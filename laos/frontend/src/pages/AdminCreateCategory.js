import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/api';
import AdminLayout from '../components/AdminLayout';

const AdminCreateCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (!formData.name.trim()) throw new Error('Tên danh mục không được để trống');
      await adminService.createCategory(formData);
      setSuccess('Thêm danh mục thành công!');
      setFormData({ name: '', description: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Lỗi khi thêm danh mục');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Thêm danh mục">
      <div className="max-w-xl">
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tên danh mục <span className="text-red-500">*</span></label>
              <input
                type="text" name="name" value={formData.name} onChange={handleInputChange}
                placeholder="Ví dụ: Văn hóa, Thiên nhiên, Tâm linh..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả</label>
              <textarea
                name="description" value={formData.description} onChange={handleInputChange}
                placeholder="Mô tả ngắn về danh mục này..."
                rows="4"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit" disabled={loading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                {loading ? 'Đang lưu...' : 'Lưu danh mục'}
              </button>
              <button
                type="button" onClick={() => navigate('/admin/categories')}
                className="flex-1 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateCategory;
