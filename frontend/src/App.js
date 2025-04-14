import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FeedPage from './pages/FeedPage';
import EventsPage from './pages/EventsPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    
                    {/* Protected routes */}
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <FeedPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/events"
                        element={
                            <PrivateRoute>
                                <EventsPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
