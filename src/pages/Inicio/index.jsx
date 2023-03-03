import styles from './Inicio.module.scss';
import React from 'react'
import { Outlet } from 'react-router-dom';
import Cabecalho from 'components/Cabecalho';
import Rodape from 'components/Rodape';

function Inicio() {
    return (
        <section>
            <Cabecalho />
            <Outlet />
            <Rodape />
        </section>
    )
}

export default Inicio