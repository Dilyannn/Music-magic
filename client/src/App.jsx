import { Routes, Route, Link } from 'react-router';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="container mx-auto p-8">
        <Routes>
          <Route path="/" element={<div className="text-center text-2xl mt-10">Welcome to Music Magic</div>} />
          <Route path="/catalog" element={<div className="text-center text-2xl mt-10">Catalog</div>} />
          <Route path="/catalog/:id" element={<div className="text-center text-2xl mt-10">Details</div>} />
          <Route path="/create" element={<div className="text-center text-2xl mt-10">Create Record</div>} />
          <Route path="/edit/:id" element={<div className="text-center text-2xl mt-10">Edit Record</div>} />
          <Route path="/about" element={<div className="text-center text-2xl mt-10">About Us</div>} />
          <Route path="/contact" element={<div className="text-center text-2xl mt-10">Contact Us</div>} />
          <Route path="/login" element={
            <div className="text-center mt-10">
              <h2 className="text-2xl mb-4">Login Page</h2>
              <p>Don't have an account? <Link to="/register" className="text-purple-500 hover:underline">Register here</Link></p>
            </div>
          } />
          <Route path="/register" element={<div className="text-center text-2xl mt-10">Register Page</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;