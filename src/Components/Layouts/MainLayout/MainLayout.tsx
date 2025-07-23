import './MainLayout.css';
import { Outlet } from 'react-router-dom';
import { Header } from '@/Components/Widgets/Header/Header'

export const MainLayout = () => {
    return (
        <div className="main-layout">
            <Header />
            <main className="main-layout__content">
                <Outlet />
            </main>

        </div>
    );
};

export default MainLayout;