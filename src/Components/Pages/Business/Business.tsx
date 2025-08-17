import { Footer } from '@/Components/Widgets/Footer/Footer';
import './Business.css'
import  MeasurementSection  from '@/Components/Widgets/MeasurementSection/MeasurementSection'
import { CatalogPromoBlock } from '@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock';
import { GallerySection } from '@/Components/Widgets/GallerySection/GallerySection';

export const Business = () => {

    const galleryImages = [
        { image: 'https://i.pinimg.com/1200x/58/94/60/58946086b13f1e95607affa1e20fabd3.jpg' },
        { image: 'https://i.pinimg.com/736x/41/2c/25/412c25ccc677d3ae412e0589e190b6ef.jpg' },
        { image: 'https://i.pinimg.com/1200x/fa/12/95/fa1295fae96278135f17f8f271e7d24b.jpg' },
        { image: 'https://i.pinimg.com/1200x/7b/44/48/7b444830d4bfff588d93799dd215625b.jpg' },
        { image: 'https://i.pinimg.com/1200x/d5/10/bb/d510bb41306fc5221ec6b7527d7788ec.jpg' },
        { image: 'https://i.pinimg.com/1200x/5a/03/ec/5a03eca1c0dedb909de4c43c030f1abe.jpg' },
        { image: 'https://i.pinimg.com/1200x/a8/31/af/a831af169886879bd3b2fbca7c6f69de.jpg' },
        { image: 'https://i.pinimg.com/736x/dc/4c/c3/dc4cc386cd6a47d6b7956ec6f34afa52.jpg' },
        { image: 'https://i.pinimg.com/736x/54/72/fe/5472fec4e22c7db4e0940809164c5efe.jpg' },
        { image: 'https://i.pinimg.com/736x/9c/a7/69/9ca769c0b38cbf5446576570a327688a.jpg' },

    ];

    return (
        <div className="business">
            <MeasurementSection 
            title="Решения для бизнеса: надёжно, эффективно, профессионально"
            description="Мы предлагаем комплексные услуги для компаний любого масштаба — от малого бизнеса до крупных корпоративных клиентов. Работаем официально, по договору, с полным пакетом закрывающих документов и соблюдением сроков.

Что мы предлагаем:
- Индивидуальные условия сотрудничества
- Гибкую систему оплаты (в том числе с НДС)
- Персонального менеджера
- Прозрачную отчётность и юридическую чистоту
- Быстрый документооборот и электронную подпись"
            rightImage='/landing/for-business.png'
            buttonProps={{
                text: "Заказать звонок специалиста",
                icon: <img src="/header/call.svg" alt="Замер" />,
                color: "custom",
                customColor: "#FFFFFF",
                onClick: () => console.log('Замер заказан')
            }}
            />
            <GallerySection
                title='НАМ ДОВЕРЯЮТ'
                description='Компании из разных отраслей — от e-commerce до промышленности. Мы ценим деловой подход и всегда нацелены на долгосрочное сотрудничество.'
                icons={galleryImages}
            />
            <CatalogPromoBlock/>
           <Footer />
        </div>
    );
};

export default Business;