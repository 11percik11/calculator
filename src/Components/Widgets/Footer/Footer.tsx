import './Footer.css';
import { Button } from "@/Components/UI/Button/Button";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { ModalCall } from '@/Components/Widgets/ModalCall/ModalCall';

export const Footer = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const scrollToTop = () => {
        const anchor = document.getElementById('page-top');
        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            window.scrollTo(0, 0);
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        scrollToTop();
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <footer className="footer">
                <div className='footer__container'>
                    {/* Первая колонка */}
                    <div className='footer__col footer__col--main'>
                        <img 
                            className="footer__logo" 
                            alt='logo' 
                            src='/landing/logo-big.png'
                            onClick={() => handleNavigation('/')}
                            style={{cursor: 'pointer'}}
                        />
                        <h2 className="footer__title">Свяжитесь с нами, чтобы заказать шторы под индивидуальный заказ</h2>
                        <Button
                            icon={<img src="/header/call.svg" alt="call"/>}
                            text='Заказать звонок специалиста'
                            color='primary'
                            rounded='full'
                            className="footer__button"
                            onClick={handleOpenModal}
                            size='lg'
                        />
                    </div>

                    {/* Вторая колонка - Продукция */}
                    <div className='footer__col'>
                        <h2 className="footer__subtitle">Продукция</h2>
                        <ul className="footer__list">
                            {[
                                {name: 'Вертикальные жалюзи', path: '/catalog/vertical'},
                                {name: 'Горизонтальные жалюзи', path: '/catalog/horizontal'},
                                {name: 'Шторы плиссе', path: '/catalog/plisse'},
                                {name: 'Рулонные шторы', path: '/catalog/roll'},
                                {name: 'Мультифактурные', path: '/catalog/multifabric'},
                                {name: 'Жалюзи «День-ночь»', path: '/catalog/day-night'},
                                {name: 'Римские шторы', path: '/catalog/roman'}
                            ].map((item, index) => (
                                <li key={index} className="footer__list-item">
                                    <span 
                                        className="footer__link" 
                                        onClick={() => handleNavigation(item.path)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        {item.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Третья колонка - Контакты */}
                    <div className='footer__col'>
                        <div>
                            <h2 className="footer__subtitle">Свяжитесь с нами</h2>
                            <p className="footer__text">Мы на связи по будням с 8:00 до 21:00</p>
                        </div>

                        <div className="footer__contacts">
                            <h2 className="footer__subtitle">Адрес</h2>
                            <p className="footer__text">г. Ижевск, ул. Кирова, 117</p>
                            <p className="footer__text">ПН-ПТ 8:00-21:00</p>
                            <p className="footer__text">
                                © ИП Краев Василий Дмитриевич, 2025
                            </p>
                        </div>
                    </div>

                    {/* Четвертая колонка - Навигация */}
                    <div className='footer__col footer__col--nav'>
                        <div>
                            <h2 className="footer__subtitle">Навигация</h2>
                            <ul className="footer__list">
                                {[
                                    {name: 'О компании', path: '/about'},
                                    {name: 'Каталог', path: '/catalog'},
                                    {name: 'Калькулятор', path: '/calculator'},
                                    {name: 'Акции', path: '/promotions'},
                                    {name: 'Новости', path: '/news'},
                                    {name: 'Для юридических лиц', path: '/business'},
                                    {name: 'Контакты', path: '/contacts'},
                                    {name: 'Оферта', path: '/offer'},
                                    {name: 'Политика конфиденциальности', path: '/privacy'},
                                    {name: 'Реквизиты', path: '/requisites'}
                                ].map((item, index) => (
                                    <li key={index} className="footer__list-item">
                                        <span 
                                            className="footer__link" 
                                            onClick={() => handleNavigation(item.path)}
                                            style={{cursor: 'pointer'}}
                                        >
                                            {item.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={scrollToTop} className="footer__scroll-top">
                            <img alt='Наверх' src='/landing/up.svg'/>
                        </button>
                    </div>
                </div>
            </footer>

            <ModalCall 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
            />
        </>
    );
};