import React, {useEffect, useState} from "react";
import EventCard from "../../../components/Eventos/EventCard";
import { api } from "../../../services/api.js"


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
            isRequiredSubscription: newFormData.get("isRequiredSubscription") === "true",
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


    return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <button className="bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenModal}>Adicionar Evento</button>
      </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "10px" }}>
            {events.map((event) => (
                <EventCard key={event.id} {...event} />
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
              <form onSubmit={handleSubmit}>
                  <label>
                      Title:
                      <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                  </label>

                  <label>
                      Content:
                      <textarea name="content" value={formData.content} onChange={handleChange} required />
                  </label>

                  <label>
                      Label Date:
                      <input type="text" name="labelDate" value={formData.labelDate} onChange={handleChange} />
                  </label>

                  <label>
                      Address:
                      <input type="text" name="address" value={formData.address} onChange={handleChange} />
                  </label>

                  <label>
                      Date:
                      <input type="text" name="date" value={formData.date} onChange={handleChange} />
                  </label>

                  <label>
                      Is Required Subscription:
                      <input
                          type="checkbox"
                          name="isRequiredSubscription"
                          checked={formData.isRequiredSubscription}
                          onChange={handleChange}
                      />
                  </label>

                  <label>
                      Max Registered:
                      <input
                          type="number"
                          name="maxRegistered"
                          value={formData.maxRegistered}
                          onChange={handleChange}
                      />
                  </label>

                  <label>
                      Is Highlighted:
                      <input
                          type="checkbox"
                          name="isHighlighted"
                          checked={formData.isHighlighted}
                          onChange={handleChange}
                      />
                  </label>

                  <label>
                      Image ID:
                      <input type="text" name="imgId" value={formData.imgId} onChange={handleChange} />
                  </label>

                  <label>
                      Video URL:
                      <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
                  </label>

                  <button type="submit">Submit</button>
              </form>
            <button class="mt-5" onClick={handleCloseModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
