import { Button } from '@/Components/UI/Button/Button';
import "./MeasurementSection.css"
interface MeasurementSectionProps {
  title?: string;
  description?: string;
  leftBackground?: string;
  rightImage?: string;
  buttonProps?: {
    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: 'solid' | 'outline' | 'ghost' | 'link';
    color?: 'primary' | 'secondary' | 'danger' | 'success' | 'custom';
    customColor?: string;
  };
}

export const MeasurementSection = ({
  title = "Замерка окон нашими специалистами гарантирует, что ваши шторы \"встанут как надо\"",
  description = "Наши замерщики учитывают все особенности ваших окон, чтобы шторы идеально легли и выглядели безупречно. Точный замер — залог идеальной посадки штор и стильного интерьера.",
  leftBackground = "/landing/bg-two.png",
  rightImage = "/landing/zamer.png",
  buttonProps = {
    text: "вызвать замерщика бесплатно",
    icon: <img src="/header/call.svg" alt="Каталог" />,
    variant: "solid" as const,
    color: "secondary" as const,
    customColor: "#FFFFFF",
  },
}: MeasurementSectionProps) => {
  return (
    <div className="measurement-container">
      <div className="content-block" style={{ backgroundImage: `url(${leftBackground})` }}>
        <div className="content-overlay">
          <div className="text-content">
            <h2 className='header-white'>{title}</h2>
            <p className='regular-text-white'>{description}</p>
            <Button {...buttonProps} className="cta-button" />
          </div>
        </div>
      </div>
      <div className="image-block" style={{ backgroundImage: `url(${rightImage})` }} />
    </div>
  );
};

export default MeasurementSection;