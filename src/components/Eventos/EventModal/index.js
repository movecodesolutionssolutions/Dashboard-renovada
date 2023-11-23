// components/EventModal.js
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import {toast} from "react-toastify";
import userImg from "../../../images/eventos/user.png";
import {api} from "../../../services/api.js";

const ModalContainer = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  outline: none;
  width: 85%;
  height: 90%;

  body.ReactModal__Body--open {
    overflow: hidden;
  }

  .ReactModal__Overlay.ReactModal__Overlay--after-open {
    background-color: rgba(0, 0, 0, 0.5); /* Substitua pela cor desejada */
  }
`;

const EventTitle = styled.h2`
  margin-bottom: 8px;
`;

const EventDate = styled.p`
  font-style: italic;
  margin-bottom: 8px;
`;

const EventAddress = styled.p`
  margin-bottom: 8px;
`;

const EventDescription = styled.p``;

const CloseButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: #3498db;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EventModal = ({
                        isOpen,
                        onRequestClose,
                        title,
                        videoUrl,
                        EventId,
                        labelDate,
                        subscribers,
                        address,
                        description,
                        users,
                        img,
                        isRequiredSubscription
                    }) => {
    // Função para extrair o ID do vídeo do formato de URL do YouTube
    const extractYouTubeVideoId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match && match[1] ? match[1] : null;
    };
    const [usersAll, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const toastOptions = {
        autoClose: 4000,
        position: toast.POSITION.TOP_CENTER,
    };

    // Extrair o ID do vídeo
    const videoId = videoUrl ? extractYouTubeVideoId(videoUrl) : null;

    useEffect(() => {
        // Fetch the list of users when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await api.get("/user");
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubscribe = async (EventId) => {
        try {
            if (selectedUserId && EventId) {
                // Send a POST request to subscribe the user to the event
                await api.post(`/event/add-subscriber/${selectedUserId}/${EventId}`);

                // Fetch the updated list of events
                // handleGetEvents();

                // Reset the selected user
                setSelectedUserId(null);

                // Close the modal
                // handleCloseModal();
                toast.success("Participante adicionado com sucesso", toastOptions);

            } else {
                // Handle the case where the user or event ID is not selected
                toast.error("Participante não selecionado", toastOptions);
            }
        } catch (error) {
            toast.error("Não foi possível adicionar participante", toastOptions);
        }
    };

    return (
        <ModalContainer
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Event Details"
        >
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
                        <p className="text-sm text-white flex items-center">
                            {isRequiredSubscription ? (
                                <>
                                    <svg className="text-white fill-current text-gray-500 w-3 h-3 mr-2"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path
                                            d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/>
                                    </svg>
                                    É necessário inscrição
                                </>
                            ) : (
                                <>
                                    <svg className="text-white fill-current text-gray-500 w-3 h-3 mr-2"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                        </svg>

                                    </svg>
                                    Não é necessário inscrições
                                </>
                            )}
                        </p>
                        <EventTitle className="text-white font-bold text-xl mb-2">{title}</EventTitle>
                        <EventDescription className="text-white text-base">{description}</EventDescription>
                        {videoUrl ? (
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
                                            <h3 className="text-sm font-medium text-white">Nenhum vídeo cadastrado para
                                                esse evento</h3>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <h3 className="mt-5 text-2xl font-extrabold text-white">
                            Usuários Cadastrados no Evento</h3>
                        {subscribers.map(subscriber => (
                            <div className="mt-3 rounded divide-y bg-gray-200 divide-gray-700 text-base w-full">
                                <li key={subscriber.id} className="pb-3 sm:pb-4 w-full">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full"
                                                 src={userImg} alt="user_image"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-whit truncate dark:text-white">
                                                {subscriber.user.name}
                                            </p>
                                            <p className="text-sm text-whit truncate dark:text-gray-400">
                                                {subscriber.user.email}
                                            </p>
                                        </div>
                                        <div
                                            className="inline-flex mr-5 items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {subscriber.user.phone}
                                        </div>
                                    </div>
                                </li>
                            </div>
                        ))}
                        {subscribers.length === 0 && (
                            <div className="rounded-md bg-blue-200 p-4 mt-5 mb-5">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-white-700">Nenhum participante cadastrado para esse evento</h3>
                                    </div>
                                </div>
                            </div>
                        )}

                            <div className="sm:col-span-3 mt-5">
                                <label
                                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                                    htmlFor="grid-city">
                                    Adicionar Participante
                                </label>
                                <select
                                    id="selectedUserId"
                                    name="selectedUserId"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                               ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                               focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setSelectedUserId(e.target.value)}
                                    value={selectedUserId || ""}
                                    required
                                >
                                    <option value="" disabled hidden>Escolha um participante</option>
                                    {usersAll.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} - {user.email}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                            className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={() => handleSubscribe(EventId)}
                    >
                        Inscrever Participante
                    </button>
                </div>
                <div className="flex items-center  ">
                    <div className="text-sm bg-gray-200 rounded">
                    <span
                        className="inline-block bg-gray-200 rounded w-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
              {labelDate}
            </span>
                        <span
                            className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {address}
            </span>
                    </div>
                </div>
            </div>
        </div>
</ModalContainer>
)
    ;
};

export default EventModal;
