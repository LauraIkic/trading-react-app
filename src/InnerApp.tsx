import React, {useEffect, useState} from "react";
import {SignupForm} from "./form/SignupForm";
import {CoinList} from "./components/CoinInfo/CoinList";

function InnerApp() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    if (!token) {
        return (
            <div>
                <h2>Bitte einloggen</h2>
                <SignupForm/>
                {/*<SignupForm onSuccess={(newToken) => {*/}
                {/*    localStorage.setItem('token', newToken);*/}
                {/*    setToken(newToken);*/}
                {/*}} />*/}
            </div>
        );
    }

    return (
        <div>
            <CoinList />
        </div>
    );
}


export default InnerApp;