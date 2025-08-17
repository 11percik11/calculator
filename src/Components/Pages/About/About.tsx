import { Footer } from '@/Components/Widgets/Footer/Footer';
import './About.css';
import { MeasurementSection } from '@/Components/Widgets/MeasurementSection/MeasurementSection';
import { CatalogPromoBlock } from '@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock';
import { GallerySection } from '@/Components/Widgets/GallerySection/GallerySection';

export const About = () => {
    // Массив изображений для галереи (замените на свои реальные пути)
    const galleryImages = [
        { image: 'https://i.pinimg.com/736x/5d/f9/75/5df9755d287b1db01dc7387b1a3a65bd.jpg' },
        { image: 'https://i.pinimg.com/736x/0d/c4/10/0dc410d1947aa17cd0bfb457c6620f50.jpg' },
        { image: 'https://i.pinimg.com/1200x/9d/a4/d4/9da4d472d0ee6b22405a3f9898116076.jpg' },
        { image: 'https://i.pinimg.com/1200x/12/00/0d/12000dc94f5ac4f32695e4777a857f59.jpg' },
        { image: 'https://i.pinimg.com/736x/2b/7d/3e/2b7d3e09f0448b1b594c9cc683e29ca5.jpg' },
        { image: 'https://i.pinimg.com/1200x/8d/f6/21/8df6219aed88934c49399cc5a9e8c7a6.jpg' },
        { image: 'https://i.pinimg.com/736x/ca/b4/66/cab466be23c7e6b60231be59878f412a.jpg' },
        { image: 'https://i.pinimg.com/736x/86/5f/2a/865f2aac5c8f5a1a073798413b222b12.jpg' },
        { image: 'https://i.pinimg.com/736x/30/4f/cc/304fcc43459cf414a16c8b4eb7750f39.jpg' },
        { image: 'https://i.pinimg.com/736x/5f/fc/ab/5ffcab3ec9df72108d6012825f2e7962.jpg' },
        { image: 'https://i.pinimg.com/1200x/df/68/2b/df682bd3e65f6a583390c79031eda6b1.jpg' },
        { image: 'https://i.pinimg.com/736x/46/42/8d/46428deafc947ae8bd40fa8f475b97f1.jpg' },
    ];

    return (
        <div className="about">
            <MeasurementSection 
                title="Рулонные шторы и жалюзи — наша история длиною в два десятилетия"
                description="Более 20 лет мы создаем уют, комфорт и эстетику пространства благодаря качественным рулонным шторам и элегантным жалюзи. Мы гордимся своей историей, накопленным опытом и безупречной репутацией среди клиентов, которым важно создать гармоничную атмосферу своего дома или офиса.

                Наш многолетний опыт позволяет воплощать самые смелые дизайнерские решения, создавая изделия высочайшего качества. Современная техника, качественные материалы и индивидуальный подход к каждому клиенту делают нашу продукцию уникальной и востребованной.

                Мы ценим ваше доверие и дорожим каждым заказом!"
                rightImage='/landing/about-us.png'
                buttonProps={{
                    text: "Заказать звонок специалиста",
                    icon: <img src="/header/call.svg" alt="Замер" />,
                    color: "custom",
                    customColor: "#FFFFFF",
                    onClick: () => console.log('Замер заказан')
                }}
            />
            
            <GallerySection
                title="Наши работы"
                description="Проекты, которыми мы гордимся"
                icons={galleryImages}
            />
            
            <CatalogPromoBlock/>
            <Footer />
        </div>
    );
};

export default About;