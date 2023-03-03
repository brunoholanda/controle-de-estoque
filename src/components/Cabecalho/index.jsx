import styles from './Cabecalho.module.scss';
import logo from '../../public/img/logo.png';
import lupa from '../../public/icons/lupa.png';
import sino from '../../public/icons/sino.png';

import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Botao from 'components/Botao';
import useAuth from 'hooks/useAuth';

function Cabecalho() {

    const { signout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className={styles.cabecalho}>
            <div className={styles.cabecalho__logo}>
                <Link to="./">
                    <img src={logo} alt="logo da empresa" />
                </Link>
            </div>
            <div className={styles.cabecalho__links}>
                <Link to="./dashboard">
                    Dashboard
                </Link>
                <Link to="./estoque">
                    Estoque
                </Link>
                <Link to="./vendas">
                    Vendas
                </Link>
                <Link to="./usuarios">
                    Usuarios
                </Link>
            </div>
            <div className={styles.cabecalho__notificacao}>
                <img src={lupa} alt="pesquise produtos" title='pesquise produtos' />
                <img src={sino} alt="alertas de estoque" title='alertas de estoque' />
            </div>
            <Botao
                Text="Sair" onClick={() => [signout(), navigate("/")]}
            >
                Sair
            </Botao>
        </header>
    )
}

export default Cabecalho;