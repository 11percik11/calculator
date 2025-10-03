import './NewsGrid.css';
import NewsItem, { NewsItemProps } from '@/Components/UI/NewsItem/NewsItem';
import { getMainNews } from '@/Api/queries';
import { useState, useEffect } from 'react';
import { API_URL } from '@/Api/const';
import { ModalNewsPromo } from '../ModalNewsPromo/ModalNewsPromo';


const NewsGrid = () => {
  const [newsItems, setNewsItems] = useState<NewsItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const [selectedPromo, setSelectedPromo] = useState<null>(null);
    
      const handleCloseModal = () => {
    setSelectedPromo(null);
  };

    const handlePromoClick = (promo: any) => {
    setSelectedPromo(promo);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const newsData = await getMainNews();
        if (newsData.length === 0) {
          setError('Новостей нет.');
          setNewsItems([]);
        } else {
          const mappedNews = newsData.map(item => ({
            imageUrl: `${API_URL}${item.image}`, // Формируем полный URL
            title: item.title,
            description: item.description || '...',
          }));
          setNewsItems(mappedNews);
        }
      } catch (err) {
        console.error('Ошибка при загрузке новостей:', err);
        setError('Не удалось загрузить новости.');
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-grid-container">
      {loading && (
        <div className="news-grid-loading">
          <div className="spinner"></div>
          <span>Загрузка новостей...</span>
        </div>
      )}
      {!loading && !error && newsItems.length > 0 && (
        <div className="news-grid">
          {newsItems.map((newsItem, index) => (
            <NewsItem
              onClick={() => handlePromoClick(newsItem)}
              key={`news-${index}`}
              imageUrl={newsItem.imageUrl}
              title={newsItem.title}
              description={newsItem.description}
            />
          ))}
        </div>
      )}

      {selectedPromo && (
              <ModalNewsPromo
                isOpen={!!selectedPromo}
                onClose={handleCloseModal}
                imageUrl={selectedPromo.imageUrl}
                title={selectedPromo.title}
                description={selectedPromo.description}
              />
            )}
    </div>
  );
};

export default NewsGrid;