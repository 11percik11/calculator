import "./Header.css";
import { BrownButton } from "@/Components/UI/BrownButton/BrownButton";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ModalCall } from "@/Components/Widgets/ModalCall/ModalCall";

export const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="header">
      <div className="header_box">
        <div className="header__left">
          <BrownButton
            text="КАТАЛОГ"
            icon={<img src="/header/dots.svg" alt="Иконка меню" />}
            onClick={() => navigate("/catalog")}
          />
          <BrownButton
            icon={<img src="/header/calc.svg" alt="Калькулятор" />}
            onClick={() => navigate("/calculator")}
          />
        </div>

        <nav className="header__center">
          <p className="header-text" onClick={() => navigate("/about")}>
            О НАС
          </p>
          <p className="header-text" onClick={() => navigate("/business")}>
            ДЛЯ ЮРЛИЦ
          </p>
          <div className="header-wrapper">
            <img
              src="/header/logo.png"
              alt="Логотип"
              className="header__logo"
              onClick={() => navigate("/")}
              />
          </div>
          <p className="header-text" onClick={() => navigate("/news")}>
            НОВОСТИ
          </p>
          <p className="header-text" onClick={() => navigate("/about")}>
            КОНТАКТЫ
          </p>
        </nav>

        <div className="header__right">
          <BrownButton
            icon={<img src="/header/basket.svg" alt="Корзина" />}
            onClick={() => navigate("/cart")}
          />
          <BrownButton
            text="ВЫЗВАТЬ ЗАМЕРЩИКА БЕСПЛАТНО"
            icon={<img src="/header/call.svg" alt="Вызов замерщика" />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <ModalCall isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
