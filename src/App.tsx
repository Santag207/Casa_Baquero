import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
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

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
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
            <Route path="reservar" element={<ReservePage />} />
            <Route path="recorrido-virtual" element={<VirtualTourPage />} />
            <Route path="galerias" element={<GalleriesPage />} />
          </Route>
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  );
}
