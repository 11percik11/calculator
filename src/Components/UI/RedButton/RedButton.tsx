import './RedButton.css';

type BrownButtonProps = {
    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

export const RedButton = ({
                                text,
                                icon,
                                onClick,
                                className = ''
                                }: BrownButtonProps) => {
    return (
        <button
            className={`red-button ${className}`}
            onClick={onClick}
        >
            {icon && <span className="red-button__icon">{icon}</span>}
            {text && <span className="red-button__text">{text}</span>}
        </button>
    );
};