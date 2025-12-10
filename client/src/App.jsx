import { Routes, Route, Link, Navigate, Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/common/NavBar';
import Hero from './components/home/Hero';
import LatestHits from './components/home/LatestHits';
import Catalog from './components/catalog/Catalog';
import Details from './components/catalog/SongDetails/Details';
import Create from './components/catalog/crudOperations/Create';
import Edit from './components/catalog/crudOperations/Edit';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/About';
import Contact from './components/Contact';
import RouteGuard from './components/guard/RouteGuard';
import NotFound from './components/common/NotFound';
import Footer from './components/common/Footer.jsx';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <LatestHits />
          </>
        } />

        <Route path="/catalog" element={<Outlet />}>
          <Route index element={<Catalog />} />
          <Route path=":id" element={<Details />} />
        </Route>

        <Route element={<RouteGuard />}>
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route element={<RouteGuard guest={true} />}>
          <Route path="/auth" element={<Outlet />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;