import './PromoItem.css';

export interface PromoItemProps {
    imageUrl: string;
    title: string;
}
export const PromoItem = ({ imageUrl, title }: PromoItemProps) => {
    return (
        <div className="promo-item">
            <div className='promo-item__left'>
                <img src={imageUrl} alt={title} className="promo-item__image"/>
                <h3 className="promo-item__title">{title}</h3>
            </div>
            <div className='promo-item__right'>
                <img
                    src='/landing/arrow.svg'
                    alt='Стрелка'
                    className="promo-item__arrow"
                />
            </div>
        </div>
    );
};

export default PromoItem;