import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { RoomsListPage } from './pages/RoomsListPage';
import { RoomPage } from './pages/RoomPage';
import { RomanticPage } from './pages/RomanticPage';
import { EventsPage } from './pages/EventsPage';
import { LlanoPage } from './pages/LlanoPage';
import { PetsPage } from './pages/PetsPage';
import { ContactPage } from './pages/ContactPage';
import { ReservePage } from './pages/ReservePage';
import { VirtualTourPage } from './pages/VirtualTourPage';
import { GalleriesPage } from './pages/GalleriesPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { RulesPage } from './pages/RulesPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <CartProvider>
          <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="habitaciones" element={<RoomsListPage />} />
            <Route path="habitaciones/:slug" element={<RoomPage />} />
            <Route path="plan-romantico" element={<RomanticPage />} />
            <Route path="eventos" element={<EventsPage />} />
            <Route path="el-llano" element={<LlanoPage />} />
            <Route path="mascotas" element={<PetsPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="actividades" element={<ActivitiesPage />} />
            <Route path="nosotros" element={<AboutPage />} />
            <Route path="reservar" element={<ReservePage />} />
            <Route path="recorrido-virtual" element={<VirtualTourPage />} />
            <Route path="galerias" element={<GalleriesPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="reglas" element={<RulesPage />} />
          </Route>
        </Routes>
          </CartProvider>
      </BookingProvider>
    </BrowserRouter>
  );
}
