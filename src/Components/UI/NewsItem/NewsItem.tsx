import './NewsItem.css';

export interface NewsItemProps {
    imageUrl: string;
    title: string;
    description: string,
}
export const NewsItem = ({ imageUrl, title, description }: NewsItemProps) => {
    return (
        <div className="news-item">
            <div className='news-item__left'>
                <img src={imageUrl} alt={title} className="news-item__image"/>
                <h3 className="news-item__title">{title}</h3>
                <h3 className="news-item__description">{description}</h3>
            </div>
            <div className='news-item__right'>
                <img
                    src='/landing/arrow.svg'
                    alt='Стрелка'
                    className="news-item__arrow"
                />
            </div>
        </div>
    );
};

export default NewsItem;