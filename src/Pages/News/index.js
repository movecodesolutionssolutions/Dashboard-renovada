import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import "./index.css";
import { api } from "../../services/api";
import NewsCard from "./NewsCard";
import formatarData from "../../utils";
import Spinner from "../../components/Spiner";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const News = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedUpdatedAt, setSelectedUpdatedAt] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    handleGetNews();
  }, []);

  const handleGetNews = async () => {
    const response = await api.get("/news");
    setNewsList(response.data.news);
  };

  const openVideoModal = (videoUrl, title, content, updatedAt) => {
    setSelectedVideoUrl(videoUrl);
    setSelectedTitle(title);
    setSelectedContent(content);
    setSelectedUpdatedAt(updatedAt);
    setIsVideoModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToUse });
  };

  const openModalForEdit = (news, index) => {
    const newsToEdit = news;

    setFormData({
      title: newsToEdit.title,
      shortDescription: newsToEdit.shortDescription,
      content: newsToEdit.content,
      videoUrl: newsToEdit.videoUrl,
      imgId: newsToEdit.imgId,
    });
    setIsModalOpen(true);
    setEditedIndex(index);
  };

  const openModalForCard = (news) => {
    setSelectedNews(news);
    setIsVideoModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      title: "",
      shortDescription: "",
      content: "",
      videoUrl: "",
      imgId: "",
    });

    setIsModalOpen(false);
    setEditedIndex(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imgId: file });
    }
  };

  const createEditNews = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      let imgId = formData.imgId;

      try {
        setLoading(true);

        if (formData.imgId instanceof File) {
          const formDataImage = new FormData();
          formDataImage.append("file", formData.imgId);

          const responseImage = await api.post("/image/upload", formDataImage);
          imgId = responseImage.data.id;
        }

        const newsData = {
          title: formData.title,
          shortDescription: formData.shortDescription,
          content: formData.content,
          videoUrl: formData.videoUrl,
          imgId: imgId,
        };

        if (editedIndex !== null) {
          try {
            const response = await api.put(`/news/${editedIndex}`, newsData);
            toast.success("Notícia editada com sucesso!");
          } catch (err) {
            toast.error("Erro ao editar a notícia. Motivo: " + err);
          }
        } else {
          try {
            const response = await api.post("/news", newsData);
            toast.success("Notícia cadastrada com sucesso!");
          } catch (err) {
            toast.error("Erro ao criar a notícia. Motivo: " + err);
          }
        }

        setFormData({
          title: "",
          shortDescription: "",
          content: "",
          videoUrl: "",
          imgId: null,
        });

        setIsModalOpen(false);
        setEditedIndex(null);

        handleGetNews();
      } catch (error) {
        toast.error("Error :", error);
      } finally {
        setLoading(false);
      }
    } else {
      form.reportValidity();
    }
  };

  const handleDelete = async (index) => {
    try {
      setLoading(true);
      await api.delete(`/news/${index}`);
      toast.success("Notícia excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir a notícia. Motivo: " + error);
    } finally {
      handleGetNews();
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen overflow-y-auto max-h-screen">
      <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col items-center">
        <div className="w-full flex justify-between items-center py-4 px-8">
          {loading && <Spinner />}
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

        <div className="w-full max-w-5xl p-8 bg-gray-800 rounded-md overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((news, index) => (
              <NewsCard
                news={news}
                openVideoModal={openVideoModal}
                onEdit={openModalForEdit}
                onDelete={() => handleDelete(news.id)}
                onView={() => openModalForCard(news)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isVideoModalOpen}
        onRequestClose={() => {
          setIsVideoModalOpen(false);
          setSelectedNews(null);
        }}
        className="Modal bg-dark"
        overlayClassName="Overlay-dark"
        style={{
          content: {
            width: "90%",
            height: "90%",
            margin: "auto",
            background: "#1F2937",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="bg-dark p-6 rounded-md text-white">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 transition-colors duration-200"
            onClick={() => {
              setIsVideoModalOpen(false);
              setSelectedNews(null);
            }}
          >
            <span className="sr-only">Fechar</span>
            <IoMdClose className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="mb-6">
            <p>
              <strong className="text-2xl font-bold mb-4">
                {selectedNews ? selectedNews.title : ""}
              </strong>{" "}
            </p>
            <p>
              <strong>Descrição:</strong>{" "}
              {selectedNews ? selectedNews.shortDescription : ""}
            </p>
            <p>
              <strong>Data de Atualização:</strong>{" "}
              {selectedNews ? formatarData(selectedNews.updatedAt) : ""}
            </p>
          </div>

          <div className="mb-6 h-96">
            <iframe
              title="Selected Video"
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${
                selectedNews ? selectedNews.videoUrl.split("v=")[1] : ""
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
        className="Modal bg-dark"
        overlayClassName="Overlay-dark"
        style={{
          content: {
            width: "90%",
            height: "70%",
            margin: "auto",
            background: "#1F2937",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 1)",
            overflow: "hidden",
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="bg-dark p-6 rounded-md text-white">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 transition-colors duration-200"
            onClick={() => {
              setIsModalOpen(false);
              setEditedIndex(null);
            }}
          >
            <span className="sr-only">Fechar</span>
            <IoMdClose className="h-6 w-6" aria-hidden="true" />
          </button>

          <h2 className="text-2xl font-bold mb-4">
            {editedIndex !== null ? "Editar Notícia" : "Cadastrar Notícia"}
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-400"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full bg-gray-800 text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium text-gray-400"
              >
                Descrição Curta
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full bg-gray-800 text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-400"
              >
                Conteúdo
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 border rounded-md w-full bg-gray-800 text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="videoUrl"
                className="block text-sm font-medium text-gray-400"
              >
                URL do Vídeo
              </label>
              <input
                type="text"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full bg-gray-800 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-400"
              >
                Imagem
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="mt-1 p-2 border rounded-md w-full bg-gray-800 text-white"
                accept="image/*"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => createEditNews(e)}
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
