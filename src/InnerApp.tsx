import React, {useEffect, useState} from "react";
import {SignupForm} from "./form/SignupForm";
import {CoinList} from "./components/CoinInfo/CoinList";
import {Dashboard} from "./components/CoinInfo/Dashboard";

function InnerApp() {
    // const [token, setToken] = useState<string | null>(null);
    //
    // useEffect(() => {
    //     const storedToken = localStorage.getItem('token');
    //     setToken(storedToken);
    // }, []);
    //
    // if (!token) {
    //     return (
    //         <div>
    //             <h2>Bitte einloggen</h2>
    //             <SignupForm/>
    //         </div>
    //     );
    // }

    return (
        <div>
            <Dashboard/>
        </div>
    );
}


export default InnerApp;