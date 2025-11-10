import { Button } from "@/Components/UI/Button/Button";
import "./ModalCall.css";
import { useState, useEffect } from "react";
import { createCallRequest } from "@/Api/queries";
import { useNavigate } from "react-router";
import { Portal } from "@/Components/Widgets/Portal/Portal";

interface ModalCallProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCall = ({ isOpen, onClose }: ModalCallProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "", // Храним только цифры
  });
  const [formattedPhone, setFormattedPhone] = useState(""); // Отображаемый форматированный номер
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Очистка формы при открытии/закрытии
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", phone: "" });
      setFormattedPhone("");
      setError(null);
      setPhoneError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  // Форматирование номера телефона
  const formatPhoneNumber = (digits: string): string => {
    const cleaned = digits.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return cleaned;

    const parts = [];
    if (match[1]) parts.push(match[1]); // 8
    if (match[2]) parts.push(match[2]); // 909
    if (match[3]) parts.push(match[3]); // 908
    if (match[4]) parts.push(match[4]); // 09
    if (match[5]) parts.push(match[5]); // 09

    return parts.filter(Boolean).join("-"); // Объединяем с дефисом
  };

  // Обработка изменений в инпуте
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Извлекаем только цифры
      const digitsOnly = value.replace(/\D/g, "").slice(0, 11); // Ограничиваем 11 цифрами
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));

      // Форматируем для отображения
      const formatted = formatPhoneNumber(digitsOnly);
      setFormattedPhone(formatted);

      // Валидация телефона
      if (digitsOnly.length === 11) {
        setPhoneError(null);
      } else if (digitsOnly.length > 0) {
        setPhoneError("Номер должен содержать 11 цифр");
      } else {
        setPhoneError("Введите номер телефона");
      }
    } else {
      setFormData((prev) => ({ ...prev, name: value }));
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name.trim()) {
        throw new Error("Введите ваше имя");
      }
      if (formData.phone.length !== 11) {
        throw new Error("Номер должен содержать 11 цифр");
      }

      await createCallRequest({
        name: formData.name.trim(),
        phone: formData.phone,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err: unknown) {
      let errorMessage = "Ошибка при отправке";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null) {
        const errorObj = err as { response?: { data?: { message?: string } } };
        if (errorObj.response?.data?.message) {
          errorMessage = errorObj.response.data.message;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyPolicyClick = () => {
    navigate("/privacy");
    onClose();
  };

  const handleDataPolicyClick = () => {
    navigate("/agreement");
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal__container">
          <div className="modal__header">
            <h2 className="modal__header-text">Вызов замерщика бесплатно</h2>
            <button
              className="modal__header-close"
              onClick={onClose}
              disabled={loading}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {success ? (
            <div className="modal-success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M22 4L12 14.01L9 11.01"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Заявка отправлена успешно!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="modal__text">
                Наши замерщики учитывают все особенности ваших окон, чтобы шторы идеально легли и выглядели безупречно.
                Точный замер — залог идеальной посадки штор и стильного интерьера.
              </p>

              <div className="modal__name">
                <h3 className="modal__name-text">ВВЕДИТЕ ВАШЕ ИМЯ</h3>
                <input
                  type="text"
                  className="modal__name-input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Иван"
                  required
                />
              </div>

              <div className="modal__phone">
                <h3 className="modal__phone-text">ВВЕДИТЕ НОМЕР ТЕЛЕФОНА</h3>
                <div className="phone-input-container">
                  <input
                    type="tel"
                    className={`modal__phone-input ${phoneError ? 'input-error' : ''}`}
                    name="phone"
                    value={formattedPhone} // Используем форматированный номер
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="8-123-123-33-44"
                    maxLength={15} // Учитываем длину с дефисами
                  />
                  {phoneError && (
                    <div className="phone-error-message">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="#DC2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      {phoneError}
                    </div>
                  )}
                  {!phoneError && formData.phone.length === 11 && (
                    <div className="phone-success-message">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                          stroke="#16A34A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M22 4L12 14.01L9 11.01"
                          stroke="#16A34A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Номер введен корректно
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="modal-error">
                  <p>{error}</p>
                </div>
              )}

              <Button
                text={loading ? "ОТПРАВКА..." : "ОТПРАВИТЬ"}
                hoverEffect="underline"
                disabled={loading || !!phoneError || formData.phone.length !== 11}
              />

              <div className="modal__footer">
                <p className="modal__privacy">
                  Нажимая кнопку отправить Вы соглашаетесь с{" "}
                  <span
                    className="modal__link"
                    onClick={handlePrivacyPolicyClick}
                  >
                    Политикой конфиденциальности
                  </span>{" "}
                  и{" "}
                  <span
                    className="modal__link"
                    onClick={handleDataPolicyClick}
                  >
                    Политикой обработки данных
                  </span>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </Portal>
  );
};
