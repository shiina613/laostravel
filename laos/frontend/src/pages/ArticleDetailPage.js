import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewSection from '../components/ReviewSection';
import { publicService, imgUrl } from '../services/api';

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    publicService.getArticleBySlug(slug)
      .then(r => setArticle(r.data?.data || r.data))
      .catch(err => { if (err.response?.status === 404) setNotFound(true); })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );

  if (notFound || !article) return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy bài viết</h2>
        <Link to="/" className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition">Về trang chủ</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-purple-600 transition">Trang chủ</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-800 font-medium truncate">{article.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-block bg-purple-50 text-purple-600 text-xs font-medium px-3 py-1 rounded-full mb-3">Cẩm nang du lịch</span>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {article.authorName && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                {article.authorName}
              </span>
            )}
            {article.createdAt && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {fmtDate(article.createdAt)}
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="rounded-2xl overflow-hidden mb-8 aspect-video bg-gray-100">
            <img src={imgUrl(article.thumbnail)} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Summary */}
        {article.summary && (
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-6 text-gray-700 italic">
            {article.summary}
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-2">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>

        {/* Reviews */}
        <ReviewSection targetType="ARTICLE" targetId={article.id} />
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
