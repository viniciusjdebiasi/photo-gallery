import React, { useState, useEffect } from "react";
import "./style.css";
import {
  DownloadIcon,
  SewingPinFilledIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=1`
        );
        const data = await response.json();
        console.log(data); // Verifique a estrutura da resposta
        setImages(data); // Para a endpoint photos, use apenas data
      } catch (error) {
        console.error("Error fetching images from Unsplash API:", error);
      }
    };

    fetchImages();
  }, [accessKey]);

  // Função para download e rastreamento
  const handleDownload = async (image) => {
    const response = await fetch(image.urls.full); // Faz a requisição da imagem
    const blob = await response.blob(); // Converte a resposta para um blob
    const url = window.URL.createObjectURL(blob); // Cria um URL temporário para o blob

    const link = document.createElement("a");
    link.href = url; // Define o href como o URL do blob
    link.download = image.alt_description || "downloaded-image.jpg"; // Nome do arquivo
    document.body.appendChild(link);
    link.click(); // Simula o clique no link
    document.body.removeChild(link); // Remove o link do DOM
    window.URL.revokeObjectURL(url); // Libera o objeto URL

    // Rastrear o download na API Unsplash
    try {
      await fetch(`https://api.unsplash.com/photos/${image.id}/download`, {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${accessKey}`, // Use sua chave de acesso
        },
      });
      console.log("Download rastreado com sucesso");
    } catch (error) {
      console.error("Erro ao rastrear o download:", error);
    }
  };

  return (
    <div className="main">
      {images.length > 0 ? (
        images.map((image) => (
          <div className="card-image" key={image.id} data-aos="fade-up">
            <img
              className="image_css"
              src={image.urls.small}
              alt={image.alt_description || "Unsplash Image"}
            />

            <div className="overlay">
              <section>
                <h4>{image.alt_description || "Description unavailable"}</h4>

                <br />

                <section className="container_profile">
                  <SewingPinFilledIcon style={{ color: "red" }} /> &nbsp;
                  <p>{image.location?.name || "Location unavailable"}</p>
                </section>
              </section>

              <section className="profine_download">
                <section className="container_profile">
                  <img
                    src={image.user?.profile_image.small}
                    alt="Photographer profile photo"
                    className="img_profile"
                  />
                  <a
                    href={`https://unsplash.com/@${image.user?.username}`}
                    target="_blank"
                    className="link_profile"
                  >
                    {image.user?.username || "Name unavailable"}
                  </a>
                </section>
                <a
                  href={image.urls.full}
                  download="image.jpg"
                  className="download_button"
                  onClick={(e) => {
                    e.preventDefault(); // Previne o comportamento padrão
                    handleDownload(image); // Chama a função de download
                  }}
                >
                  Download {image.downloads.total} &nbsp; <DownloadIcon />
                </a>
              </section>
            </div>
          </div>
        ))
      ) : (
        <section className="container_profile">
          <h3>Loading images</h3> &nbsp;
          <UpdateIcon className="loading" />
        </section>
      )}
    </div>
  );
}
