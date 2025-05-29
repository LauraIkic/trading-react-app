import { useState } from 'react';
import {useCreateUser} from "../mutation/useCreateUser";

export const SignupForm = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useCreateUser();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            name,
            mail,
            password
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input value={mail} onChange={(e) => setMail(e.target.value)} placeholder="E-Mail" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Passwort" />
            <button type="submit" disabled={mutation.isPending}>Signup</button>
            {mutation.isError && <p>Fehler: {(mutation.error as Error).message}</p>}
            {mutation.isSuccess && <p>Signup erfolgreich!</p>}
        </form>
    );
};
