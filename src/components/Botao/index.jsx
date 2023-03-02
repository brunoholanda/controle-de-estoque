import React from 'react'

const Botao = ({ Text, onClick, Type = "button" }) => {
  return (
    <div>
        <button
            type={Type}
            onClick={onClick}
        >
            {Text}
        </button>
    </div>
  )
}

export default Botao;