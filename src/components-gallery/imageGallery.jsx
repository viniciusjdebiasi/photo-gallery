import React, { useState } from "react";
import {
  DownloadIcon,
  SewingPinFilledIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import "./style.css";
import LazyLoad from "react-lazyload";
import images from "../assets/images";

export default function ImageGallery() {
  const [imagesGallery, setImagesGallery] = useState(images);
  const [textSearch, setTextSearch] = useState("");
  const [userText, setUserText] = useState("");

  const FilterCategory = (category) => {
    setImagesGallery(images.filter((img) => img.category === category));
    setTextSearch("");
  };

  const SearchGame = (userText) => {
    setTextSearch(userText);
    setImagesGallery(
      images.filter((img) =>
        img.description.toLowerCase().includes(userText.toLowerCase())
      )
    );
  };

  const AllImages = () => {
    setImagesGallery(images);
    setTextSearch("");
  };

  return (
    <div className="main">
      <div className="container-search">
        <div className="search">
          <section className="container-input">
            <input
              type="text"
              onChange={(event) => {
                setUserText(event.target.value);
                SearchGame(event.target.value);
              }}
              value={userText}
              className="input-search"
              placeholder="Search images"
              data-aos="fade-left"
            />
            <MagnifyingGlassIcon className="icon-search" data-aos="fade-left" />
          </section>
          <section className="search-options" data-aos="fade-right">
            <button className="link-page" onClick={() => AllImages()}>
              See all
            </button>
            <button
              className="link-page"
              onClick={() => FilterCategory("natureza")}
            >
              Nature
            </button>
            <button
              className="link-page"
              onClick={() => FilterCategory("animais")}
            >
              Animals
            </button>
            <button
              className="link-page"
              onClick={() => FilterCategory("comida")}
            >
              Food
            </button>
          </section>
        </div>
      </div>
      <LazyLoad height={500} offset={0} className="lazy">
        {imagesGallery.map((img) => (
          <div className="card-image" key={img.id} data-aos="fade-up">
            <img className="image_css" src={img.image} alt={img.description} />

            <div className="overlay">
              <section>
                <h4>{img.description}</h4>
                <br />
                <section className="container_profile">
                  <SewingPinFilledIcon style={{ color: "red" }} /> &nbsp;
                  <a
                    href={img.mapsLocal}
                    target="_blank"
                    className="profile-link"
                  >
                    {img.local}
                  </a>
                </section>
              </section>

              <section className="profine_download">
                <section className="container_profile">
                  <img
                    src={img.imagePhotographer}
                    alt="Photographer profile"
                    className="img_profile"
                  />
                  <a
                    href={img.profile}
                    target="_blank"
                    className="profile-link"
                  >
                    {img.photographer}
                  </a>
                </section>
                <a href={img.image} className="download_button" download>
                  Download &nbsp; <DownloadIcon />
                </a>
              </section>
            </div>
          </div>
        ))}
      </LazyLoad>
    </div>
  );
}
