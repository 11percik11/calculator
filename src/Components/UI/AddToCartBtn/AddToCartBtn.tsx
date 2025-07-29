import './AddToCartBtn.css';
import { useState } from 'react';

const AddToCartBtn = () => {
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        setIsAdded(!isAdded);
    };

    return (
        <button
            className={`add-to-cart-button ${isAdded ? 'added' : ''}`}
            onClick={handleClick}
        >
            <img
                src={isAdded ? '/landing/white-basket.svg' : '/landing/white-basket.svg'}
                alt={isAdded ? 'Добавлено' : 'Добавить в корзину'}
                className="add-to-cart-button__icon"
            />
            <span className="add-to-cart-button__icon" >{isAdded ? 'Перейти в корзину' : 'Добавить в корзину'}</span>
        </button>
    );
};

export default AddToCartBtn;