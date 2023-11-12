import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import WorshipImage from '../../../images/eventos/worship.jpeg';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 16px;
  padding: 16px;
  width: 300px;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;


const EventModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1000px; /* Defina o tamanho máximo desejado para o modal */
  width: 100%;
  height: 70%;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  outline: none;
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

const EventCard = ({ title, date, address, description }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <CardsContainer>
            <CardContainer>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full" src={WorshipImage} alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{title}</div>
                        <p className="text-gray-700 text-base">{description}</p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{date}</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{address}</span>
                        <button onClick={openModal}>Ver Mais</button>
                    </div>
                </div>
            </CardContainer>

            <EventModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Event Details"
            >
                <div>
                    <EventTitle>{title}</EventTitle>
                    <EventDate>{date}</EventDate>
                    <EventAddress>{address}</EventAddress>
                    <EventDescription>{description}</EventDescription>
                    <button onClick={closeModal}>Fechar</button>
                </div>
            </EventModal>
        </CardsContainer>
    );
};

export default EventCard;
