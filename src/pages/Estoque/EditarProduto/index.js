import React, { useState } from "react";
import "./style.css";
import logoImg from "../../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../../services/api";

import Modal from "../../../components/Modal";

export default function NewIncident() {
  const [quantidade, setQuan] = useState("");
  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setmensagemModal] = useState("");
  const history = useHistory();
  const ProdId = localStorage.getItem("idProd");

  async function edt(e) {
    e.preventDefault();

    if (value <= 0) {
      setmensagemModal("O preço deve ser maior que 0");
      setModalVisible(true);
      return
    }
    if (quantidade <= 0) {
      setmensagemModal("a quantidade deve ser maior que 0");
      setModalVisible(true);
      return
    }

    const data = {
      value,
      quantidade,
    };

    try {
      await api.put(`produtos/${ProdId}`, data);

      history.push("/produtos");
    } catch (error) {
      alert("Erro ao editar Produto");
    }
  }

  return (
    <div>
    {modalVisible ? <Modal onClose={() => setModalVisible(false)} title={mensagemModal} /> : null}
    <div className="new-vaga-container">
      <div className="conteiner">
        <section>
          <img src={logoImg} alt="Keep-Flux" />
          <h1>Editar Produto</h1>
          <p>
            Edite o Produto e altere o valor de Preço e quantidade no estoque.
          </p>
          <Link className="back-link" to="/produtos">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={edt}>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Preço do produto"
          />
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuan(e.target.value)}
            placeholder="Quantidade do produto"
          />

          <button className="button" type="submit">
            Editar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
