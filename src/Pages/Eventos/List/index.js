import React, {useEffect, useState} from "react";
import EventCard from "../../../components/Eventos/EventCard";
import {api} from "../../../services/api.js"


export default function EventsList() {
    const [events, setEvents] = useState([]);

    const [editingEventId, setEditingEventId] = useState(null);
    const [isEditingImage, setIsEditingImage] = useState(false); // Novo estado para controlar a edição da imagem

    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [eventToDeleteId, setEventToDeleteId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        labelDate: "",
        address: "",
        date: "",
        isRequiredSubscription: false,
        maxRegistered: 0,
        isHighlighted: false,
        imgId: "", // Adicione o campo para armazenar o ID da imagem
        videoUrl: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null); // Novo estado para armazenar o arquivo de imagem

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleEditImage = () => {
        setIsEditingImage(true);
    };

    const handleOpenModal = (eventId = null) => {
        setEditingEventId(eventId);
        setIsModalOpen(true);
        // Se um ID for fornecido, preencha o formulário com os detalhes do evento para edição
        if (eventId) {
            const eventToEdit = events.find((event) => event.id === eventId);
            setFormData({
                title: eventToEdit.title || "",
                content: eventToEdit.content || "",
                labelDate: eventToEdit.labelDate || "",
                address: eventToEdit.address || "",
                date: eventToEdit.date || "",
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
            // Send a POST request to create a new event
            await api.post("/event", newEvent);

            // Fetch the updated list of events
            handleGetEvents();

            // Close the modal
            handleCloseModal();
        } catch (error) {
            console.error("Error adding event:", error);
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

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleDeleteEvent = (eventId) => {
        setEventToDeleteId(eventId);
        setIsDeleteConfirmationOpen(true);
    };

    const confirmDeleteEvent = async () => {
        try {
            // Send a DELETE request to delete the event
            await api.delete(`/event/${eventToDeleteId}`);

            // Fetch the updated list of events
            handleGetEvents();

            // Close the deletion confirmation modal
            setIsDeleteConfirmationOpen(false);
        } catch (error) {
            console.error(`Error deleting event with ID ${eventToDeleteId}:`, error);
        }
    };

    const cancelDeleteEvent = () => {
        // Close the deletion confirmation modal without deleting the event
        setIsDeleteConfirmationOpen(false);
    };


    const handleUpdateEvent = async (eventId, updatedEvent) => {
        try {
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
                isRequiredSubscription: false,
                maxRegistered: 0,
                isHighlighted: false,
                imgId: "",
                videoUrl: "",
            });
            setEditingEventId(null);
            setIsEditingImage(false);
            handleCloseModal();
        } catch (error) {
            console.error(`Error updating event with ID ${eventId}:`, error);
        }
    };


    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    backgroundColor: "#000",
                }}
            >
                <button className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleOpenModal()}>Adicionar Evento
                </button>
            </div>

            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "10px", backgroundColor: "#000", height: "100vh",
            }}>
                {events.map((event) => (
                    <div key={event.id}>
                        <EventCard  title={event.title}
                                    content={event.content}
                                    labelDate={event.labelDate}
                                    address={event.address}
                                    date={event.date}
                                    isRequiredSubscription={event.isRequiredSubscription}
                                    maxRegistered={event.maxRegistered}
                                    isHighlighted={event.isHighlighted}
                                    img={event.img}
                                    videoUrl={event.videoUrl}
                                    onEdit={() => handleOpenModal(event.id)}
                                    onDelete={() => handleDeleteEvent(event.id)} />
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
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
                        style={{background: "#fff", padding: "20px", borderRadius: "8px"}}
                    >

                        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
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
                                        name="labelDate" value={formData.labelDate} onChange={handleChange}></input>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password">
                                        Descricao do Evento
                                    </label>
                                    <textarea name="content" value={formData.content} onChange={handleChange} required/>
                                    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd
                                        like</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                                {editingEventId && (
                                    <button onClick={handleEditImage}>
                                        Editar Imagem
                                    </button>
                                )}

                                {(!editingEventId || isEditingImage) && (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                )}

                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-city">
                                        URL do Vídeo
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-city" type="text" name="videoUrl" value={formData.videoUrl}
                                        onChange={handleChange}></input>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-state">
                                        Data do Evento
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-city" type="text" placeholder="02/10/2023" name="date"
                                        value={formData.date} onChange={handleChange}></input>
                                </div>
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                           for="grid-zip">
                                        É necessário se inscrever para participar
                                    </label>
                                    <input id="grid-zip"
                                           type="checkbox"
                                           name="isRequiredSubscription"
                                           checked={formData.isRequiredSubscription}
                                           onChange={handleChange}></input> Sim
                                </div>

                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                           for="grid-zip">
                                        Evento em Destaque
                                    </label>
                                    <input id="grid-zip"
                                           type="checkbox"
                                           name="isHighlighted"
                                           checked={formData.isHighlighted}
                                           onChange={handleChange}></input> Sim
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-city">
                                        Máximo de Participantes
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-city" type="number" name="maxRegistered"
                                        value={formData.maxRegistered}
                                        onChange={handleChange}></input>
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
                <div className="flex justify-center items-center h-screen">
                    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5 text-center">
                                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Tem certeza que deseja excluir permanentemente este evento?</h3>
                                    <button onClick={confirmDeleteEvent} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                        Sim, excluir
                                    </button>
                                    <button onClick={cancelDeleteEvent} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Não, Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
