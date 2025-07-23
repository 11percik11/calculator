import './Landing.css';
import PromoGrid from "@/Components/Widgets/PromoGrid/PromoGrid";

const promoItems = [
    {
        imageUrl: 'https://i.pinimg.com/736x/82/bf/85/82bf85965c9c9e165f896ce6d9fb28f1.jpg',
        title: 'Скидка 20% на все'
    },
    {
        imageUrl: 'https://i.pinimg.com/736x/59/dd/41/59dd4185ae65eba59c6458bda6e61352.jpg',
        title: 'Новая коллекция'
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
                <PromoGrid promos={promoItems} />
            </section>
        </div>
    );
};

export default Landing;