import React, { useState, useEffect } from "react";
import { api } from "../../../src/services/api.js";

export default function SermonForm() {
    const [sermonData, setSermonData] = useState({
        title: "",
        content: "",
        author: "",
        type: "",
        videoUrl: "",
        imgId: "", // Alterado para imgId
        categoryId: "",
    });

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [sermons, setSermons] = useState([]); // Novo estado para a lista de sermões

    const fetchAuthors = async () => {
        try {
            const response = await api.get("/wordSermon/authors");
            setAuthors(response.data.authors);
        } catch (error) {
            console.error("Erro ao buscar autores:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get("/wordSermon/categories");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const fetchSermons = async () => {
        try {
            const response = await api.get("/wordSermon");
            setSermons(response.data.wordSermons);
            console.log(response);
        } catch (error) {
            console.error("Erro ao buscar sermões:", error);
        }
    };

    useEffect(() => {
        fetchAuthors();
        fetchCategories();
        fetchSermons();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSermonData({ ...sermonData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("file", imageFile);

            const imageResponse = await api.post("/image/upload", formData);
            sermonData.imgId = imageResponse.data.id;

            await api.post("/wordSermon", sermonData);
            console.log("Sermão cadastrado com sucesso!");

            // Após cadastrar, buscar novamente os sermões para atualizar a lista
            await fetchSermons();

            setSermonData({
                title: "",
                content: "",
                author: "",
                type: "",
                videoUrl: "",
                imgId: "",
                categoryId: "",
            });
        } catch (error) {
            console.error("Erro ao cadastrar sermão:", error);
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleDelete = async (sermonId) => {
        try {
            await api.delete(`/wordSermon/${sermonId}`);
            console.log("Sermão deletado com sucesso!");

            // After deleting, fetch sermons again to update the list
            await fetchSermons();
        } catch (error) {
            console.error("Erro ao deletar sermão:", error);
        }
    };

    return (
        <div>
            <h2>Lista de Sermões</h2>
            <ul>
                {sermons && sermons.map((sermon) => (
                    <>
                        <button onClick={() => handleDelete(sermon.id)}>Deletar</button>
                        <li className="mb-2">
                            <strong>{sermon.title}</strong> - {sermon.author}
                            {/* You can add more details like author, date, etc. */}
                        </li>
                    </>
                ))}
            </ul>
            <br />            <br />

            <form onSubmit={handleSubmit}>
            <label>
                Título:
                <input
                    type="text"
                    name="title"
                    value={sermonData.title}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Conteúdo:
                <textarea
                    name="content"
                    value={sermonData.content}
                    onChange={handleInputChange}
                />
            </label>            <br />

            <br />
            <label>
                Autor:
                <input
                    type="text"
                    name="author"
                    value={sermonData.author}
                    onChange={handleInputChange}
                />
            </label>

            <br />
            <br />
            <label>
                Categoria:
                <select
                    name="categoryId"
                    value={sermonData.categoryId}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <br />

            <label>
                Tipo do Conteúdo:
                <select
                    name="type"
                    value={sermonData.type}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione uma categoria</option>
                    <option value="video">Vídeo</option>
                    <option value="short">Short</option>
                </select>
            </label>
            <br />            <br />

            <label>
                URL do vídeo:
                <input
                    type="text"
                    name="videoUrl"
                    value={sermonData.videoUrl}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <div className="sm:col-span-3 mt-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Imagem do Evento
                </label>
                <div className="mt-2">
                    <input id="file_input" type="file"
                           autoComplete="given-name" accept="image/*"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
                               ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                               focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                           onChange={handleImageChange}/>
                </div>
            </div>
            <br />

            <br />
            <button type="submit">Cadastrar Sermão</button>
        </form>
        </div>
    );
}
