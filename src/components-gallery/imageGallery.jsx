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
          `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=10`
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

  return (
    <div className="main">
      {images.length > 0 ? (
        images.map((image) => (
          <div className="container_images" key={image.id}>
            <div className="div-show-images">
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
                      rel="noopener noreferrer" // Adicione este atributo por segurança
                      className="link_profile"
                    >
                      {image.user?.username || "Name unavailable"}
                    </a>
                  </section>
                  <button type="button" className="download_button">
                    Download &nbsp; <DownloadIcon />
                  </button>
                </section>
              </div>
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
