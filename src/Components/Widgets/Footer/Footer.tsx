import './Footer.css';
import {Button} from "@/Components/UI/Button/Button";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer-first-col'>
                <img alt='logo' src='/header/logo.png'/>
                <h2>свяжитесь с нами, чтобы заказать шторы под индивидуальный заказ</h2>
                <Button icon={<img src="/header/call.svg" alt="Каталог"/>}
                        text='Заказать звонок специалиста'
                        color='primary'
                        rounded='full'
                        />
            </div>
            <div className='footer-second-col'>
                <h2>Продукция</h2>
                <p>Вертикальные жалюзи</p>
                <p>Горизонтальные жалюзи</p>
                <p>Шторы плиссе</p>
                <p>Рулонные шторы</p>
                <p>Мультифактурные</p>
                <p>Жалюзи «День-ночь»</p>
                <p>Римские шторы</p>

            </div>
            <div className='footer-third-col'>
                <h2>Свяжитесь с нами</h2>
                <h5>Мы на связи по будням с 8:00 до 21:00</h5>
                <p></p>
                <p></p>
                <p></p>
                <div>
                    <h2>
                        Адрес
                    </h2>
                    <p>г. Ижевск, ул. Кирова, 117</p>
                    <p>ПН-ПТ 8:00-21:00</p>
                    <h5>© ИП Краев Василий Дмитриевич, 2025</h5>
                </div>

            </div>
            <div className='footer-four-col'>
                <div>
                    <h2>Навигация</h2>
                    <p>О компании</p>
                    <p>Каталог</p>
                    <p>Корзина</p>
                    <p>Калькулятор</p>
                    <p>Акции</p>
                    <p>Новости</p>
                    <p>Для юридических лиц</p>
                    <p>Контакты</p>

                    <p>Оферта</p>
                    <p>Политика конфиденциальности</p>
                    <p>Реквизиты</p>
                </div>
                <div>
                    <img alt='up' src='/landing/up.svg'/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;