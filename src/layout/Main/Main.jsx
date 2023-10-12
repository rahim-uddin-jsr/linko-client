import { Outlet } from "react-router-dom";
import { Footer } from "../../shared/Footer";
import Navigation from "../../shared/Navigation";

export const Main = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};
