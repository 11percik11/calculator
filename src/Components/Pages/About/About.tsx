import { Footer } from '@/Components/Widgets/Footer/Footer';
import './About.css'
import  MeasurementSection  from '@/Components/Widgets/MeasurementSection/MeasurementSection'
import { CatalogPromoBlock } from '@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock';

export const About = () => {
    return (
        <div className="about">
            <MeasurementSection 
            title="Рулонные шторы и жалюзи — наша история длиною в два десятилетия"
            description="Более 20 лет мы создаем уют, комфорт и эстетику пространства благодаря качественным рулонным шторам и элегантным жалюзи. Мы гордимся своей историей, накопленным опытом и безупречной репутацией среди клиентов, которым важно создать гармоничную атмосферу своего дома или офиса.

Наш многолетний опыт позволяет воплощать самые смелые дизайнерские решения, создавая изделия высочайшего качества. Современная техника, качественные материалы и индивидуальный подход к каждому клиенту делают нашу продукцию уникальной и востребованной.

Мы ценим ваше доверие и дорожим каждым заказом!"
            buttonProps={{
                text: "Заказать звонок специалиста",
                icon: <img src="/header/call.svg" alt="Замер" />,
                color: "custom",
                customColor: "#FFFFFF",
                onClick: () => console.log('Замер заказан')
            }}
            />
            <CatalogPromoBlock/>
           <Footer />
        </div>
    );
};

export default About;