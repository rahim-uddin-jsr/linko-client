import { Outlet } from "react-router-dom";
import { Footer } from "../../shared/Footer";
import Navigation from "../../shared/Navigation";

export const Main = () => {
  return (
    <div className="w-screen">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};
