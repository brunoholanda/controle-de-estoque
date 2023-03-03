import React, { useState } from "react";
import "./style.css";
import logoImg from "../../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../../services/api";

import Dropzone from "../../../components/DropZone";
import Modal from "../../../components/Modal";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setmensagemModal] = useState("");
  const history = useHistory();
  const empresaId = localStorage.getItem("empresaId");

  async function newVaga(e) {
    e.preventDefault();

    const data = new FormData();

    data.append("title", title);
    data.append("description", description);
    data.append("value", value);
    data.append("quantidade", quantidade);
    data.append("linkDaImagem", selectedFile);

    if (title === null || title === "") {
      setmensagemModal("Preencha o nome do produto");
      setModalVisible(true);
      return;
    }
    if (description === null || description === "") {
      setmensagemModal("Preencha a descrição");
      setModalVisible(true);
      return;
    }
    if (value <= 0) {
      setmensagemModal("O preço deve ser maior que 0");
      setModalVisible(true);
      return;
    }
    if (quantidade <= 0) {
      setmensagemModal("a quantidade deve ser maior que 0");
      setModalVisible(true);

      return;
    }
    if (selectedFile === undefined) {
      setmensagemModal("Adicione uma imagem");
      setModalVisible(true);
      return;
    }

    try {
      await api.post("produtos", data, {
        headers: {
          Authorization: empresaId,
        },
      });

      history.push("/produtos");
    } catch (error) {
      alert("Erro ao cadastrar Produto");
    }
  }

  return (
    <div>
      {modalVisible ? <Modal onClose={() => setModalVisible(false)} title={mensagemModal} /> : null}
      <div className="new-vaga-container">
        <div className="conteiner">
          <section>
            <img src={logoImg} alt="Be The Hero" />
            <h1>Cadastrar Novo Produto</h1>
            <p>
              Descreva o produto detalhadamente para encontrar facilitar para a
              nossa equipe.
            </p>
            <Link className="back-link" to="/produtos">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para Home
            </Link>
          </section>

          <form onSubmit={newVaga} encType="multipart/form-data">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome do produto"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrção"
            />
            <input
              value={value}
              type="number"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Preço do produto"
            />
            <input
              value={quantidade}
              type="number"
              onChange={(e) => setQuantidade(e.target.value)}
              placeholder="Quantidade do produto"
            />
            <Dropzone onFileUploaded={setSelectedFile} />
            <div id="photos-preview"></div>
            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
