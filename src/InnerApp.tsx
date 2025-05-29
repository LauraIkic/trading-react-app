import React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {myTheme} from "./theme/theme";
import {SignupForm} from "./form/SignupForm";
import {CoinList} from "./components/CoinInfo/CoinList";
import {Dashboard} from "./components/Dashboard";
import './AppNav.css';

function InnerApp() {
    return (
        <ThemeProvider theme={myTheme}>
            <BrowserRouter>
                <nav className="app-nav">
                    <div className="nav-logo">
                        <Link to="/">CRYPT</Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/" style={{marginRight: myTheme.spacing(2)}}>Home</Link>
                        <Link to="/coins">Coins</Link>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/coins" element={<CoinList/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default InnerApp;