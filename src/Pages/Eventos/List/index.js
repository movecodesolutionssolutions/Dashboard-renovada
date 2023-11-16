import React, { useState } from "react";
import EventCard from "../../../components/Eventos/EventCard";
import { api } from "../../../services/api";

const events = [
  {
    title: "Evento 1",
    date: "10 de Novembro, 2023",
    address: "Rua Exemplo, 123",
    description: "Descrição do Evento 1",
  },
  {
    title: "Evento 2",
    date: "15 de Novembro, 2023",
    address: "Avenida Teste, 456",
    description: "Descrição do Evento 2",
  },
  // Adicione mais eventos conforme necessário
];

export default function EventsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listEvents, setListEvents] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddEvent = (newEvent) => {
    // Lógica para adicionar o novo evento à lista de eventos
    // Pode usar setState para atualizar a lista de eventos
    // e também fechar o modal
    // Exemplo: setEvents([...events, newEvent]);
    handleCloseModal();
  };

  const hendleGetEvents = async () => {
    try {
      const response = await api.get("/event");
      setListEvents(response.data); // Atualiza o estado com os eventos da API
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  console.log("Eventos", listEvents.events);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <button onClick={handleOpenModal}>Adicionar Evento</button>
      </div>

      <div style={{ maxHeight: "calc(100vh - 20px)", overflowY: "auto" }}>
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
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
            style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}
          >
            <form class="w-full max-w-lg">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Nome do Evento:
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Nome do Evento"
                  ></input>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Descrição do Evento
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Escreva aqui..."
                  ></textarea>
                </div>
              </div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Endereço do Evento
              </label>
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    City
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="Albuquerque"
                  ></input>
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    State
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>New Mexico</option>
                      <option>Missouri</option>
                      <option>Texas</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-zip"
                  >
                    Zip
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    placeholder="90210"
                  ></input>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0 my-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Data do Evento:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="date"
                  ></input>
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0 my-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Tipo de Evento:
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Selecione</option>
                    <option value="public">Público</option>
                    <option value="private">Privado</option>
                  </select>
                </div>
              </div>
            </form>

            <button class="mt-5" onClick={handleCloseModal}>
              Fechar
            </button>
            <button class="mt-5" onClick={hendleGetEvents}>
              TESTE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
