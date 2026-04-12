import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService, imgUrl } from '../services/api';
import AdminLayout from '../components/AdminLayout';

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
    <AdminLayout title="Quản lý địa điểm">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm địa điểm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => navigate('/admin/destinations/create')}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm địa điểm
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
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Table */}
        {!loading && filteredDestinations.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Địa điểm</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tỉnh/Thành</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Danh mục</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDestinations.map((destination) => (
                  <tr key={destination.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {destination.thumbnail ? (
                          <img src={imgUrl(destination.thumbnail)} alt={destination.name} className="h-10 w-10 object-cover rounded-lg flex-shrink-0" />
                        ) : (
                          <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                        <span className="font-medium text-gray-800">{destination.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{destination.province}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">{destination.categoryName}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        destination.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${destination.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        {destination.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/destinations/edit/${destination.id}`)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(destination.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <p className="text-gray-500 mb-4">{searchTerm ? 'Không tìm thấy địa điểm nào' : 'Chưa có địa điểm nào'}</p>
            {!searchTerm && (
              <button onClick={() => navigate('/admin/destinations/create')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Tạo địa điểm đầu tiên
              </button>
            )}
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
            <p className="text-gray-500 text-sm text-center mb-6">Bạn có chắc chắn muốn xóa địa điểm này? Hành động này không thể hoàn tác.</p>
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

export default AdminDestinations;
