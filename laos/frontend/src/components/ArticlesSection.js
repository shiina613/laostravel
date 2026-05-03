import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicService, imgUrl } from '../services/api';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getArticles({ page: 0, size: 3 })
      .then(r => setArticles(r.data?.data?.content || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  return (
    <section id="articles" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Cẩm nang du lịch</h2>
          <p className="text-gray-600 text-lg">Những bài viết hữu ích giúp bạn chuẩn bị cho chuyến du lịch</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              <div className="h-48 bg-gray-200 overflow-hidden">
                {article.thumbnail ? (
                  <img src={imgUrl(article.thumbnail)} alt={article.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                {article.createdAt && (
                  <p className="text-sm text-gray-500 mb-3">📅 {formatDate(article.createdAt)}</p>
                )}
                <p className="text-gray-600 mb-4 line-clamp-2">{article.summary}</p>
                <Link
                  to={`/articles/${article.slug}`}
                  className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
                >
                  Đọc tiếp
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
