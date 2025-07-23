import './Header.css';
import { BrownButton } from "@/Components/UI/BrownButton/BrownButton";

export const Header = () => {
        return (
            <header className="header">
                    {/* Левая часть хедера */}
                    <div className="header__left">
                            <BrownButton
                                text="КАТАЛОГ"
                                icon={<img src="/header/dots.svg" alt="Иконка меню" />}
                            />
                            <BrownButton
                                icon={<img src="/header/calc.svg" alt="Калькулятор" />}
                            />
                    </div>

                    {/* Центральная часть с навигацией */}
                    <nav className="header__center">
                        <p className='header-text'>О НАС</p>
                        <p className='header-text'>ДЛЯ ЮРЛИЦ</p>
                        <div className='header-wrapper'>
                            <img src='/header/logo.png' alt='Логотип' className="header__logo"/>
                        </div>
                        <p className='header-text'>АКЦИИ</p>
                        <p className='header-text'>КОНТАКТЫ</p>
                    </nav>

                    {/* Правая часть хедера */}
                    <div className="header__right">
                            <BrownButton
                                icon={<img src="/header/basket.svg" alt="Корзина" />}
                            />
                            <BrownButton
                                text="ВЫЗВАТЬ ЗАМЕРЩИКА БЕСПЛАТНО"
                                icon={<img src="/header/call.svg" alt="Вызов замерщика" />}
                            />
                    </div>
            </header>
        );
};

export default Header;