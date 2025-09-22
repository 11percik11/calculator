import { Button } from '@/Components/UI/Button/Button';
import './CatalogCard.css';
import { useNavigate } from 'react-router';

interface CatalogCardProps {
    image: string;
    title: string;
    price: string;
}

const CatalogCard = ({ image, title, price }: CatalogCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/catalog');
    };

    return (
        <div className="catalog-card">
            <div className="card-image">
                <img src={image} alt={title} />
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <span className="card-price">{price}</span>
                <div className="card-footer">
                    <div className="card-actions">
                        <Button
                            text='Перейти в каталог'
                            fullWidth = {true}
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

export default CatalogCard;