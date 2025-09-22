import "./ModalNewsPromo.css";
import { useEffect } from "react";
import { Portal } from "@/Components/Widgets/Portal/Portal";

interface ModalNewsPromoProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
}

export const ModalNewsPromo = ({ isOpen, onClose, imageUrl, title, description }: ModalNewsPromoProps) => {
  // Закрытие по клавише Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // Закрытие по клику на фон
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="modal-promo-overlay" onClick={handleOverlayClick}>
        <div className="modal-promo__container">
          <div className="modal-promo__image-container">
            <img src={imageUrl} alt={title} className="modal-promo__image" />
            <button className="modal-promo__close" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M18 6L6 18M6 6L18 18" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="modal-promo__content">
            <h2 className="modal-promo__title">{title}</h2>
            <div className="modal-promo__description">{description}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};