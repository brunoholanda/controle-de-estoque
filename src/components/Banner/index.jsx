import styles from './Banner.module.scss';
import React from 'react'
import banner from '../../public/img/banner.png';

function Banner() {
  return (
    <section className={styles.banner}>
        <img src={banner} alt="banner da tela de login" />
    </section>
  )
}

export default Banner