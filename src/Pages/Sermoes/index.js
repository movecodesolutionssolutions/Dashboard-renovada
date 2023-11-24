import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import {api} from "../../../src/services/api.js";
import styled from "styled-components";
import WorshipImage from "../../images/eventos/worship.jpeg";

Modal.setAppElement('#root'); // Configuração necessária para o react-modal

const TruncatedTextContainer = styled.div`
  height: 100px; /* Defina a altura fixa desejada */
  overflow: hidden;
  text-align: justify;
`;

const CardImage = styled.img`
  width: 100%; /* Ajusta a largura para ocupar 100% do contêiner */
  height: 200px; /* Define uma altura fixa para a imagem */
  object-fit: cover; /* Mantém a proporção da imagem e cobre o contêiner */
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Define a largura mínima e máxima para as colunas */
  justify-content: center; /* Centraliza os cards horizontalmente */
  align-items: center; /* Centraliza os cards verticalmente */
`;

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  margin-bottom: 30px;
  width: 300px;
  height: 630px; /* Defina a altura fixa para os cards */
`;
export default function SermonForm() {
    const [sermonData, setSermonData] = useState({
        title: "",
        content: "",
        author: "",
        type: "",
        videoUrl: "",
        imgId: "",
        categoryId: "",
    });

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [sermons, setSermons] = useState([]);
    const [editingSermonId, setEditingSermonId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Limpar os campos do formulário quando o modal for fechado
        setSermonData({
            title: "",
            content: "",
            author: "",
            type: "",
            videoUrl: "",
            imgId: "",
            categoryId: "",
        });
        setEditingSermonId(null);
    };
    const fetchAuthors = async () => {
        try {
            const response = await api.get("/wordSermon/authors");
            setAuthors(response.data.authors);
        } catch (error) {
            console.error("Erro ao buscar autores:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get("/wordSermon/categories");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const fetchSermons = async () => {
        try {
            const response = await api.get("/wordSermon");
            setSermons(response.data.wordSermons);
            console.log(response);
        } catch (error) {
            console.error("Erro ao buscar sermões:", error);
        }
    };

    useEffect(() => {
        fetchAuthors();
        fetchCategories();
        fetchSermons();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSermonData({...sermonData, [name]: value});
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const displayImage = '';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("file", imageFile);

            const imageResponse = await api.post("/image/upload", formData);
            sermonData.imgId = imageResponse.data.id;

            if (editingSermonId) {
                // Se estiver editando, use o método PUT
                await api.put(`/wordSermon/${editingSermonId}`, sermonData);
                console.log("Sermão atualizado com sucesso!");
            } else {
                // Se não estiver editando, use o método POST
                await api.post("/wordSermon", sermonData);
                console.log("Sermão cadastrado com sucesso!");
            }

            // Após cadastrar ou atualizar, buscar novamente os sermões para atualizar a lista
            await fetchSermons();

            // Limpar os campos do formulário
            setSermonData({
                title: "",
                content: "",
                author: "",
                type: "",
                videoUrl: "",
                imgId: "",
                categoryId: "",
            });

            // Limpar o ID de edição
            setEditingSermonId(null);
        } catch (error) {
            console.error("Erro ao cadastrar/atualizar sermão:", error);
        }
    };

    const handleEdit = (sermon) => {
        // Preencher os campos do formulário com os dados do sermão a ser editado
        setSermonData(sermon);
        setEditingSermonId(sermon.id);
    };

    const handleDelete = async (sermonId) => {
        try {
            await api.delete(`/wordSermon/${sermonId}`);
            console.log("Sermão deletado com sucesso!");

            // After deleting, fetch sermons again to update the list
            await fetchSermons();
        } catch (error) {
            console.error("Erro ao deletar sermão:", error);
        }
    };


    return (
        <div  style={{
            backgroundColor: "#000"
        }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    backgroundColor: "#000"
                }}
            >
                <button className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal()}>Adicionar Sermao
                </button>
            </div>
            {sermons && (
                <CardsContainer>
                    {sermons.map((sermon) => (
                        <CardContainer key={sermon.id}>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            {sermon.img ? (
                                <CardImage className="w-full" src={sermon.img.url} alt={sermon.title} />
                            ) : (
                                // Set to null if there's no image
                                <CardImage className="w-full" src={null} alt={sermon.title} />
                            )}                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-gray-500">{sermon.title}</div>
                            </div>
                            <TruncatedTextContainer>
                                <p className="text-gray-700 text-base overflow-hidden line-clamp-3 text-white">{sermon.content}</p>
                            </TruncatedTextContainer>
                            <div className="px-5 pt-4 pb-2">

                        <span
                            className="inline-block bg-gray-200 rounded w-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
              {sermon.author}
            </span>
                                {/*                        <span*/}
                                {/*                            className="inline-block bg-gray-200 rounded w-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">*/}
                                {/*  {address}*/}
                                {/*</span>*/}
                                <div className="pt-2">
                                    <button onClick={() => {
                                        handleEdit(sermon);
                                        openModal();
                                    }}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold m-1 py-2 px-8 rounded"
                                    >
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(sermon.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-1 px-7 rounded"
                                    >
                                        Excluir
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white px-20 font-bold m-1 py-2 rounded"
                                    >
                                        Ver Mais
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContainer>
                    ))}
                </CardsContainer>
            )}

                <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Formulário de Sermão"
                    >
                        <form onSubmit={handleSubmit}>
                            <label>
                                Título:
                                <input
                                    type="text"
                                    name="title"
                                    value={sermonData.title}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Conteúdo:
                                <textarea
                                    name="content"
                                    value={sermonData.content}
                                    onChange={handleInputChange}
                                />
                            </label> <br/>

                            <br/>
                            <label>
                                Autor:
                                <input
                                    type="text"
                                    name="author"
                                    value={sermonData.author}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <br/>
                            <br/>
                            <label>
                                Categoria:
                                <select
                                    name="categoryId"
                                    value={sermonData.categoryId}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br/>
                            <br/>

                            <label>
                                Tipo do Conteúdo:
                                <select
                                    name="type"
                                    value={sermonData.type}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="video">Vídeo</option>
                                    <option value="short">Short</option>
                                </select>
                            </label>
                            <br/> <br/>

                            <label>
                                URL do vídeo:
                                <input
                                    type="text"
                                    name="videoUrl"
                                    value={sermonData.videoUrl}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br/>
                            <div className="sm:col-span-3 mt-5">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Imagem do Evento
                                </label>
                                <div className="mt-2">
                                    <input id="file_input" type="file"
                                           autoComplete="given-name" accept="image/*"
                                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                               ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                               focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                           onChange={handleImageChange}/>
                                </div>
                            </div>
                            <br/>

                            <br/>
                            <button type="submit">Cadastrar Sermão</button>
                        </form>
                    </Modal>

                </div>
            );
            }
