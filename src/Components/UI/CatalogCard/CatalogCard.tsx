import './CatalogCard.css';
import {RedButton} from "@/Components/UI/RedButton/RedButton";
import AddToCartBtn from "@/Components/UI/AddToCartBtn/AddToCartBtn";

interface CatalogCardProps {
    image: string;
    title: string;
    price: string;
}

const CatalogCard = ({ image, title, price }: CatalogCardProps) => {
    return (
        <div className="catalog-card">
            <div className="card-image">
                <img src={image} alt={title} />
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <div className="card-footer">
                    <span className="card-price">{price}</span>
                    <div className="card-actions">
                        <AddToCartBtn />
                        <RedButton  icon={<img src="/landing/white-calc.svg" alt="Калькулятор" />} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogCard;