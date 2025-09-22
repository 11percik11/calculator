import { ModalNewsPromo } from '@/Components/Widgets/ModalNewsPromo/ModalNewsPromo';
import { Button } from '../Button/Button';
import './NewsBigCard.css';
import { useState } from 'react';

export interface NewsCardProps {
    title: string;
    imageUrl: string;
    description: string;
}

export const NewsBigCard = ({ imageUrl, title, description }: NewsCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Ограничиваем длину описания до 150 символов
    const truncateDescription = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const truncatedDescription = truncateDescription(description);

    return (
        <div className="news-big-card">
            <div className="news-big-card__container">
                <img src={imageUrl} alt={title} className="news-big-card__image" />
                <div className="news-big-card__content">
                    <h2 className="news-big-card__title">{title}</h2>
                    <p className="news-big-card__text">{truncatedDescription}</p>
                    <Button
                        fullWidth={true}
                        text='Подробнее'
                        hoverEffect='underline'
                        variant='outline'
                        customColor='#fff'
                        onClick={handleCardClick}
                    /> 
                </div>
            </div>
            <ModalNewsPromo
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                imageUrl={imageUrl}
                title={title}
                description={description} // В модалке показываем полное описание
            />
        </div>
    );
};