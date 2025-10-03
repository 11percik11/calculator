import './Business.css'
import { MeasurementSection } from '@/Components/Widgets/MeasurementSection/MeasurementSection'
import { CatalogPromoBlock } from '@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock';
import { GallerySection } from '@/Components/Widgets/GallerySection/GallerySection';
import { getAllCompanies } from '@/Api/queries'; // Импортируйте ваш API модуль
import { useEffect, useState } from 'react';
import { API_URL } from '@/Api/const'; // Импортируйте API_URL

interface CompanyImage {
  id: number;
  image: string;
}

export const Business = () => {
  const [companyImages, setCompanyImages] = useState<CompanyImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyImages = async () => {
      try {
        const companies = await getAllCompanies();
        // Формируем полные URL для изображений
        const companiesWithFullUrls = companies.map(company => ({
          ...company,
          image: `${API_URL}${company.image}`
        }));
        setCompanyImages(companiesWithFullUrls);
      } catch (error) {
        console.error('Ошибка загрузки изображений компаний:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyImages();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <>
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
        icons={companyImages}
      />
      
      <CatalogPromoBlock/>
    </>
  );
};

export default Business;