import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGalleryComponent = ({ imgs }) => {
  let images = [];
  for (let i in imgs) {
    images.push({
      original: imgs[i],
      thumbnail: imgs[i],
    });
  }

  return <ImageGallery originalHeight={2} items={images} />;
};

export default ImageGalleryComponent;
