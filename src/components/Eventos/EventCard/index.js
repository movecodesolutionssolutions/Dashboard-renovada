import React, {useState} from 'react';
import styled from 'styled-components';

import WorshipImage from '../../../images/eventos/worship.jpeg';
import EventModal from "../EventModal";

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  margin-bottom: 30px;
  width: 300px;
  height: 630px; /* Defina a altura fixa para os cards */
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

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Define a largura mínima e máxima para as colunas */
  justify-content: center; /* Centraliza os cards horizontalmente */
  align-items: center; /* Centraliza os cards verticalmente */
`;

const ViewMoreButton = styled.button`
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

const EventCard = ({
                       title, videoUrl, address, content, img, isRequiredSubscription,
                       labelDate, maxRegistered, price, onEdit,
                       onDelete, subscribers, eventId
                   }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const displayImage = img && img.url ? img.url : WorshipImage;

    return (
        <CardsContainer>
            <CardContainer className="bg-gray-900">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <CardImage className="w-full" src={displayImage} alt={title}/>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-gray-500">{title}</div>
                    </div>
                    <TruncatedTextContainer>
                        <p className="text-gray-700 text-base overflow-hidden line-clamp-3 text-white">{content}</p>
                    </TruncatedTextContainer>
                    <div className="px-5 pt-4 pb-2">

                        <span
                            className="inline-block bg-gray-200 rounded w-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
              {labelDate}
            </span>
                        <span
                            className="inline-block bg-gray-200 rounded w-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {address}
            </span>
                        <div className="pt-2">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold m-1 py-2 px-8 rounded"
                                onClick={() => onEdit()}>
                                Editar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-1 px-7 rounded"
                                onClick={() => onDelete()}>
                                Excluir
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white px-20 font-bold m-1 py-2 rounded"
                                onClick={openModal}>
                                Ver Mais
                            </button>
                        </div>
                    </div>
                </div>
            </CardContainer>

            <EventModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                title={title}
                labelDate={labelDate}
                address={address}
                description={content}
                img={img}
                isRequiredSubscription={isRequiredSubscription}
                videoUrl={videoUrl}
                subscribers = {subscribers}
                EventId={eventId}
            />
        </CardsContainer>
    );
};


export default EventCard;
