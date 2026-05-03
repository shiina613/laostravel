import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { reviewService } from '../services/api';

// ---- Star display ----
const Stars = ({ value, interactive = false, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange && onChange(s)}
          onMouseEnter={() => interactive && setHovered(s)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`text-2xl leading-none transition-colors ${interactive ? 'cursor-pointer' : 'cursor-default'} ${
            s <= (hovered || value || 0) ? 'text-yellow-400' : 'text-gray-200'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// ---- Format date ----
const fmtDate = (dt) => {
  if (!dt) return '';
  return new Date(dt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// ---- Single review card ----
const ReviewCard = ({ review, onDelete }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
          {review.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{review.username}</p>
          <p className="text-xs text-gray-400">{fmtDate(review.createdAt)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {review.rating && (
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
              <span key={s} className={`text-base ${s <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
            ))}
          </div>
        )}
        {review.owner && (
          <button
            onClick={() => onDelete(review.id)}
            className="ml-2 text-gray-300 hover:text-red-500 transition-colors"
            title="Xóa đánh giá"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
    {review.comment && (
      <p className="mt-3 text-gray-600 text-sm leading-relaxed">{review.comment}</p>
    )}
  </div>
);

// ---- Main component ----
const ReviewSection = ({ targetType, targetId }) => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = () => {
    setLoading(true);
    reviewService.getReviews(targetType, targetId)
      .then(r => {
        setSummary(r.data);
        // Nếu đã có review, điền sẵn vào form
        if (r.data.myReview) {
          setRating(r.data.myReview.rating || 0);
          setComment(r.data.myReview.comment || '');
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [targetType, targetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!rating && !comment.trim()) {
      setError('Vui lòng chọn số sao hoặc nhập bình luận');
      return;
    }
    setSubmitting(true);
    try {
      await reviewService.submitReview(targetType, targetId, {
        rating: rating || null,
        comment: comment.trim() || null,
      });
      setSuccess(summary?.myReview ? 'Đã cập nhật đánh giá!' : 'Đã gửi đánh giá!');
      load();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'string') setError(data);
      else if (data?.message) setError(data.message);
      else setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa đánh giá này?')) return;
    try {
      await reviewService.deleteReview(id);
      setRating(0); setComment('');
      load();
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === 'string') setError(data);
      else if (data?.message) setError(data.message);
      else setError('Không thể xóa');
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Đánh giá & Bình luận</h2>
        {!loading && summary && (
          <div className="flex items-center gap-2">
            {summary.avgRating && (
              <>
                <span className="text-yellow-400 text-xl">★</span>
                <span className="font-bold text-gray-800">{summary.avgRating}</span>
              </>
            )}
            <span className="text-gray-400 text-sm">({summary.totalReviews} đánh giá)</span>
          </div>
        )}
      </div>

      {/* Form gửi đánh giá */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            {summary?.myReview ? 'Cập nhật đánh giá của bạn' : 'Viết đánh giá của bạn'}
          </p>

          {/* Stars */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1.5">Số sao (không bắt buộc)</p>
            <div className="flex items-center gap-3">
              <Stars value={rating} interactive onChange={setRating} />
              {rating > 0 && (
                <button type="button" onClick={() => setRating(0)} className="text-xs text-gray-400 hover:text-gray-600">
                  Bỏ chọn
                </button>
              )}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1.5">Bình luận (không bắt buộc)</p>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Chia sẻ trải nghiệm của bạn..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white"
            />
          </div>

          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
          {success && <p className="text-emerald-600 text-xs mb-2">{success}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition disabled:opacity-50"
            >
              {submitting ? 'Đang gửi...' : summary?.myReview ? 'Cập nhật' : 'Gửi đánh giá'}
            </button>
            {summary?.myReview && (
              <button
                type="button"
                onClick={() => handleDelete(summary.myReview.id)}
                className="border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium px-4 py-2 rounded-lg transition"
              >
                Xóa
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="mb-8 bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
          <p className="text-gray-600 text-sm mb-2">Đăng nhập để viết đánh giá</p>
          <Link to="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition">
            Đăng nhập
          </Link>
        </div>
      )}

      {/* Danh sách reviews */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : summary?.reviews?.length > 0 ? (
        <div className="space-y-3">
          {summary.reviews.map(r => (
            <ReviewCard key={r.id} review={r} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-sm">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
