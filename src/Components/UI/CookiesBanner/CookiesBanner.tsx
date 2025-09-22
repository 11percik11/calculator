// Components/CookiesBanner.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/Components/UI/Button/Button';
import './CookiesBanner.css';

export const CookiesBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, давал ли пользователь уже согласие
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };


  if (!isVisible) return null;

  return (
    <div className="cookies-banner">
      <div className="cookies-content">
        <h3>Мы используем cookies</h3>
        <p>
          Этот сайт использует cookies для улучшения работы сайта и хранения данных.
          Продолжая использовать сайт, Вы даете свое согласие на работу с этими файлами 
        </p>
        <div className="cookies-buttons">
          <Button
            text="ОК"
            onClick={acceptCookies}
            variant="solid"
            color="primary"
            hoverEffect='underline'
          />
        </div>
      </div>
    </div>
  );
};