import React, { useState } from 'react';
import './AuthModal.css';
import { useLogin } from '../../mutation/useLoginUser';
import { useCreateUser } from '../../mutation/useCreateUser';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        mail: '',
        password: '',
        userName: '',
    });

    const { mutateAsync: loginMutation } = useLogin();
    const { mutateAsync: registerMutation } = useCreateUser();

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (isLogin) {
                await loginMutation({
                    mail: formData.mail,
                    password: formData.password,
                });
            } else {
                await registerMutation({
                    mail: formData.mail,
                    password: formData.password,
                    name: formData.userName,
                });
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Authentication failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{isLogin ? 'Login' : 'Registrierung'}</h2>
                <p className="text-muted">
                    {isLogin
                        ? 'Melde dich an, um Kryptowährungen zu kaufen'
                        : 'Erstelle einen Account'}
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

                <button
                    className="buy-btn"
                    onClick={handleSubmit}
                    disabled={
                        isLoading ||
                        !formData.mail ||
                        !formData.password ||
                        (!isLogin && !formData.userName)
                    }
                >
                    {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Absenden'}
                </button>

                <button className="cancel-btn" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};
