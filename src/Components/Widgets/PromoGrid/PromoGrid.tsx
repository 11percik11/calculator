import './PromoGrid.css';
import { PromoItemProps } from '@/Components/UI/PromoItem/PromoItem';
import { getMainPromos } from '@/Api/queries';
import { useState, useEffect } from 'react';
import { API_URL } from '@/Api/const';
import { ModalNewsPromo } from '@/Components/Widgets/ModalNewsPromo/ModalNewsPromo';
import NewsItem from '@/Components/UI/NewsItem/NewsItem';

interface PromoItemWithDescription extends PromoItemProps {
  description: string;
}

const PromoGrid = () => {
  const [promoItems, setPromoItems] = useState<PromoItemWithDescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<PromoItemWithDescription | null>(null);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        setLoading(true);
        const promoData = await getMainPromos();
        if (promoData.length === 0) {
          setError('Промо-акций нет.');
          setPromoItems([]);
        } else {
          const mappedPromos = promoData.map(item => ({
            imageUrl: `${API_URL}${item.image}`,
            title: item.title,
            description: item.description || "Описание акции отсутствует.",
          }));
          setPromoItems(mappedPromos);
        }
      } catch (err) {
        console.error('Ошибка при загрузке промо-акций:', err);
        setError('Не удалось загрузить промо-акции.');
        setPromoItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  const handlePromoClick = (promo: PromoItemWithDescription) => {
    setSelectedPromo(promo);
  };

  const handleCloseModal = () => {
    setSelectedPromo(null);
  };

  return (
    <div className="promo-grid-container">
      {loading && (
        <div className="promo-grid-loading">
          <div className="spinner"></div>
          <span>Загрузка промо-акций...</span>
        </div>
      )}
      {!loading && !error && promoItems.length > 0 && (
        <div className="promo-grid">
          {promoItems.map((promo, index) => (
            // <div key={`promo-${index}`} onClick={() => handlePromoClick(promo)}>
              // <PromoItem
              //   imageUrl={promo.imageUrl}
              //   title={promo.title}
              // />
              <NewsItem
                            onClick={() => handlePromoClick(promo)}
                            key={`news-${index}`}
                            imageUrl={promo.imageUrl}
                            title={promo.title}
                            description={promo.description}
                          />
            // </div>
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

export default PromoGrid;