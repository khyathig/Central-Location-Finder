import { Routes, Route } from 'react-router-dom';
import React from "react";
import FeedPage from "./pages/FeedPage";
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
            <div>
              <FeedPage />
            </div>
        </>
    );
}

export default App;
