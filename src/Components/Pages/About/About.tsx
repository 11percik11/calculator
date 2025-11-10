import "./About.css";
import { MeasurementSection } from "@/Components/Widgets/MeasurementSection/MeasurementSection";
import { CatalogPromoBlock } from "@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock";
import { GallerySection } from "@/Components/Widgets/GallerySection/GallerySection";
import { getAllWorks } from "@/Api/queries"; // Импортируйте ваш API модуль
import { useEffect, useState } from "react";
import { API_URL } from "@/Api/const"; // Импортируйте API_URL

interface WorkImage {
  id: number;
  image: string;
}

export const About = () => {
  const [workImages, setWorkImages] = useState<WorkImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkImages = async () => {
      try {
        const works = await getAllWorks();
        // Формируем полные URL для изображений
        const worksWithFullUrls = works.map((work) => ({
          ...work,
          image: `${API_URL}${work.image}`,
        }));
        setWorkImages(worksWithFullUrls);
      } catch (error) {
        console.error("Ошибка загрузки изображений работ:", error);
        // Запасной вариант - статические изображения с полными путями
        setWorkImages([
          {
            id: 1,
            image:
              "https://i.pinimg.com/736x/5d/f9/75/5df9755d287b1db01dc7387b1a3a65bd.jpg",
          },
          // ... другие запасные изображения
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkImages();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <>
      <MeasurementSection
        title="Рулонные шторы и жалюзи — наша история длиною в два десятилетия"
        description="Более 20 лет мы создаем уют, комфорт и эстетику пространства благодаря качественным рулонным шторам и элегантным жалюзи. Мы гордимся своей историей, накопленным опытом и безупречной репутацией среди клиентов, которым важно создать гармоничную атмосферу своего дома или офиса.

        Наш многолетний опыт позволяет воплощать самые смелые дизайнерские решения, создавая изделия высочайшего качества. Современная техника, качественные материалы и индивидуальный подход к каждому клиенту делают нашу продукцию уникальной и востребованной.

        Мы ценим ваше доверие и дорожим каждым заказом!"
        rightImage="/landing/about-us.webp"
        buttonProps={{
          text: "Заказать звонок специалиста",
          icon: <img src="/header/call.svg" alt="Замер" />,
          color: "custom",
          customColor: "#FFFFFF",
          onClick: () => console.log("Замер заказан"),
        }}
      />

      <GallerySection
        title="Наши работы"
        description="Проекты, которыми мы гордимся"
        icons={workImages}
      />

      <CatalogPromoBlock />
    </>
  );
};

export default About;
