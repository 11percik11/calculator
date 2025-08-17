import { Button } from '../Button/Button';
import './NewsBigCard.css';

export interface NewsCardProps {
    title: string;
    imageUrl: string;
    description: string;
}
export const NewsBigCard = ({ imageUrl, title, description }: NewsCardProps) => {
    return (
        <div className="news-big-card">
            <div className="news-big-card__container">
                <img src={imageUrl} alt={title} className="news-big-card__image" />
                <div className="news-big-card__content">
                    <h2 className="news-big-card__title">{title}</h2>
                    <p className="news-big-card__text">{description}</p>
                    <Button
                    fullWidth={true}
                    text='Подробнее'
                    hoverEffect='shine'
                    variant='outline'
                    customColor='#fff'
                    /> 
                </div>
            </div>
            
        </div>
    );
};
