import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/api';

const AdminDestinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch destinations
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllDestinations();
      setDestinations(response.data);
      setError('');
    } catch (err) {
      setError('Lỗi khi tải danh sách địa điểm');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  const handleConfirmDelete = async (id) => {
    try {
      setLoading(true);
      await adminService.deleteDestination(id);
      setSuccess('Xóa địa điểm thành công!');
      setDeleteConfirm(null);
      fetchDestinations();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi xóa địa điểm');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  // Filter destinations by search term
  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Quản lý địa điểm</h1>
            <button
              onClick={() => navigate('/admin/destinations/create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              + Thêm địa điểm
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

          {/* Search Box */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên địa điểm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Đang tải...</p>
            </div>
          )}

          {/* Table */}
          {!loading && filteredDestinations.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">ID</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Thumbnail</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Tên</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Tỉnh/Thành</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Danh mục</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Trạng thái</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDestinations.map((destination) => (
                    <tr key={destination.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{destination.id}</td>
                      <td className="px-4 py-3">
                        {destination.thumbnail ? (
                          <img
                            src={destination.thumbnail}
                            alt={destination.name}
                            className="h-12 w-12 object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-400">Không có ảnh</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-800">{destination.name}</td>
                      <td className="px-4 py-3 text-gray-600">{destination.province}</td>
                      <td className="px-4 py-3 text-gray-600">{destination.categoryName}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          destination.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {destination.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/admin/destinations/edit/${destination.id}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteClick(destination.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredDestinations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Không tìm thấy địa điểm nào' : 'Chưa có địa điểm nào'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => navigate('/admin/destinations/create')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Tạo địa điểm đầu tiên
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Xác nhận xóa</h2>
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa địa điểm này? Hành động này không thể hoàn tác.</p>
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

export default AdminDestinations;
