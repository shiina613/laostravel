import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../services/api';

const AdminEditDestination = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    province: '',
    categoryId: '',
    status: 'ACTIVE'
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Fetch destination and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesResponse = await adminService.getCategories();
        setCategories(categoriesResponse.data);

        // Fetch destination
        const destResponse = await adminService.getDestinationById(id);
        const destination = destResponse.data;
        
        setFormData({
          name: destination.name,
          slug: destination.slug,
          shortDescription: destination.shortDescription,
          description: destination.description,
          province: destination.province,
          categoryId: destination.categoryId,
          status: destination.status
        });

        // Set thumbnail preview
        if (destination.thumbnail) {
          setThumbnailPreview(destination.thumbnail);
        }

        setError('');
      } catch (err) {
        setError('Lỗi khi tải dữ liệu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Preview
    const previews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
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
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate
      if (!formData.name.trim()) {
        throw new Error('Tên địa điểm không được để trống');
      }
      if (!formData.slug.trim()) {
        throw new Error('Slug không được để trống');
      }
      if (!formData.shortDescription.trim()) {
        throw new Error('Mô tả ngắn không được để trống');
      }
      if (!formData.description.trim()) {
        throw new Error('Mô tả chi tiết không được để trống');
      }
      if (!formData.province.trim()) {
        throw new Error('Tỉnh/thành không được để trống');
      }
      if (!formData.categoryId) {
        throw new Error('Danh mục không được để trống');
      }

      // Create FormData
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('shortDescription', formData.shortDescription);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('province', formData.province);
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('status', formData.status);

      // Add thumbnail if changed
      if (thumbnail) {
        formDataToSend.append('thumbnail', thumbnail);
      }

      // Add images
      images.forEach((image, index) => {
        formDataToSend.append('images', image);
      });

      // Send request
      await adminService.updateDestination(id, formDataToSend);
      setSuccess('Cập nhật địa điểm thành công!');
      setTimeout(() => {
        navigate('/admin/destinations');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Lỗi khi cập nhật địa điểm');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Chỉnh sửa địa điểm du lịch</h1>

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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tên địa điểm */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Tên địa điểm *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Mô tả ngắn */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Mô tả ngắn *</label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Mô tả chi tiết */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Mô tả chi tiết *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            {/* Tỉnh/thành */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Tỉnh/thành *</label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Danh mục */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Danh mục *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Trạng thái */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ACTIVE">Hoạt động</option>
                <option value="INACTIVE">Không hoạt động</option>
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Ảnh thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {thumbnailPreview && (
                <div className="mt-4">
                  <img src={thumbnailPreview} alt="Thumbnail preview" className="h-48 object-cover rounded-lg" />
                </div>
              )}
            </div>

            {/* Ảnh phụ */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Thêm ảnh phụ</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img src={preview} alt={`Preview ${index}`} className="h-32 w-full object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/destinations')}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditDestination;
