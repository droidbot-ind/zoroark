import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const AppLayout: React.FC = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1 animate-fade-in">
      <Outlet />
    </main>
    <Footer />
    <ScrollRestoration />
  </div>
);
