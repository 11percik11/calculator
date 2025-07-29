import './BenefitCard.css';

export interface BenefitCardProps {
    imageUrl: string;
    title: string;
    description?: string;
    className?: string;
}

export const BenefitCard = ({
                                imageUrl,
                                title,
                                description,
                                className = ''
                            }: BenefitCardProps) => {
    return (
        <div className={`benefit-card ${className}`}>
            <div className="benefit-card__image-container">
                <img
                    src={imageUrl}
                    alt={title}
                    className="benefit-card__image"
                />
            </div>
            <div className="benefit-card__content">
                <h3 className="benefit-card__title">{title}</h3>
                <p className="benefit-card__description">{description}</p>
            </div>
        </div>
    );
};