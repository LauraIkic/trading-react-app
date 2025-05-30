/* filepath: /Users/aylin/FH Projekte/SYSI/SYI-Gruppenprojekt/trading-react-app/src/components/Auth/AuthModal.tsx */
import React, { useState } from 'react';
import './AuthModal.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        mail: '',
        password: '',
        userName: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async () => {
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const payload = isLogin 
                ? { mail: formData.mail, password: formData.password }
                : { mail: formData.mail, password: formData.password, userName: formData.userName };

            const response = await fetch(`http://localhost:5456${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const authData = await response.json();
                localStorage.setItem('authToken', authData.jwt);
                localStorage.setItem('user', JSON.stringify({
                    userName: formData.userName || 'User',
                    email: formData.mail
                }));
                onSuccess(authData);
                onClose();
                alert(isLogin ? 'Login erfolgreich!' : 'Registrierung erfolgreich!');
            } else {
                alert(isLogin ? 'Login fehlgeschlagen' : 'Registrierung fehlgeschlagen');
            }
        } catch (error) {
            console.error('Auth error:', error);
            alert('Verbindungsfehler');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{isLogin ? 'Anmelden' : 'Registrieren'}</h2>
                <p className="text-muted">
                    {isLogin ? 'Melde dich an um Kryptowährungen zu kaufen' : 'Erstelle einen Account'}
                </p>

                {/* Toggle Login/Register */}
                <div className="currency-switch">
                    <button 
                        className={`switch-btn ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Anmelden
                    </button>
                    <button 
                        className={`switch-btn ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Registrieren
                    </button>
                </div>

                {/* Form */}
                <div className="auth-form">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Benutzername"
                            value={formData.userName}
                            onChange={(e) => setFormData({...formData, userName: e.target.value})}
                            className="auth-input"
                        />
                    )}
                    
                    <input
                        type="email"
                        placeholder="E-Mail"
                        value={formData.mail}
                        onChange={(e) => setFormData({...formData, mail: e.target.value})}
                        className="auth-input"
                    />
                    
                    <input
                        type="password"
                        placeholder="Passwort"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="auth-input"
                    />
                </div>

                {/* Buttons */}
                <button className="buy-btn" onClick={handleSubmit}>
                    {isLogin ? 'Anmelden' : 'Registrieren'}
                </button>

                <button className="cancel-btn" onClick={onClose}>
                    Abbrechen
                </button>
            </div>
        </div>
    );
};