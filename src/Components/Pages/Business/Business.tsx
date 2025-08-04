import { Footer } from '@/Components/Widgets/Footer/Footer';
import './Business.css'
import  MeasurementSection  from '@/Components/Widgets/MeasurementSection/MeasurementSection'
import { CatalogPromoBlock } from '@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock';

export const Business = () => {
    return (
        <div className="business">
            <MeasurementSection 
            title="Решения для бизнеса: надёжно, эффективно, профессионально"
            description="Мы предлагаем комплексные услуги для компаний любого масштаба — от малого бизнеса до крупных корпоративных клиентов. Работаем официально, по договору, с полным пакетом закрывающих документов и соблюдением сроков.

Что мы предлагаем:
Индивидуальные условия сотрудничества
Гибкую систему оплаты (в том числе с НДС)
Персонального менеджера
Прозрачную отчётность и юридическую чистоту
Быстрый документооборот и электронную подпись"
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

export default Business;