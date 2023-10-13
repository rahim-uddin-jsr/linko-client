import { Outlet } from "react-router-dom";
import { Footer } from "../../shared/Footer";
import Navigation from "../../shared/Navigation";

export const Main = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Outlet />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
