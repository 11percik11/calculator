// Components/UI/CatalogCardFull/CatalogCardFull.tsx
import { Button } from '@/Components/UI/Button/Button';
import './CatalogCardFull.css';
import { useNavigate } from 'react-router';

interface CatalogCardFullProps {
    image: string;
    title: string;
    price: string;
    productId: number; // добавляем productId
}

export const CatalogCardFull = ({ image, title, price, productId }: CatalogCardFullProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${productId}`); // меняем на динамический путь
    };

    return (
        <div className="catalog-card-full" onClick={handleClick}>
            <div className="catalog-card-full__image">
                <img src={image} alt={title} />
            </div>
            <div className="catalog-card-full__content">
                <h4 className="catalog-card-full__title">{title}</h4>
                <span className="catalog-card-full__price">{price}</span>
                <div className="catalog-card-full__footer">
                    <div className="catalog-card-full__actions">
                        <Button
                            text='Подробнее'
                            fullWidth={true}
                            customColor='#E7392F'
                            onClick={handleClick}
                            hoverEffect='underline'
                            color='custom'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};