import styles from './Cadastro.module.scss';

import React, { useState } from 'react'
import CampoTexto from 'components/CampoTexto';
import Botao from 'components/Botao';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

function Cadastro() {

    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { signup  } = useAuth();

    const handleSignup = () => {
        if(!email | !emailConf | !senha) {
            setError("Preencha todos os campos");
            return;
        } else if (email !== emailConf) {
            setError("Os emails nao estão iguais");
            return;
        }

        const res = signup(email, senha);

        if (res) {
            setError(res);
            return;
        }

        alert("Usuário cadastrado com sucesso!");
        navigate("/");
    };

    return (
        <section>
            <div>
                <h1>SISTEMA DE CADASTRO</h1>
                <CampoTexto
                    type="email"
                    placeholder="Digite seu E-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <CampoTexto
                    type="email"
                    placeholder="Confirme seu E-mail"
                    value={emailConf}
                    onChange={(e) => [setEmailConf(e.target.value), setError("")]}
                />
                <CampoTexto
                    type="password"
                    placeholder="Digite sua Senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <label>{error}</label>
                <Botao
                    Text="Cadastrar" onClick={handleSignup}
                />
                <label>Ja tem uma conta?</label>
                <Link to="/">
                    <p>Entre</p>
                </Link>
            </div>
        </section>
    )
}

export default Cadastro;