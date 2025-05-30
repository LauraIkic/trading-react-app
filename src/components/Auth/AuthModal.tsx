/* filepath: /Users/aylin/FH Projekte/SYSI/SYI-Gruppenprojekt/trading-react-app/src/components/Auth/AuthModal.tsx */
import React, { useState } from 'react';
import './AuthModal.css';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Geändert: kein Parameter mehr
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        mail: '',
        password: '',
        userName: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setIsLoading(true);
        
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const payload = isLogin 
                ? { mail: formData.mail, password: formData.password }
                : { mail: formData.mail, password: formData.password, userName: formData.userName };

            console.log('Auth request:', `http://localhost:5456${endpoint}`);
            console.log('Payload:', payload);

            const response = await fetch(`http://localhost:5456${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const authResponseDto = await response.json();
                
                if (authResponseDto.status) {
                    await login(authResponseDto);
                    onSuccess(); // Korrigiert: ohne Parameter
                    onClose();
                    alert(authResponseDto.message || 'Authentication successful!');
                } else {
                    alert(authResponseDto.message || 'Authentication failed');
                }
            } else {
                const errorText = await response.text();
                console.error('Auth error:', errorText);
                alert(isLogin ? 'Login failed' : 'Registration failed');
            }
        } catch (error) {
            console.error('Auth error:', error);
            alert('Connection error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{isLogin ? 'Login' : 'Registrierung'}</h2>
                <p className="text-muted">
                    {isLogin ? 'Melde dich an um Kryptowährungen zu kaufen' : 'Erstelle einen Account'}
                </p>

                <div className="currency-switch">
                    <button 
                        className={`switch-btn ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`switch-btn ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                <div className="auth-form">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.userName}
                            onChange={(e) => handleInputChange('userName', e.target.value)}
                            className="auth-input"
                            required
                        />
                    )}
                    
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.mail}
                        onChange={(e) => handleInputChange('mail', e.target.value)}
                        className="auth-input"
                        required
                    />
                    
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="auth-input"
                        required
                    />
                </div>

                {/* Buttons */}
                <button 
                    className="buy-btn" 
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.mail || !formData.password || (!isLogin && !formData.userName)}
                >
                    {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Absenden')}
                </button>

                <button className="cancel-btn" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};