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
      {/* <section className="landing__back">
        <div className="hero__bottom-block" onClick={() => navigate('/catalog')}>
          <img
            src="/landing/arrow.svg"
            alt="Стрелка для полробной информции"
            className="bottom-block__arrow"
          />
          <h1 className="bottom-block__title">
            Жалюзи и рулонные шторы в Ижевске от производителя
          </h1>
        </div>
      </section> */}
      <section className="landing__back">
        <img
          src="/landing/back.webp"
          srcSet="/landing/back-700.jpg 700w, /landing/back.webp 1200w"
          sizes="100vw"
          alt="Фон секции с жалюзи и шторами в Ижевске"
          className="landing__back-image"
          fetchPriority="high"
          decoding="async"
        />

        <div
          className="hero__bottom-block"
          onClick={() => navigate("/catalog")}
        >
          <img
            src="/landing/arrow.svg"
            alt="Стрелка для подробной информации"
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
            КАТАЛОГ ПРОДУКЦИИ: ЖАЛЮЗИ И РУЛОННЫЕ ШТОРЫ
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
          rightImage="/landing/zamer.webp"
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
        <h2 className="section-title">КАК СДЕЛАТЬ ЗАМЕРЫ САМОМУ?</h2>
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
