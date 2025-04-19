import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import '../assets/css/Home.css';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [listaPizzas, setListaPizzasState] = useState([]);
  const { agregarAlCarrito } = useContext(CartContext);
  const navigate = useNavigate()

  useEffect(() => {
    consultarApi();
  }, []);

  const consultarApi = async () => {
    const url = 'http://localhost:5001/api/pizzas';
    const response = await fetch(url);
    const data = await response.json();
    setListaPizzasState(data);
  };

const handleAddToCart = (pizza) => {
  agregarAlCarrito(pizza);
};

  if (!listaPizzas.length) {
    return (
      <div className="container text-center m-5">
        <h1>Cargando...</h1>
        <img src="https://media.giphy.com/media/3o6Zt7j8x2vY0g9W4I/giphy.gif" alt="" />
      </div>
    );
  }

  const goToPizza = (id) => navigate(`/pizza/${id}`);

  const renderPizza = listaPizzas.map((pizza) => (
    <CardPizza
      key={pizza.id}
      name={pizza.name}
      price={pizza.price}
      ingredients={pizza.ingredients}
      img={pizza.img}
      onAddToCart={() => handleAddToCart(pizza)}
      onVerMas={() => goToPizza(pizza.id)}
    />
  ));

  return (
    <div className="Home">
      <Header />
      <div className="card-container">{renderPizza}</div>
    </div>
  );
};

export default Home;
