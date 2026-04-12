import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/api';
import AdminLayout from '../components/AdminLayout';

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [editLoading, setEditLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllCategories();
      setCategories(response.data);
      setError('');
    } catch (err) {
      setError('Lỗi khi tải danh mục');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setEditForm({ name: category.name, description: category.description });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', description: '' });
  };

  const handleSaveEdit = async (id) => {
    try {
      if (!editForm.name.trim()) {
        setError('Tên danh mục không được để trống');
        return;
      }

      setEditLoading(true);
      await adminService.updateCategory(id, editForm);
      setSuccess('Cập nhật danh mục thành công!');
      setEditingId(null);
      fetchCategories();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật danh mục');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  const handleConfirmDelete = async (id) => {
    try {
      setLoading(true);
      await adminService.deleteCategory(id);
      setSuccess('Xóa danh mục thành công!');
      setDeleteConfirm(null);
      fetchCategories();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi xóa danh mục');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <AdminLayout title="Quản lý danh mục">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{categories.length} danh mục</p>
          <button
            onClick={() => navigate('/admin/categories/create')}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Thêm danh mục
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg mb-4 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            {success}
          </div>
        )}

        {/* Loading */}
        {loading && !editLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Table */}
        {!loading && categories.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mô tả</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{category.id}</td>
                    <td className="px-4 py-3">
                      {editingId === category.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-1.5 border border-emerald-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <span className="font-medium text-gray-800">{category.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === category.id ? (
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="w-full px-3 py-1.5 border border-emerald-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          rows="2"
                        />
                      ) : (
                        <span className="text-gray-500 line-clamp-2">{category.description || '—'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === category.id ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(category.id)}
                              disabled={editLoading}
                              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              Lưu
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                            >
                              Hủy
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(category)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Chỉnh sửa"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(category.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Xóa"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state */}
        {!loading && categories.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p className="text-gray-500 mb-4">Chưa có danh mục nào</p>
            <button onClick={() => navigate('/admin/categories/create')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Tạo danh mục đầu tiên
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">Xác nhận xóa</h2>
            <p className="text-gray-500 text-sm text-center mb-6">Bạn có chắc chắn muốn xóa danh mục này?</p>
            <div className="flex gap-3">
              <button onClick={handleCancelDelete} className="flex-1 border border-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">Hủy</button>
              <button onClick={() => handleConfirmDelete(deleteConfirm)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCategories;
