import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { FaWhmcs } from "react-icons/fa";

import "./style.css";

import logoImg from "../../../assets/logo.png";

import api from "../../../services/api";

export default function Profile() {
  const [produtos, setProdutos] = useState([]);

  const history = useHistory();

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");

  useEffect(() => {
    api
      .get("profile/produto", {
        headers: {
          Authorization: empresaId,
        },
      })
      .then((response) => {
        setProdutos(response.data);
      });
  }, [empresaId]);

  async function handleDeleteProd(id) {
    try {
      await api.delete(`produtos/${id}`, {
        headers: {
          Authorization: empresaId,
        },
      });

      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (erro) {
      alert("Erro ao deletar produto, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  function salvar(id) {
    localStorage.setItem("idProd", id);
  }
  return (
    <div className="profile-container">
     
      <header>
        <img src={logoImg} alt="Keep Flux" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/painel-vendedor">
        Menu
        </Link>
        <Link className="button" to="/produto-novo">
          Cadastrar Novo Produto
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Produtos no Estoque</h1>

      <ul>
        {produtos.map((vaga) => (
          <li key={vaga.id}>
            <strong>NOME DO PRODUTO :</strong>
            <p>{vaga.title}</p>

            <strong>DESCRIÇÃO :</strong>
            <p>{vaga.description}</p>
            <strong>QUANTIDADE :</strong>
            <p>{vaga.quantidade}</p>
            <strong>PREÇO :</strong>
            <p>
              {Intl.NumberFormat("py-BR", {
                style: "currency",
                currency: "BRL",
              }).format(vaga.value)}
            </p>

            <img src={vaga.linkDaImagem} className="imgProd" alt="Keep Flux"/>

            <Link
              to="/produto-editar"
              onClick={() => salvar(vaga.id)}
              className="button2"
              type="button"
            >
              <FaWhmcs size={20} color="#a8a8b3"></FaWhmcs>
            </Link>
            <button onClick={() => handleDeleteProd(vaga.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
