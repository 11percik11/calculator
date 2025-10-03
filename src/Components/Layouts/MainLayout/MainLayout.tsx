import "./MainLayout.css";
import { Outlet } from "react-router";
import { Header } from "@/Components/Widgets/Header/Header";
import { Footer } from "@/Components/Widgets/Footer/Footer";

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-layout__content">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
