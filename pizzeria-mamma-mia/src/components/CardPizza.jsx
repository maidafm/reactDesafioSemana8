import React from 'react';
import '../assets/css/CardPizza.css';

const CardPizza = ({ name, price, ingredients, img, onAddToCart, onVerMas }) => {
  return (
    <div className="card">
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div className="card-ingredients">
          <p>
            Ingredientes: {ingredients.map((ingredient) => (
              <span key={ingredient}>🍕 {ingredient}</span>
            ))}
          </p>
        </div>
        <p className="card-price">Precio: ${price.toLocaleString()}</p>
        <div className="card-buttons">
          <button className="btn btn-light btn-outline-secondary" onClick={onVerMas}>
            Ver Más
          </button>
          <button className="btn btn-dark" onClick={onAddToCart}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;