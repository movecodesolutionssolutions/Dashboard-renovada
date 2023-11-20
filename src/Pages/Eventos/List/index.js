import React, { useEffect, useState } from "react";
import EventCard from "../../../components/Eventos/EventCard";
import { api } from "../../../services/api.js";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Gather data from the form
    const newFormData = new FormData(event.target);
    const newEvent = {
      title: newFormData.get("title"),
      content: newFormData.get("content"),
      labelDate: newFormData.get("labelDate"),
      address: newFormData.get("address"),
      date: newFormData.get("date"),
      isRequiredSubscription:
        newFormData.get("isRequiredSubscription") === "true",
      maxRegistered: parseInt(newFormData.get("maxRegistered"), 10),
      isHighlighted: newFormData.get("isHighlighted") === "true",
      imgId: newFormData.get("imgId"),
      videoUrl: newFormData.get("videoUrl"),
    };

    // Call the handleAddEvent function with the newEvent data
    handleAddEvent(newEvent);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      // Send a DELETE request to delete the event
      await api.delete(`/event/${eventId}`);

      // Fetch the updated list of events
      handleGetEvents();
    } catch (error) {
      console.error(`Error deleting event with ID ${eventId}:`, error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <button
          className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpenModal}
        >
          Adicionar Evento
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "10px",
        }}
      >
        {events.map((event) => (
          <div key={event.id}>
            <button
              className="bg-red-500 text-blue-50"
              onClick={() => handleDeleteEvent(event.id)}
            >
              Delete
            </button>
            <EventCard {...event} />
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
            style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}
          >
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Nome do Evento
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Culto ..."
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Data e Hora do Evento
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Dia 12 de Novembro ás 19h"
                    name="labelDate"
                    value={formData.labelDate}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Descricao do Evento
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-gray-600 text-xs italic">
                    Make it as long and as crazy as you'd like
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    Endereço do Evento
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="Rua..."
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  ></input>
                </div>

                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    URL do Vídeo
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-state"
                  >
                    Data do Evento
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="02/10/2023"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  ></input>
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-zip"
                  >
                    É necessário se inscrever para participar
                  </label>
                  <input
                    id="grid-zip"
                    type="checkbox"
                    name="isRequiredSubscription"
                    checked={formData.isRequiredSubscription}
                    onChange={handleChange}
                  ></input>{" "}
                  Sim
                </div>

                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-zip"
                  >
                    Evento em Destaque
                  </label>
                  <input
                    id="grid-zip"
                    type="checkbox"
                    name="isHighlighted"
                    checked={formData.isHighlighted}
                    onChange={handleChange}
                  ></input>{" "}
                  Sim
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    Máximo de Participantes
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="number"
                    name="maxRegistered"
                    value={formData.maxRegistered}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <button
                className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Cadastrar
              </button>

              <button className="mt-5" onClick={handleCloseModal}>
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
