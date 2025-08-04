import './Header.css';
import { BrownButton } from "@/Components/UI/BrownButton/BrownButton";
import { useNavigate } from 'react-router-dom';


export const Header = () => {
    const navigate = useNavigate();

        return (
            <header className="header">
                    {/* Левая часть хедера */}
                    <div className="header__left">
                            <BrownButton
                                text="КАТАЛОГ"
                                icon={<img src="/header/dots.svg" alt="Иконка меню" />}
                                onClick={() => navigate('/catalog')}
                            />
                            <BrownButton
                                icon={<img src="/header/calc.svg" alt="Калькулятор" />}
                                onClick={() => navigate('/calc')}
                            />
                    </div>

                    {/* Центральная часть с навигацией */}
                    <nav className="header__center">
                        <p className='header-text' onClick={() => navigate('/about')} >О НАС</p>
                        <p className='header-text' onClick={() => navigate('/business')} >ДЛЯ ЮРЛИЦ</p>
                        <div className='header-wrapper'>
                            <img src='/header/logo.png' alt='Логотип' className="header__logo" onClick={() => navigate('/')}/>
                        </div>
                        <p className='header-text' onClick={() => navigate('/news')} >АКЦИИ</p>
                        <p className='header-text'onClick={() => navigate('/about')} >КОНТАКТЫ</p>
                    </nav>

                    {/* Правая часть хедера */}
                    <div className="header__right">
                            <BrownButton
                                icon={<img src="/header/basket.svg" alt="Корзина" />}
                                onClick={() => navigate('/calc')}
                            />
                            <BrownButton
                                text="ВЫЗВАТЬ ЗАМЕРЩИКА БЕСПЛАТНО"
                                icon={<img src="/header/call.svg" alt="Вызов замерщика" />}
                                onClick={() => navigate('/calc')}
                            />
                    </div>
            </header>
        );
};

export default Header;