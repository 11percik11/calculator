import "./Landing.css";
import PromoGrid from "@/Components/Widgets/PromoGrid/PromoGrid";
import StarAnimation from "@/Components/UI/StartAnimation/StartAnimation";
import NewsGrid from "@/Components/Widgets/NewsGrid/NewsGrid";
import { BenefitGrid } from "@/Components/Widgets/BenefitGrid/BenefitGrid";
import { CatalogPromoBlock } from "@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock";
import MeasurementSection from "@/Components/Widgets/MeasurementSection/MeasurementSection";
import { FrozeBlock } from "@/Components/Widgets/FrozeBlock/FrozeBlock";
import CatalogPreviewLikeGrid from "@/Components/Widgets/CatalogPreviewLikeGrid/CatalogPreviewLikeGrid";
import { Calculator } from "@/Components/Widgets/Calculator/Calculator";
import { useNavigate } from "react-router";

const benefitsData = [
  {
    imageUrl: "/landing/benefit/left.png",
    title: "Высокое качество",
  },
  {
    imageUrl: "/landing/benefit/center.png",
    title: "Бесплатный замер",
  },
  {
    imageUrl: "/landing/benefit/right.png",
    title: "Быстрая доставка",
  },
];

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="landing__back">
        {/* Блок в левом нижнем углу */}
        <div className="hero__bottom-block" onClick={() => navigate('/catalog')}>
          <img
            src="/landing/arrow.svg"
            alt="Стрелка"
            className="bottom-block__arrow"
          />
          <h1 className="bottom-block__title">
            Жалюзи и рулонные шторы в Ижевске от производителя
          </h1>
        </div>
      </section>
      <section className="second_block">
        <PromoGrid />
      </section>
      <section className="third-block">
        <StarAnimation />
        <div className="third-block-title">
          <h1 className="third-block-title-header">
            каталог продукции: жалюзи и рулонные шторы
          </h1>
          <p className="third-block-title-text">
            Изготовим на заказ за 3 дня. Бесплатный замер, доставка и монтаж по
            Ижевску и Удмуртии.
          </p>
        </div>
        <CatalogPreviewLikeGrid />

        <CatalogPromoBlock />
      </section>
      <section className="calculator_block">
        <Calculator />
      </section>

      <section className="four_block">
        <NewsGrid />
      </section>

      <section className="five-block">
        <MeasurementSection
          title="замерка окон нашими специалистами гарантирует, что ваши шторы “встанут как надо”"
          description="Наши замерщики учитывают все особенности ваших окон, чтобы
                        шторы идеально легли и выглядели безупречно. Точный замер — залог идеальной посадки штор и
                        стильного интерьера."
          rightImage="/landing/zamer.png"
          buttonProps={{
            text: "Заказать звонок специалиста",
            icon: <img src="/header/call.svg" alt="Замер" />,
            color: "custom",
            customColor: "#FFFFFF",
            onClick: () => console.log("Замер заказан"),
          }}
        />
      </section>
      <section className="froze-block">
        <StarAnimation />
        <h2 className="section-title">как сделать замеры самому?</h2>
        <FrozeBlock />
      </section>
      <section className="benefits-section">
        <StarAnimation />
        <h2 className="section-title">Наши преимущества</h2>
        <BenefitGrid benefits={benefitsData} />
      </section>
    </>
  );
};

export default Landing;
