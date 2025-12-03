import { Routes, Route, Link, Navigate, Outlet } from 'react-router';

import NavBar from './components/common/NavBar';
import Hero from './components/home/Hero';
import LatestHits from './components/home/LatestHits';
import Catalog from './components/catalog/Catalog';
import Details from './components/catalog/Details';
import Create from './components/catalog/crudOperations/Create';
import Edit from './components/catalog/crudOperations/Edit';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <LatestHits />
          </>
        } />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/auth" element={<Outlet />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;