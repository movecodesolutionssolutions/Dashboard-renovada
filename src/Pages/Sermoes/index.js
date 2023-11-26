import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import {api} from "../../../src/services/api.js";
import styled from "styled-components";
import {toast} from "react-toastify";
import Spinner from "../../components/Spiner";

Modal.setAppElement('#root'); // Configuração necessária para o react-modal

const TruncatedTextContainer = styled.div`
  height: 100px;
/ overflow: hidden;
  text-align: justify;
`;

const TruncatedTitleContainer = styled.div`
  height: 50px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  margin-bottom: 30px;
  width: 300px;
  height: 580px; /* Defina a altura fixa para os cards */
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

    const [videoId, setVideoId] = useState(null);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [selectedSermonDetails, setSelectedSermonDetails] = useState(null);

    const [loading, setLoading] = useState(false);

    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    const [sermonToDeleteId, setSermonToDeleteId] = useState(null);

    const extractYouTubeVideoId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match && match[1] ? match[1] : null;
    };

    const toastOptions = {
        autoClose: 4000,
        position: toast.POSITION.TOP_CENTER,
    };

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

    const openDetailModal = (sermon) => {
        setSelectedSermonDetails(sermon);

        // Set the videoId in the state
        const sermonVideoId = sermon.videoUrl ? extractYouTubeVideoId(sermon.videoUrl) : null;
        setVideoId(sermonVideoId);

        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setSelectedSermonDetails(null);
        setIsDetailModalOpen(false);
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
            setLoading(true);
            if (editingSermonId) {
                closeModal();
                // Se estiver editando, use o método PUT
                await api.put(`/wordSermon/${editingSermonId}`, sermonData);
                toast.success("Sermão cadastrado com sucesso", toastOptions);

            } else {
                closeModal();
                // Se não estiver editando, use o método POST
                await api.post("/wordSermon", sermonData);
                toast.success("Sermão alterado com sucesso", toastOptions);
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
            toast.error("Não foi possível cadastrar ou alterar sermão", toastOptions);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (sermon) => {
        // Preencher os campos do formulário com os dados do sermão a ser editado
        setSermonData(sermon);
        setEditingSermonId(sermon.id);
    };

    const handleDelete = (sermonId) => {
        setSermonToDeleteId(sermonId);
        setIsDeleteConfirmationOpen(true);
    };

    const confirmDeleteEvent = async () => {
        try {
            setLoading(true);
            setIsDeleteConfirmationOpen(false);

            await api.delete(`/wordSermon/${sermonToDeleteId}`);

            // Fetch the updated list of events
            await fetchSermons();
            toast.success("Sermão excluído com sucesso", toastOptions);

        } catch (error) {
            toast.error("Não foi possível deletar sermão", toastOptions);
        } finally {
            setLoading(false);
        }
    };

    const cancelDeleteEvent = () => {

        setIsDeleteConfirmationOpen(false);
    };

    return (
        <div className="bg-gray-800 min-h-screen overflow-y-auto max-h-screen h-full">
            {loading && <Spinner/>}
            <div className="bg-gray-800"
                 style={{
                     display: "flex",
                     justifyContent: "flex-end",
                 }}
            >
                <button className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal()}>Adicionar Sermao
                </button>
            </div>

                    {sermons && (
                        <CardsContainer>
                            {sermons.map((sermon) => (
                                <CardContainer key={sermon.id} className="bg-gray-900">
                                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                        {sermon.img ? (
                                            <CardImage className="w-full" src={sermon.img.url} alt={sermon.title}/>
                                        ) : (
                                            // Set to null if there's no image
                                            <CardImage className="w-full" src={null} alt={sermon.title}/>
                                        )}
                                        <div className="px-6 py-4">
                                            <TruncatedTitleContainer>

                                                <div
                                                    className="font-bold text-xl mb-2 text-gray-500">{sermon.title}</div>
                                            </TruncatedTitleContainer>

                                        </div>
                                        <TruncatedTextContainer>
                                            <p className="text-gray-700 text-base overflow-hidden line-clamp-3 text-white">{sermon.content}</p>
                                        </TruncatedTextContainer>
                                        <div className="px-5 pt-4 pb-2">

                            <span
                                className="inline-block bg-gray-200 rounded w-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
                                {sermon.author}
                            </span>
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
                                                    onClick={() => openDetailModal(sermon)}
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
                isOpen={isDetailModalOpen}
                onRequestClose={closeDetailModal}
                contentLabel="Detalhes do Sermão"
            >
                {selectedSermonDetails && (
                    <div className="" style={{
                        height: "100%",
                        overflowY: "auto"
                    }}>
                        <div
                            className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
                            style={{
                                backgroundColor: "#000"
                            }}>

                            <div className="mb-8">

                                <div className="text-white font-bold text-xl mb-2">{selectedSermonDetails.title}</div>
                                <div className="text-white text-base">{selectedSermonDetails.content}</div>
                                {selectedSermonDetails.videoUrl ? (

                                    <iframe
                                        width="100%"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <>
                                        <div className="rounded-md bg-blue-200 p-4 mt-5 mb-5">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20"
                                                         fill="currentColor"
                                                         aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                                              clip-rule="evenodd"/>
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-white">Nenhum vídeo
                                                        cadastrado para
                                                        esse sermão</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center  ">
                                <div className="text-sm bg-gray-200 rounded">
                    <span
                        className="inline-block bg-gray-200 rounded w-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
              {selectedSermonDetails.author}
            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </Modal>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Formulário de Sermão"
            >
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="title">
                                Título do Sermão
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name" type="text" placeholder="Sermão ..." name="title"
                                required value={sermonData.title}
                                onChange={handleInputChange}>
                            </input>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="author">
                                Autor do Sermão
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name" type="text" placeholder="Nome do Autor"
                                name="author" value={sermonData.author} onChange={handleInputChange}
                                required></input>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="content">
                                Descricao do Sermão
                            </label>
                            <textarea name="content" className="block p-2.5 w-full
                        text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500
                        focus:border-blue-500" value={sermonData.content} onChange={handleInputChange} required/>
                            <p className="text-gray-600 text-xs italic mt-1">Fale sobre o sermão..</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-zip">
                                Categoria do Sermão
                            </label>
                            <select
                                id="isRequiredSubscription"
                                name="categoryId"
                                autoComplete="country-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
             ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
             focus:ring-blue-600 sm:text-sm sm:leading-6"
                                required
                                value={sermonData.categoryId}
                                onChange={handleInputChange}>
                                <option value="">Selecione uma categoria</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="type">
                                Tipo de Conteúdo
                            </label>

                            <select
                                id="type"
                                name="type"
                                autoComplete="country-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
             ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
             focus:ring-blue-600 sm:text-sm sm:leading-6"
                                required value={sermonData.type} onChange={handleInputChange}
                            >
                                <option value="">Selecione uma categoria</option>
                                <option value="video">Vídeo</option>
                                <option value="short">Short</option>
                            </select>

                        </div>
                    </div>

                    <div className="sm:col-span-3 mt-5">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-city">
                            Link do Vídeo
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city" type="text" name="videoUrl" value={sermonData.videoUrl}
                            onChange={handleInputChange}></input>
                    </div>

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
                    <button className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit">
                        Salvar
                    </button>

                    <button className="m-5" onClick={closeModal}>
                        Fechar
                    </button>
                </form>
            </Modal>

            {isDeleteConfirmationOpen && (
                <div className="flex justify-center items-center h-screen bg-black bg-opacity-50 absolute inset-0">
                    <div
                        className="overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"></div>
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button"
                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Tem
                                    certeza que deseja excluir permanentemente este sermão?</h3>
                                <button onClick={confirmDeleteEvent} data-modal-hide="popup-modal" type="button"
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                    Sim, excluir
                                </button>
                                <button onClick={cancelDeleteEvent} data-modal-hide="popup-modal" type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Não,
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
        ;
}
