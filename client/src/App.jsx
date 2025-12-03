import { Routes, Route, Link, Navigate, Outlet } from 'react-router';
import NavBar from './components/common/NavBar';
import Hero from './components/home/Hero';
import LatestHits from './components/home/LatestHits';

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
        <Route path="/catalog" element={<div className="page-container text-center text-2xl mt-10">Catalog</div>} />
        <Route path="/catalog/:id" element={<div className="page-container text-center text-2xl mt-10">Details</div>} />
        <Route path="/create" element={<div className="page-container text-center text-2xl mt-10">Create Record</div>} />
        <Route path="/edit/:id" element={<div className="page-container text-center text-2xl mt-10">Edit Record</div>} />
        <Route path="/about" element={<div className="page-container text-center text-2xl mt-10">About Us</div>} />
        <Route path="/contact" element={<div className="page-container text-center text-2xl mt-10">Contact Us</div>} />
        
        <Route path="/auth" element={<Outlet />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={
            <div className="page-container text-center mt-10">
              <h2 className="text-2xl mb-4">Login Page</h2>
              <p>Don't have an account? <Link to="/auth/register" className="text-purple-500 hover:underline">Register here</Link></p>
            </div>
          } />
          <Route path="register" element={<div className="page-container text-center text-2xl mt-10">Register Page</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;