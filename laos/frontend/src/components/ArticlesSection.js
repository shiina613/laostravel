import React from 'react';

const ArticlesSection = () => {
  const articles = [
    {
      id: 1,
      title: 'Kinh nghiệm du lịch Lào tự túc',
      description: 'Hướng dẫn chi tiết về cách du lịch Lào một mình với ngân sách hạn chế, từ vé máy bay đến chỗ ở',
      date: '15/03/2026',
      image: '/images/articles/1d16438e191b3a6adf5d02e19c8dfd4bd499172fb0c9c1e928c1681793ba2f7b.avif'
    },
    {
      id: 2,
      title: 'Những điểm đến nên ghé thăm khi đến Lào',
      description: 'Danh sách những địa điểm không nên bỏ lỡ khi du lịch Lào, từ Luang Prabang đến 4000 Đảo',
      date: '14/03/2026',
      image: '/images/articles/6eea8356d83efcd9594e330176cbac94e5c5230387645a59b350149fc9fddfc1.avif'
    },
    {
      id: 3,
      title: 'Các lưu ý quan trọng cho du khách Việt',
      description: 'Những điều cần biết trước khi đi du lịch Lào, bao gồm thời tiết, tiền tệ, văn hóa và an toàn',
      date: '13/03/2026',
      image: '/images/articles/970eed78f2a5576d052d5d6efe341a8451a7ea6a6da30c0c1887563141b45459.avif'
    }
  ];

  return (
    <section id="articles" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Cẩm nang du lịch
          </h2>
          <p className="text-gray-600 text-lg">
            Những bài viết hữu ích giúp bạn chuẩn bị cho chuyến du lịch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              {/* Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-500 mb-3">📅 {article.date}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition">
                  Đọc tiếp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
