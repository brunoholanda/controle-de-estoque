import styles from './Login.module.scss';

import React, { useState } from 'react'
import CampoTexto from 'components/CampoTexto';
import Botao from 'components/Botao';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const Login = () => {
    const { signin  } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email | !senha) {
            setError("Preencha todos os campos");
            return;
        }
        
        const res = signin(email, senha);

        if (res) {
            setError(res);
            return;
        }

        navigate("/inicio");
    };

    return (
        <section className={styles.login}> 
            <h1>LOGIN</h1>
            <div className={styles.login__formulario}>
                <label>Email*</label>
                <CampoTexto
                    type="email"
                    placeholder="Digite seu E-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                    label="email"
                />
                <label>Senha*</label>
                <CampoTexto
                    type="password"
                    placeholder="Digite sua Senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <label>{error}</label>
                <div className={styles.login__botao}>
                <Botao 
                    Text="Entrar" onClick={handleLogin}
                />
                </div>
                <Link to="/cadastro">
                <p>Faca seu Registro</p>
                </Link>
            </div>
        </section>
    )
}

export default Login