import React, { useState } from "react";
import formatarData from "../../../utils";

const NewsCard = ({ news, openVideoModal, onEdit, onDelete, onView }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
    onView();
  };

  return (
    <div
      className="bg-gray-900 rounded-md p-2 shadow-md cursor-pointer"
      style={{ maxHeight: "580px", objectFit: "cover", maxWidth: "380px" }}
    >
      {news.img && (
        <img
          src={news.img.url}
          alt={news.title}
          className="rounded-md mb-2"
          style={{ maxHeight: "180px", objectFit: "cover", maxWidth: "280px" }}
        />
      )}
      <h2 className="text-xl font-bold mb-2 text-white">{news.title}</h2>
      {/* <p className="text-gray-400 mb-2">Data{formatarData(news.updatedAt)}</p> */}
      <p
        className={`text-gray-400 mb-2 ${
          expanded ? "overflow-auto max-h-full" : "max-h-60 overflow-hidden"
        }`}
      >
        {news.content}
      </p>

      {news.content.length > 180 && (
        <button
          className="text-blue-500 hover:underline mb-2"
          onClick={toggleExpand}
        >
          {"Ver Mais"}
        </button>
      )}

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mr-2"
          onClick={() => onEdit(news, news.id)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded"
          onClick={() => onDelete(news.id)}
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
