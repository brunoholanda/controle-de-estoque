import styles from './Inicio.module.scss';
import React from 'react'
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Botao from 'components/Botao';

function Inicio() {

    const { signout } = useAuth();
    const navigate = useNavigate();

    return (
        <section>
            <div>
                <h1>ESTOQUE DA LOJA</h1>
                <Botao
                    Text="Sair" onClick={() => [signout(), navigate("/")]}
                >
                    Sair
                </Botao>
            </div>
        </section>
    )
}

export default Inicio