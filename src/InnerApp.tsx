import React, {useState} from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {myTheme} from "./theme/theme";
import {CoinList} from "./components/CoinInfo/CoinList";
import {Dashboard} from "./components/Dashboard";
import {AuthModal} from "./components/Auth/AuthModal";
import {useAuth} from './context/AuthContext';
import './AppNav.css';

function InnerApp() {
    const {user, isLoggedIn, logout, loading} = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <ThemeProvider theme={myTheme}>
            <BrowserRouter>
                <nav className="app-nav">
                    <div className="nav-logo">
                        <Link to="/">CRYPT</Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/" style={{marginRight: myTheme.spacing(2)}}>Home</Link>
                        <Link to="/coins" style={{marginRight: myTheme.spacing(2)}}>Coins</Link>

                        {isLoggedIn && user ? (
                            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <span>Welcome, {user.userName}!</span>
                                <button
                                    className="nav-auth-btn logout"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                className="nav-auth-btn login"
                                onClick={() => setIsAuthModalOpen(true)}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/coins" element={<CoinList/>}/>
                    </Routes>
                </main>

                <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                    onSuccess={() => setIsAuthModalOpen(false)}
                />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default InnerApp;