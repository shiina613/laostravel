import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/api';

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Quản lý danh mục</h1>
            <button
              onClick={() => navigate('/admin/categories/create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              + Thêm danh mục
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* Loading */}
          {loading && !editLoading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Đang tải...</p>
            </div>
          )}

          {/* Table */}
          {!loading && categories.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">ID</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Tên danh mục</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Mô tả</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-800">{category.id}</td>
                      <td className="px-6 py-3">
                        {editingId === category.id ? (
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        ) : (
                          <span className="text-gray-800">{category.name}</span>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        {editingId === category.id ? (
                          <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            rows="2"
                          />
                        ) : (
                          <span className="text-gray-600 line-clamp-2">{category.description}</span>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        {editingId === category.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(category.id)}
                              disabled={editLoading}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition disabled:opacity-50"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(category)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                            >
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDeleteClick(category.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                            >
                              Xóa
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty state */}
          {!loading && categories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Chưa có danh mục nào</p>
              <button
                onClick={() => navigate('/admin/categories/create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Tạo danh mục đầu tiên
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Xác nhận xóa</h2>
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa danh mục này?</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleConfirmDelete(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Xóa
              </button>
              <button
                onClick={handleCancelDelete}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
