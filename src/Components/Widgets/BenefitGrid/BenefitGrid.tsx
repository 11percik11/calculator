import './BenefitGrid.css';
import { BenefitCard, BenefitCardProps } from '@/Components/UI/BenefitCard/BenefitCard';

interface BenefitGridProps {
    benefits: BenefitCardProps[];
    columns?: number;
}

export const BenefitGrid = ({ benefits, columns = 3 }: BenefitGridProps) => {
    return (
        <div
            className="benefit-grid"
            style={{ '--columns': columns } as React.CSSProperties}
        >
            {benefits.map((benefit, index) => (
                <BenefitCard
                    key={`benefit-${index}`}
                    imageUrl={benefit.imageUrl}
                    title={benefit.title}
                    description={benefit.description}
                />
            ))}
        </div>
    );
};