import { Button } from '@/Components/UI/Button/Button';
import './CatalogPromoBlock.css'

export const CatalogPromoBlock = () => {
  return (
    <div className='catalog-promo-block'>
      <div className="catalog-promo-content">
        <h2 className='catalog-promo-title'>
          НАШУ ПРОДУКЦИЮ ВЫБИРАЮТ УЖЕ БОЛЬШЕ 20-ти ЛЕТ
        </h2>
        <p className='catalog-promo-description'>
          Если вы затрудняетесь с выбором или "заблудились" в нашей продукции, - обратитесь к нашему
          специалисту. Вам бесплатно помогут с выбором.
        </p>

        <div className="catalog-promo-buttons">
          <Button
            text="Перейти в полную версию каталога"
            icon={<img src="/header/dots.svg" alt="Каталог"/>}
            variant="solid"
            color="custom"
            customColor="#FFFFFF"
            className="catalog-button"
          />

          <Button
            text="Вызвать замерщика"
            icon={<img src="/landing/ruler.svg" alt="Замерщик"/>}
            variant="outline"
            color="custom"
            customColor="#FFFFFF"
            className="measurer-button"
          />

          <Button
            icon={<img src="/landing/call-white.svg" alt="Позвонить"/>}
            variant="outline"
            color="custom"
            customColor="#FFFFFF"
            className="call-button"
          />
        </div>
      </div>
    </div>
  );
};