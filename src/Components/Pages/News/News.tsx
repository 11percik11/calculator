import { Footer } from '@/Components/Widgets/Footer/Footer';
import './News.css'
import { CatalogPromoBlock } from '@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock';
import StarAnimation from '@/Components/UI/StartAnimation/StartAnimation';
import { NewsBigCard } from '@/Components/UI/NewsBigCard/NewsBigCard';

const newsData = [
    {
        title: "Новые тенденции в дизайне жалюзи 2023",
        imageUrl: "https://i.pinimg.com/736x/3a/10/d0/3a10d02fae10b83f550b0287293c183c.jpg",
        description: "Обзор последних трендов в оформлении окон с помощью современных жалюзи и рулонных штор."
    },
    {
        title: "Как выбрать жалюзи для офиса",
        imageUrl: "https://i.pinimg.com/736x/61/57/cf/6157cf5f308c143ffe8463a1432ea646.jpg",
        description: "Практические советы по подбору оптимальных решений для рабочих пространств."
    },
    {
        title: "Автоматизация штор - будущее уже здесь",
        imageUrl: "https://i.pinimg.com/736x/91/0d/35/910d35c5525dddb61286b9ffa672d416.jpg",
        description: "Технологии умного дома для управления естественным освещением в помещениях."
    },
    {
        title: "Материалы для жалюзи: что выбрать?",
        imageUrl: "https://i.pinimg.com/736x/ee/62/39/ee62399d0eede62bd150dda34f61b1e0.jpg",
        description: "Сравнение различных материалов по долговечности, практичности и эстетике."
    },
    {
        title: "Новые тенденции в дизайне жалюзи 2023",
        imageUrl: "https://i.pinimg.com/736x/3a/10/d0/3a10d02fae10b83f550b0287293c183c.jpg",
        description: "Обзор последних трендов в оформлении окон с помощью современных жалюзи и рулонных штор."
    },
    {
        title: "Как выбрать жалюзи для офиса",
        imageUrl: "https://i.pinimg.com/736x/61/57/cf/6157cf5f308c143ffe8463a1432ea646.jpg",
        description: "Практические советы по подбору оптимальных решений для рабочих пространств."
    },
    {
        title: "Автоматизация штор - будущее уже здесь",
        imageUrl: "https://i.pinimg.com/736x/91/0d/35/910d35c5525dddb61286b9ffa672d416.jpg",
        description: "Технологии умного дома для управления естественным освещением в помещениях."
    },
    {
        title: "Материалы для жалюзи: что выбрать?",
        imageUrl: "https://i.pinimg.com/736x/ee/62/39/ee62399d0eede62bd150dda34f61b1e0.jpg",
        description: "Сравнение различных материалов по долговечности, практичности и эстетике."
    }
];

export const News = () => {
    return (
        <div className="news">
            <div className="news__container">
                <StarAnimation/>
                <h2 className="news__header">СТАТЬИ И НОВОСТИ</h2>
                <p className='news__text'>Всё о жалюзи и рулонных шторах: тренды, технологии, советы и примеры решений для бизнеса и дома</p>
                <div className="news__grid">
                    {newsData.map((news, index) => (
                        <NewsBigCard
                            key={index}
                            title={news.title}
                            imageUrl={news.imageUrl}
                            description={news.description}
                        />
                    ))}
                </div>
            </div>
           <CatalogPromoBlock/>
            <Footer />
        </div>
    );
};

export default News;