import React, { useState } from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {CoinList} from "./components/CoinInfo/CoinList";
import {Dashboard} from "./components/Dashboard";
import {AuthModal} from "./components/Auth/AuthModal";
import './AppNav.css';
import {useAuthStore} from "./stores/useAuthenticationStore";

function InnerApp() {
    const user = useAuthStore();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
            <BrowserRouter>
                <nav className="app-nav">
                    <div className="nav-logo">
                        <Link to="/">CRYPT</Link>
                    </div>
                    <div className="nav-links">
                        {/*<Link to="/" style={{marginRight: myTheme.spacing(2)}}>Home</Link>*/}
                        {/*<Link to="/coins" style={{marginRight: myTheme.spacing(2)}}>Coins</Link>*/}

                        {user.isAuthenticated ? (
                            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                <span>Welcome !</span>
                                <button
                                    className="nav-auth-btn logout"
                                    onClick={() => {}}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                className="nav-auth-btn login"
                                onClick={() => setIsAuthModalOpen(true)}
                            >Login
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
    );
}

export default InnerApp;