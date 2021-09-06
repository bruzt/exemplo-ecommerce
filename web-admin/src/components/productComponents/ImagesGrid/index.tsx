import React, { useState } from "react";

import api from "../../../services/api";

import { Container } from "./styles";

import { IProduct } from "../ListProducts";

interface IProps {
  product: IProduct;
}

export default function ImagesGrid({ product }: IProps) {
  const [getImages, setImages] = useState([...product.images]);

  async function removeImage(id: number) {
    if (confirm("Tem certeza que deseja excluir a imagem?")) {
      try {
        await api.delete(`/products/images/${id}`);

        let imgIndex: number;

        getImages.forEach((image, index) => {
          if (image.id == id) imgIndex = index;
        });

        const images = [...getImages];

        images.splice(imgIndex, 1);

        setImages(images);
      } catch (error) {
        console.log(error);
        alert("Erro ao deletar imagem");
      }
    }
  }

  return (
    <Container>
      <div className="img-grid">
        {getImages.map((image, index) => (
          <div key={index} className="img-card">
            <div className="img-container">
              <img
                src={`http://localhost:3001/uploads/${image.filename}`}
                alt={image.filename.split("-")[1]}
                data-testid="product-img"
              />
            </div>
            <button
              type="button"
              onClick={() => removeImage(image.id)}
              data-testid="remove-button"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
}
