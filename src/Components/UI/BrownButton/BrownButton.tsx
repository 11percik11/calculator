import './BrownButton.css';

type BrownButtonProps = {
    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

export const BrownButton = ({
                                text,
                                icon,
                                onClick,
                                className = ''
                                }: BrownButtonProps) => {
    return (
        <button
            className={`brown-button ${className}`}
            onClick={onClick}
        >
            {icon && <span className="brown-button__icon">{icon}</span>}
            {text && <span className="brown-button__text">{text}</span>}
        </button>
    );
};