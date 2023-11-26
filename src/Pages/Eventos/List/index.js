import React, {useEffect, useState} from "react";
import EventCard from "../../../components/Eventos/EventCard";
import { toast } from "react-toastify";
import {api} from "../../../services/api.js"
import Spinner from "../../../components/Spiner";


export default function EventsList() {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);

    const [editingEventId, setEditingEventId] = useState(null);
    const [isEditingImage, setIsEditingImage] = useState(false); // Novo estado para controlar a edição da imagem

    const [loading, setLoading] = useState(false);

    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [eventToDeleteId, setEventToDeleteId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        labelDate: "",
        address: "",
        date: "",
        price: 0,
        isRequiredSubscription: false,
        maxRegistered: 0,
        isHighlighted: false,
        imgId: "", // Adicione o campo para armazenar o ID da imagem
        videoUrl: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null); // Novo estado para armazenar o arquivo de imagem

    const toastOptions = {
        autoClose: 4000,
        position: toast.POSITION.TOP_CENTER,
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleEditImage = () => {
        setIsEditingImage(true);
    };

    const handleOpenModal = (eventId = null) => {
        setEditingEventId(eventId);
        setIsModalOpen(true);

        if (eventId) {
            const eventToEdit = events.find((event) => event.id === eventId);

            // Formata a data para o formato "DD/MM/YYYY"
            const formattedDate = new Date(eventToEdit.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

            setFormData({
                title: eventToEdit.title || "",
                content: eventToEdit.content || "",
                labelDate: eventToEdit.labelDate || "",
                address: eventToEdit.address || "",
                price: eventToEdit.price || 0,
                date: formattedDate, // Utiliza a data formatada
                isRequiredSubscription: eventToEdit.isRequiredSubscription || false,
                maxRegistered: eventToEdit.maxRegistered || 0,
                isHighlighted: eventToEdit.isHighlighted || false,
                imgId: eventToEdit.imgId || "",
                videoUrl: eventToEdit.videoUrl || "",
            });
        } else {
            // Se nenhum ID for fornecido, limpe o formulário
            setFormData({
                title: "",
                content: "",
                labelDate: "",
                address: "",
                date: "",
                price: 0,
                isRequiredSubscription: false,
                maxRegistered: 0,
                isHighlighted: false,
                imgId: "",
                videoUrl: "",
            });
        }
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleGetEvents = async () => {
        try {
            const response = await api.get("/event");
            setEvents(response.data.events);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        handleGetEvents(); // Fetch events when the component mounts
    }, []);

    const handleAddEvent = async (newEvent) => {
        try {
            setLoading(true);
            handleCloseModal();

            // Send a POST request to create a new event
            await api.post("/event", newEvent);

            // Fetch the updated list of events
            handleGetEvents();

            // Close the modal
            toast.success("Evento cadastrado com sucesso", toastOptions);
        } catch (error) {
            toast.error("Não foi possível adicionar evento", toastOptions);
        }finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let imgId = formData.imgId;

        // Verifica se há um novo arquivo de imagem para enviar
        if (imageFile) {
            const formDataImage = new FormData();
            formDataImage.append("file", imageFile);

            // Faz o upload da imagem
            const responseImage = await api.post("/image/upload", formDataImage);
            imgId = responseImage.data.id;
        }

        const newFormData = new FormData(event.target);
        const newEvent = {
            title: newFormData.get("title"),
            content: newFormData.get("content"),
            labelDate: newFormData.get("labelDate"),
            address: newFormData.get("address"),
            price: parseInt(newFormData.get("price"), 10),
            date: newFormData.get("date"),
            isRequiredSubscription: newFormData.get("isRequiredSubscription") === "true",
            maxRegistered: parseInt(newFormData.get("maxRegistered"), 10),
            isHighlighted: newFormData.get("isHighlighted") === "true",
            imgId: imgId, // Atualiza o campo imgId com o novo ID da imagem
            videoUrl: newFormData.get("videoUrl"),
        };

        try {
            if (editingEventId) {
                // Se existe um ID de edição, envie uma requisição PUT para atualizar o evento
                await handleUpdateEvent(editingEventId, newEvent);
            } else {
                // Caso contrário, envie uma requisição POST para adicionar um novo evento
                await handleAddEvent(newEvent);
            }
        } catch (error) {
            console.error("Error handling form submission:", error);
        }
    };


    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;

        // Verifica se o campo é o campo de data
        if (name === "date") {
            // Aplica a máscara para o formato "00/00/0000"
            const formattedDate = value
                .replace(/\D/g, "") // Remove caracteres não numéricos
                .replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3"); // Adiciona as barras

            setFormData((prevData) => ({
                ...prevData,
                [name]: formattedDate,
            }));
        } else {
            // Para outros campos, mantenha o comportamento existente
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleDeleteEvent = (eventId) => {
        setEventToDeleteId(eventId);
        setIsDeleteConfirmationOpen(true);
    };

    const confirmDeleteEvent = async () => {
        try {
            setLoading(true);
            setIsDeleteConfirmationOpen(false);

            await api.delete(`/event/${eventToDeleteId}`);

            handleGetEvents();
            toast.success("Evento excluído com sucesso", toastOptions);

        } catch (error) {
            toast.error("Não foi possível deletar evento", toastOptions);
        }finally {
            setLoading(false);
        }
    };

    const cancelDeleteEvent = () => {
        // Close the deletion confirmation modal without deleting the event
        setIsDeleteConfirmationOpen(false);
    };


    const handleUpdateEvent = async (eventId, updatedEvent) => {
        try {
            setLoading(true);
            handleCloseModal();

            if (isEditingImage) {
                const formDataImage = new FormData();
                formDataImage.append("file", imageFile);

                const responseImage = await api.post("/image/upload", formDataImage);
                updatedEvent.imgId = responseImage.data.id;

            }
            // Send a PUT request to update the event
            await api.put(`/event/${eventId}`, updatedEvent);

            // Fetch the updated list of events
            await handleGetEvents();

            // Reset the form data and close the modal
            setFormData({
                title: "",
                content: "",
                labelDate: "",
                address: "",
                date: "",
                price: 0,
                isRequiredSubscription: false,
                maxRegistered: 0,
                isHighlighted: false,
                imgId: "",
                videoUrl: "",
            });
            setEditingEventId(null);
            setIsEditingImage(false);
            toast.success("Evento alterado com sucesso", toastOptions);
        } catch (error) {
            toast.error("Erro ao editar evento", toastOptions);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 min-h-screen overflow-y-auto max-h-screen h-full">
            <div
                className="bg-gray-800"
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                {loading && <Spinner />}
                <button className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleOpenModal()}>Adicionar Evento
                </button>
            </div>

            <div className="events-container" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "10px",
            }}>
                {events.map((event) => (
                    <div key={event.id}>
                        <EventCard title={event.title}
                                   content={event.content}
                                   labelDate={event.labelDate}
                                   address={event.address}
                                   date={event.date}
                                   isRequiredSubscription={event.isRequiredSubscription}
                                   maxRegistered={event.maxRegistered}
                                   isHighlighted={event.isHighlighted}
                                   img={event.img}
                                   price={event.price}
                                   videoUrl={event.videoUrl}
                                   eventId = {event.id}
                                   onEdit={() => handleOpenModal(event.id)}
                                   onDelete={() => handleDeleteEvent(event.id)}
                                   subscribers={event.SubscribersEvent} // Pass the subscribers array here
                        />
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 10,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            background: "#fff", padding: "20px", borderRadius: "8px",
                            height: "90%",
                            overflowY: "auto"
                        }}
                    >

                        <form className="w-full max-w-lg" onSubmit={handleSubmit}
                              style={{
                                  background: "#fff", padding: "20px", borderRadius: "8px",
                                  width: "100%",
                                  height: "100%",
                              }}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-first-name">
                                        Nome do Evento
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-first-name" type="text" placeholder="Culto ..." name="title"
                                        value={formData.title} onChange={handleChange} required></input>
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-last-name">
                                        Data e Hora do Evento
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-last-name" type="text" placeholder="Dia 12 de Novembro ás 19h"
                                        name="labelDate" value={formData.labelDate} onChange={handleChange}
                                        required></input>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password">
                                        Descricao do Evento
                                    </label>
                                    <textarea name="content" className="block p-2.5 w-full
                        text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500
                        focus:border-blue-500" value={formData.content} onChange={handleChange} required/>
                                    <p className="text-gray-600 text-xs italic mt-1">Fale sobre o evento..</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-city">
                                        Endereço do Evento
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-city" type="text" placeholder="Rua..." name="address"
                                        value={formData.address} onChange={handleChange}></input>
                                </div>

                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-state">
                                        Data do Evento
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-city" type="text" placeholder="02/10/2023" name="date" maxLength="10"
                                        value={formData.date} onChange={handleChange} required></input>
                                </div>

                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2 mt-5">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-zip">
                                        É necessário se inscrever para participar
                                    </label>
                                    <select
                                        id="isRequiredSubscription"
                                        name="isRequiredSubscription"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
             ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
             focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        required
                                        onChange={handleChange} >
                                        <option value="true" selected={formData.isRequiredSubscription === true}>Sim</option>
                                        <option value="" selected={formData.isRequiredSubscription === false}>Não</option>
                                    </select>
                                </div>

                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-zip">
                                        O Evento deverá ficar em Destaque?
                                    </label>

                                    <select
                                        id="isHighlighted"
                                        name="isHighlighted"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
             ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
             focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        required
                                        onChange={handleChange}
                                    >
                                        <option value="true" selected={formData.isHighlighted === true}>Sim</option>
                                        <option value="" selected={formData.isHighlighted === false}>Não</option>
                                    </select>

                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-2 mt-5">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-city">
                                        Máximo de Participantes
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-city" type="number" min="0" name="maxRegistered"
                                        value={formData.maxRegistered}
                                        onChange={handleChange}></input>
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-city">
                                        Preço da Entrada (Se houver)
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="price" type="number" min="0" name="price" value={formData.price}
                                        onChange={handleChange}></input>
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
                                    id="grid-city" type="text" name="videoUrl" value={formData.videoUrl}
                                    onChange={handleChange}></input>
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

                            <button className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit">
                                {editingEventId ? "Atualizar" : "Cadastrar"}
                            </button>

                            <button className="mt-5" onClick={handleCloseModal}>
                                Fechar
                            </button>
                        </form>

                    </div>
                </div>
            )}

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
                                    certeza que deseja excluir permanentemente este evento?</h3>
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
    );
}
