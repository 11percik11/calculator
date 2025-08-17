import './Landing.css';
import PromoGrid from "@/Components/Widgets/PromoGrid/PromoGrid";
import StarAnimation from "@/Components/UI/StartAnimation/StartAnimation";
import CatalogPreviewGrid from "@/Components/Widgets/CatalogPreviewGrid/CatalogPreviewGrid";
import NewsGrid from "@/Components/Widgets/NewsGrid/NewsGrid";
import { BenefitGrid } from '@/Components/Widgets/BenefitGrid/BenefitGrid';
import {Footer} from "@/Components/Widgets/Footer/Footer";
import { CatalogPromoBlock } from '@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock';
import MeasurementSection from '@/Components/Widgets/MeasurementSection/MeasurementSection';


const benefitsData = [
    {
        imageUrl: '/landing/benefit/left.png',
        title: 'Высокое качество',
    },
    {
        imageUrl: '/landing/benefit/center.png',
        title: 'Бесплатный замер',
    },
    {
        imageUrl: '/landing/benefit/right.png',
        title: 'Быстрая доставка',
    }
];

const promoItems = [
    {
        imageUrl: 'https://i.pinimg.com/736x/82/bf/85/82bf85965c9c9e165f896ce6d9fb28f1.jpg',
        title: 'Скидка 20% на все'
    },
    {
        imageUrl: 'https://i.pinimg.com/736x/59/dd/41/59dd4185ae65eba59c6458bda6e61352.jpg',
        title: 'Новая коллекция'
    },
    {
        imageUrl: 'https://i.pinimg.com/1200x/c8/4e/c0/c84ec0ceff6c830a8a5d41dac8bee89e.jpg',
        title: 'Успей купить, скидки просто выше не бывает'
    },
    {
        imageUrl: 'https://i.pinimg.com/1200x/ff/29/59/ff2959ec077bfeac44c0bca8b8c897cf.jpg',
        title: 'Мы радостно вам сообщаем о новых акциях'
    },
    {
        imageUrl: 'https://i.pinimg.com/736x/cd/72/b9/cd72b995513ab2685ef7706f093a149a.jpg',
        title: 'Специальная акция в честь начала лета скидки 20% на все только сегодня и только у нас'
    }

];

const newsItems = [
    {
        imageUrl: 'https://i.pinimg.com/736x/cd/22/8a/cd228a6b090331b40a48c64d5ecc2864.jpg',
        title: 'Свежие новости только прибывшие',
        description: 'Только что получены последние новости о наших новых коллекциях. Узнайте первыми о грядущих поступлениях и эксклюзивных предложениях!'
    },
    {
        imageUrl: 'https://i.pinimg.com/736x/63/aa/5b/63aa5bfba9709b80569524cf3bcfd1a5.jpg',
        title: 'Новая коллекция "Весеннее настроение"',
        description: 'Представляем нашу новую сезонную коллекцию, вдохновленную весенними цветами и свежестью. Ограниченная серия - успейте приобрести!'
    },
    {
        imageUrl: 'https://i.pinimg.com/736x/63/79/75/6379752dd9a4d020b122b3af3266e5c6.jpg',
        title: 'Успей купить, скидки просто выше не бывает',
        description: 'Специальное предложение недели: скидки до 50% на selected items. Акция действует только до конца недели - не упустите свой шанс!'
    },
    {
        imageUrl: 'https://i.pinimg.com/1200x/aa/1c/cd/aa1ccd02130fa47b7154fce498b77df4.jpg',
        title: 'Мы радостно вам сообщаем о новых акциях',
        description: 'В честь нашего 10-летнего юбилея мы подготовили серию специальных акций и подарков для наших постоянных клиентов.'
    },
    {
        imageUrl: 'https://i.pinimg.com/736x/e4/c4/b4/e4c4b403da77b3cb8da8576cdab80309.jpg',
        title: 'Специальная акция в честь начала лета',
        description: 'Встречайте лето с нами! Скидки 20% на весь ассортимент только сегодня. Летняя коллекция уже в продаже - успейте обновить гардероб!'
    },
    {
        imageUrl: 'https://i.pinimg.com/1200x/76/b4/f9/76b4f9e908aa95bedb39167d27988f32.jpg',
        title: 'Эксклюзив для подписчиков',
        description: 'Только для наших подписчиков - специальный промокод на дополнительную скидку 15%. Подпишитесь на рассылку и получите свой промокод сегодня!'
    },
    {
        imageUrl: 'https://i.pinimg.com/736x/c7/34/2e/c7342e0e79ec4cc0658b8815c026a78f.jpg',
        title: 'Новые поступления каждую неделю',
        description: 'Мы постоянно обновляем ассортимент. Каждую пятницу - новые поступления. Следите за обновлениями и будьте первыми!'
    },
    {
        imageUrl: 'https://i.pinimg.com/736x/a9/ae/2a/a9ae2ac4b420dfa176c20229b8af13a0.jpg',
        title: 'Система лояльности для постоянных клиентов',
        description: 'Накопительная система скидок теперь доступна для всех покупателей. Совершайте покупки и получайте бонусы!'
    }
];

export const Landing = () => {
    return (
        <div className="landing">
            {/* Первый блок (hero section) */}
            <section className="landing__back">
                {/* Блок в левом нижнем углу */}
                <div className="hero__bottom-block">
                    <img
                        src='/landing/arrow.svg'
                        alt='Стрелка'
                        className="bottom-block__arrow"
                    />
                    <h1 className="bottom-block__title">
                        Жалюзи и рулонные шторы в Ижевске от производителя
                    </h1>
                </div>
            </section>
            <section className='second_block'>
                <PromoGrid promos={promoItems}/>
            </section>
            <section className='third-block'>
                <StarAnimation/>
                <div className='third-block-title'>
                    <h1 className='third-block-title-header'>
                        каталог продукции:
                        жалюзи и рулонные шторы
                    </h1>
                    <p className='third-block-title-text'>
                        Изготовим на заказ за 3 дня. Бесплатный замер, доставка и монтаж по Ижевску и Удмуртии.
                    </p>
                </div>
                <CatalogPreviewGrid/>

                <CatalogPromoBlock/>
            </section>

            <section className='four_block'>
                <NewsGrid news={newsItems}/>
            </section>

            <section className='five-block'>
                

                <MeasurementSection 
                            title="замерка окон нашими специалистами гарантирует, что ваши шторы “встанут как надо”"
                            description="Наши замерщики учитывают все особенности ваших окон, чтобы
                        шторы идеально легли и выглядели безупречно. Точный замер — залог идеальной посадки штор и
                        стильного интерьера."
                            rightImage='/landing/zamer.png'
                            buttonProps={{
                                text: "Заказать звонок специалиста",
                                icon: <img src="/header/call.svg" alt="Замер" />,
                                color: "custom",
                                customColor: "#FFFFFF",
                                onClick: () => console.log('Замер заказан')
                            }}
                        />
            </section>
            <section className="benefits-section">
                <StarAnimation/>
                <h2 className="section-title">Наши преимущества</h2>
                <BenefitGrid benefits={benefitsData}/>
            </section>
            <Footer/>
        </div>
    );
};

export default Landing;