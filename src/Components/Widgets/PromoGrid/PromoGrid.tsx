import './PromoGrid.css';
import PromoItem, { PromoItemProps } from '@/Components/UI/PromoItem/PromoItem';

interface PromoGridProps {
    promos: PromoItemProps[];
}

const PromoGrid = ({ promos }: PromoGridProps) => {
    return (
        <div className="promo-grid">
            {promos.map((promo, index) => (
                <PromoItem
                    key={`promo-${index}`}
                    imageUrl={promo.imageUrl}
                    title={promo.title}
                />
            ))}
        </div>
    );
};

export default PromoGrid;