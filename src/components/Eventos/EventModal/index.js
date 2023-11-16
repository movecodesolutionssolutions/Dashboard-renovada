// components/EventModal.js
import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import WorshipImage from "../../../images/eventos/worship.jpeg";

const ModalContainer = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  outline: none;
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

const EventModal = ({ isOpen, onRequestClose, title, date, address, description }) => {
    return (
        <ModalContainer
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Event Details"
        >
            <div className="max-w-sm w-full lg:max-w-full lg:flex">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: WorshipImage }} title="Woman holding a mug">
                </div>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            Members only
                        </p>
                        <div className="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?</div>
                        <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
                    </div>
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={WorshipImage} alt="Sunset in the mountains"/>
                            <div class="text-sm">
                                <p class="text-gray-900 leading-none">Jonathan Reinink</p>
                                <p class="text-gray-600">Aug 18</p>
                            </div>
                    </div>
                </div>
            </div>
            {/*<div className="max-w-sm rounded overflow-hidden shadow-lg">*/}
            {/*    <img className="w-full" src={WorshipImage} alt="Sunset in the mountains"/>*/}
            {/*    <div className="px-6 py-4">*/}
            {/*        <div className="font-bold text-xl mb-2">{title}</div>*/}
            {/*        <p className="text-gray-700 text-base">{description}</p>*/}
            {/*    </div>*/}
            {/*    <div className="px-6 pt-4 pb-2">*/}
            {/*                <span*/}
            {/*                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{date}</span>*/}
            {/*        <span*/}
            {/*            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{address}</span>*/}
            {/*    </div>*/}
            {/*    <CloseButton onClick={onRequestClose}>Fechar</CloseButton>*/}

            {/*</div>*/}
        </ModalContainer>
    );
};

export default EventModal;
