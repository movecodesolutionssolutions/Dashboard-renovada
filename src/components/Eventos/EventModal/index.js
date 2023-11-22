// components/EventModal.js
import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Registereds from "../Registereds";

const ModalContainer = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  outline: none;
  width: 80%;
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

const EventModal = ({ isOpen, onRequestClose, title, videoUrl, labelDate, subscribers, address, description, users, img, isRequiredSubscription }) => {
    // Função para extrair o ID do vídeo do formato de URL do YouTube
    const extractYouTubeVideoId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match && match[1] ? match[1] : null;
    };

    // Extrair o ID do vídeo
    const videoId = videoUrl ? extractYouTubeVideoId(videoUrl) : null;

    return (
        <ModalContainer
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Event Details"
        >
            <div className="">
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
                     style={{
                             backgroundColor: "#000"
                         }}>
                    <div className="mb-8">
                        <p className="text-sm text-white flex items-center">
                            {isRequiredSubscription ? (
                                <>
                                    <svg className="text-white fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                    </svg>
                                    É necessário inscrição
                                </>
                            ) : (
                                <>
                                    <svg className="text-white fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
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
                                        <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-white">Nenhum vídeo cadastrado para esse evento</h3>
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
                        <Registereds users={users} />
                        {subscribers && subscribers.length > 0 && (
                            <div className="mt-4 text-white">
                                <h3 className="text-lg font-semibold mb-2">Inscritos no Evento:</h3>
                                <div>
                                    <h3>Subscribers:</h3>
                                    <ul>
                                        {subscribers.map(subscriber => (
                                            <li key={subscriber.id}>{subscriber.user.name} - {subscriber.user.email}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
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
    );
};

export default EventModal;
