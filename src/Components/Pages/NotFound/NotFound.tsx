import './NotFound.css';
import { useNavigate } from 'react-router-dom';

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
                <button
                    onClick={() => navigate('/')}
                    className="not-found__button"
                >
                    Вернуться на главную
                </button>
            </div>
        </div>
    );
};

export default NotFound;