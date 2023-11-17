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

const EventModal = ({ isOpen, onRequestClose, title, videoUrl, labelDate, address, description, users, img, isRequiredSubscription }) => {
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
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                            {isRequiredSubscription ? (
                                <>
                                    <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                    </svg>
                                    É necessário inscrição
                                </>
                            ) : (
                                <>
                                    <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>

                                    </svg>
                                    Não é necessário inscrições
                                </>
                            )}
                        </p>
                        <p>{videoUrl}</p>
                        <EventTitle className="text-gray-900 font-bold text-xl mb-2">{title}</EventTitle>
                        <EventDescription className="text-gray-700 text-base">{description}</EventDescription>
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
                            <p>Nenhum vídeo cadastrado para este evento.</p>
                        )}
                        <Registereds users={users} />

                    </div>
                    <div className="flex items-center">
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none">{labelDate}</p>
                            <p className="text-gray-600">{address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ModalContainer>
    );
};

export default EventModal;
