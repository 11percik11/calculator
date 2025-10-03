import './News.css';
import { CatalogPromoBlock } from '@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock';
import StarAnimation from '@/Components/UI/StartAnimation/StartAnimation';
import { NewsBigCard } from '@/Components/UI/NewsBigCard/NewsBigCard';
import { getAllNews } from '@/Api/queries';
import { useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  title: string;
  description?: string;
  image: string;
  isPreview: boolean;
}

export const News = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(8);

  const fetchNews = async (page: number) => {
    try {
      setLoading(true);
      const response = await getAllNews(page, itemsPerPage);
      
      setNewsData(response.data);
      setTotalPages(response.meta.pagination.totalPages);
      setError(null);
    } catch (err) {
      console.error('Ошибка при загрузке новостей:', err);
      setError('Не удалось загрузить новости.');
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Кнопка "Назад"
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-prev"
      >
        ←
      </button>
    );

    // Первая страница
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="pagination-button"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Основные страницы
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Последняя страница
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-button"
        >
          {totalPages}
        </button>
      );
    }

    // Кнопка "Вперед"
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-next"
      >
        →
      </button>
    );

    return <div className="news-pagination">{pages}</div>;
  };

  if (loading && newsData.length === 0) {
    return (
      <>

        <div className="news__container">
          <StarAnimation/>
          <h2 className="news__header">СТАТЬИ И НОВОСТИ</h2>
          <p className='news__text'>Всё о жалюзи и рулонных шторах: тренды, технологии, советы и примеры решений для бизнеса и дома</p>
          <div className="news-loading">
            <div className="spinner"></div>
            <span>Загрузка новостей...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="news__container">
        <StarAnimation/>
        <h2 className="news__header">СТАТЬИ И НОВОСТИ</h2>
        <p className='news__text'>Всё о жалюзи и рулонных шторах: тренды, технологии, советы и примеры решений для бизнеса и дома</p>
        
        {error && (
          <div className="news-error">
          </div>
        )}

        {!error && newsData.length > 0 && (
          <>
            <div className="news__grid">
              {newsData.map((news) => (
                <NewsBigCard
                  key={news.id}
                  title={news.title}
                  imageUrl={news.image}
                  description={news.description || '...'}
                />
              ))}
            </div>
            
            {renderPagination()}
          </>
        )}

        {!error && newsData.length === 0 && (
          <div className="news-empty">
            <p>Новостей пока нет</p>
          </div>
        )}
      </div>
      <div className="catalog-promo-block__wrapper">
      <CatalogPromoBlock/>

      </div>
    </>
  );
};

export default News;