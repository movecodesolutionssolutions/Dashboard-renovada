import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./index.css";
import { api } from "../../services/api";
import { IoMdClose } from "react-icons/io";

Modal.setAppElement("#root");

const News = () => {
  const [formData, setFormData] = useState({
    name: "",
    videoUrl: "",
    date: "",
    isRequiredSubscription: false,
    isHighlighted: false,
    maxRegistered: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    handleGetNews();
  }, []);

  const handleGetNews = async () => {
    const response = await api.get("/news");
    console.log(response);
    setNewsList(response.data.news);
  };

  const openVideoModal = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToUse });
  };

  const openModalForEdit = (index) => {
    setIsModalOpen(true);
    setEditedIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      name: "",
      videoUrl: "",
      date: "",
      isRequiredSubscription: false,
      isHighlighted: false,
      maxRegistered: "",
    });

    setIsModalOpen(false);
    setEditedIndex(null);
  };

  const handleDelete = (index) => {};

  return (
    <div className="bg-gray-800 min-h-screen overflow-y-auto max-h-screen">
      <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col items-center">
        <div className="w-full flex justify-between items-center py-4 px-8">
          <h1 className="text-3xl font-bold">Notícias</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setIsModalOpen(true);
              setEditedIndex(null);
            }}
          >
            Cadastrar Notícia
          </button>
        </div>

        <div className="w-full max-w-7xl p-8 bg-gray-800 rounded-md overflow-y-auto max-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((news, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-md p-4 shadow-md cursor-pointer"
                onClick={() => openVideoModal(news.videoUrl)}
              >
                <h2 className="text-xl font-bold mb-2 text-white">
                  {news.title}
                </h2>
                <p className="text-gray-400 mb-2">{news.updatedAt}</p>
                <p className="text-gray-400 mb-2">{news.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isVideoModalOpen}
        onRequestClose={() => {
          setIsVideoModalOpen(false);
          setSelectedVideoUrl("");
        }}
        className="Modal bg-drak"
        overlayClassName="Overlay-dark"
      >
        <div className="bg-white p-4 rounded-md">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 transition-colors duration-200"
            onClick={() => {
              setIsVideoModalOpen(false);
              setSelectedVideoUrl("");
            }}
          >
            <span className="sr-only">Fechar</span>
            <IoMdClose className="h-6 w-6" aria-hidden="true" />
          </button>

          <h2 className="text-2xl font-bold mb-4">Video</h2>

          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="Selected Video"
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${
                selectedVideoUrl.split("v=")[1]
              }`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setEditedIndex(null);
        }}
        className="Modal"
        overlayClassName="Overlay-dark"
      >
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-2xl font-bold mb-4">
            {editedIndex !== null ? "Editar Notícia" : "Cadastrar Notícia"}
          </h2>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome da Notícia
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
            {/* Adicione mais campos conforme necessário */}
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editedIndex !== null ? "Editar" : "Cadastrar"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default News;
