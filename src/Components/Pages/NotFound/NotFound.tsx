import './NotFound.css';
import { useNavigate } from 'react-router';
import {Button} from "@/Components/UI/Button/Button";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <div className="not-found__content">
                <div className="not-found__error-code">404</div>
                <h1 className="not-found__title">Oops! Страница не найдена</h1>
                <p className="not-found__description">
                    Кажется, мы не можем найти страницу, которую вы ищете.
                </p>
                <Button
                    onClick={() => navigate('/')}
                    text="Вернуться на главную"
                    color="custom"
                    className="measurer-button"
                    />

            </div>
        </div>
    );
};

export default NotFound;