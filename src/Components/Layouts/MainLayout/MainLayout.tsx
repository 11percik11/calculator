import './MainLayout.css';
import { Outlet } from 'react-router-dom';
import { Header } from '@/Components/Widgets/Header/Header'
import { Footer } from "@/Components/Widgets/Footer/Footer";

export const MainLayout = () => {
    return (
        <div className="main-layout">
            <Header />
            <main className="main-layout__content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;