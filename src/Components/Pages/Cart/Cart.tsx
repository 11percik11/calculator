import { Button } from "@/Components/UI/Button/Button";
import CatalogPreviewGrid from "@/Components/Widgets/CatalogPreviewLikeGrid/CatalogPreviewLikeGrid";
import "./Cart.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "@/Api/axiosInstance";
import StarAnimation from "@/Components/UI/StartAnimation/StartAnimation";

interface CartItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  image: string;
  size: string;
}

export const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false); // Флаг загрузки данных
  const [formattedPhone, setFormattedPhone] = useState(""); // Отображаемый форматированный номер
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // Загружаем товары из localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    console.log("Загрузка корзины из localStorage:", storedCart); // Отладка
    if (storedCart) {
      setCartItems(JSON.parse(storedCart) as CartItem[]);
    }
    setIsLoaded(true); // Помечаем, что данные загружены
  }, []);

  // Обновляем localStorage при изменении корзины, но только после загрузки
  useEffect(() => {
    if (isLoaded) {
      console.log("Обновление localStorage с корзиной:", cartItems); // Отладка
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Обработка изменений в форме
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

  // Удаление товара из корзины
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const formatPhoneNumber = (digits: string): string => {
    const cleaned = digits.replace(/\D/g, "");
    const match = cleaned.match(
      /^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/
    );
    if (!match) return cleaned;

    const parts = [];
    if (match[1]) parts.push(match[1]); // 8
    if (match[2]) parts.push(match[2]); // 909
    if (match[3]) parts.push(match[3]); // 908
    if (match[4]) parts.push(match[4]); // 09
    if (match[5]) parts.push(match[5]); // 09

    return parts.filter(Boolean).join("-"); // Объединяем с дефисом
  };

  // Отправка заказа
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
      if (cartItems.length === 0) {
        throw new Error("Корзина пуста");
      }

      // Отправка запроса на бэкенд
      // await axiosInstance.post(
      //   "/api/call",
      //   {
      //     name: formData.name.trim(),
      //     phone: formData.phone,
      //     items: cartItems.map((item) => ({
      //       id: item.id,
      //       title: item.title,
      //       price: item.price,
      //     })),
      //   },
      //   {
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const selectedCartItems = cartItems.filter((item) =>
        selectedItems.includes(item.id)
      );

      if (selectedCartItems.length === 0) {
        throw new Error("Выберите хотя бы один товар для заказа");
      }

      await axiosInstance.post(
        "/api/call",
        {
          name: formData.name.trim(),
          phone: formData.phone,
          items: selectedCartItems.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            size: item.size || "Нет размера",
          })),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: "", phone: "" });

        // ✅ Удаляем только те товары, которые были заказаны
        setCartItems((prevCart) =>
          prevCart.filter((item) => !selectedItems.includes(item.id))
        );

        // ✅ Очищаем выбор после удаления
        setSelectedItems([]);
      }, 2000);
    } catch (err: unknown) {
      let errorMessage = "Ошибка при отправке заказа";
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
  };

  const handleDataPolicyClick = () => {
    navigate("/agreement");
  };

  return (
    <>
      <div className="cart__container">
        <div className="cart__title">
          <StarAnimation />
          <h2 className="cart__title-header">КОРЗИНА</h2>
          <p className="cart__title-text">
            Оформите заказ сейчас и мы доставим его за 5 дней.
          </p>
        </div>
        <div className="cart__object">
          <div className="cart__items">
            {cartItems.length === 0 ? (
              <p className="cart__empty">Корзина пуста</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart__item">
                  <input
                    className="cart__item_input"
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart__item-image"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-product.jpg";
                    }}
                  />
                  <div className="cart__item-info">
                    <h3 className="cart__item-title">{item.title}</h3>
                    <p className="cart__item-description">
                      {item.description || (
                        <>
                          Высота: {item.size.split("x")[0]} см
                          <br />
                          Ширина: {item.size.split("x")[1]} см
                        </>
                      )}
                    </p>
                    <p className="cart__item-price">
                      {item.price.toLocaleString("ru-RU")} PУБ
                    </p>
                  </div>
                  <div className="cart__item-button">
                    <button
                      className="cart__item-remove"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={loading}
                    >
                      <img src="/photo/trash_can.svg" alt="Корзина" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart__form">
            {success ? (
              <div className="cart-success">
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
                <p>Заказ успешно отправлен!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="cart__form-text">
                  Заполните данные для оформления заказа. Мы свяжемся с вами для
                  подтверждения.
                </p>

                <div className="cart__form-name">
                  <h3 className="cart__form-name-text">ВВЕДИТЕ ВАШЕ ИМЯ</h3>
                  <input
                    type="text"
                    className="cart__form-name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading}
                    placeholder="Иван"
                    required
                  />
                </div>

                <div className="cart__form-phone">
                  <h3 className="cart__form-phone-text">
                    ВВЕДИТЕ НОМЕР ТЕЛЕФОНА
                  </h3>
                  <div className="phone-input-container">
                    <input
                      type="tel"
                      className={`cart__form-phone-input ${
                        phoneError ? "input-error" : ""
                      }`}
                      name="phone"
                      value={formattedPhone} // Используем форматированный номер
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="8-123-123-33-44"
                      maxLength={15} // Учитываем длину с дефисами
                    />
                    {phoneError && (
                      <div className="phone-error-message">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
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
                  <div className="cart-error">
                    <p>{error}</p>
                  </div>
                )}

                <Button
                  text={loading ? "ОТПРАВКА..." : "ОФОРМИТЬ ЗАКАЗ"}
                  hoverEffect="underline"
                  disabled={
                    loading ||
                    !!phoneError ||
                    formData.phone.length !== 11 ||
                    cartItems.length === 0
                  }
                />

                <div className="cart__form-footer">
                  <p className="cart__form-privacy">
                    Нажимая кнопку "Оформить заказ", вы соглашаетесь с{" "}
                    <span
                      className="cart__form-link"
                      onClick={handlePrivacyPolicyClick}
                    >
                      Политикой конфиденциальности
                    </span>{" "}
                    и{" "}
                    <span
                      className="cart__form-link"
                      onClick={handleDataPolicyClick}
                    >
                      Политикой обработки данных
                    </span>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="product-block__like">
        <h2 className="product-block__like-title">ВАМ МОЖЕТ ПОНРАВИТЬСЯ</h2>
        <CatalogPreviewGrid />
      </div>
    </>
  );
};
