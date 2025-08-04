import './Footer.css';
import {Button} from "@/Components/UI/Button/Button";

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <div className='footer__container'>
                {/* Первая колонка */}
                <div className='footer__col footer__col--main'>
                    <img className="footer__logo" alt='logo' src='/header/logo.png'/>
                    <h2 className="footer__title">Свяжитесь с нами, чтобы заказать шторы под индивидуальный заказ</h2>
                    <Button
                        icon={<img src="/header/call.svg" alt="call"/>}
                        text='Заказать звонок специалиста'
                        color='primary'
                        rounded='full'
                        className="footer__button"
                    />
                </div>

                {/* Вторая колонка - Продукция */}
                <div className='footer__col'>
                    <h2 className="footer__subtitle">Продукция</h2>
                    <ul className="footer__list">
                        {['Вертикальные жалюзи', 'Горизонтальные жалюзи', 'Шторы плиссе',
                            'Рулонные шторы', 'Мультифактурные', 'Жалюзи «День-ночь»',
                            'Римские шторы'].map((item, index) => (
                            <li key={index} className="footer__list-item">
                                <a href="#" className="footer__link">{item}</a>
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
                            {['О компании', 'Каталог', 'Корзина', 'Калькулятор', 'Акции',
                                'Новости', 'Для юридических лиц', 'Контакты', 'Оферта',
                                'Политика конфиденциальности', 'Реквизиты'].map((item, index) => (
                                <li key={index} className="footer__list-item">
                                    <a href="#" className="footer__link">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={scrollToTop} className="footer__scroll-top">
                        <img alt='Наверх' src='/landing/up.svg'/>
                    </button>
                </div>
            </div>

            {/* Копирайт */}

        </footer>
    );
};