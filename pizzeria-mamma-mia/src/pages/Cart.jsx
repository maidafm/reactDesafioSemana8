import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Cart = () => {
  const { listaPizzas, calcularTotal, sumarCantidad, restarCantidad, sendCart } = useContext(CartContext);
  const { token } = useContext(UserContext);

  const handleCheckout = async () => {
    const response = await sendCart();
  }

  const renderCart = listaPizzas.map((pizza) => (
    <li
      key={pizza.id}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'left'
      }}
    >
      <div style={{ width: '60%' }}>
        <img src={pizza.img} alt={pizza.name} style={{ maxWidth: '5%', paddingRight: '1%' }} />
        {pizza.name}
      </div>
      <div style={{ width: '20%' }}>${pizza.price}</div>
      <div style={{
        width: '20%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button type="button" className="btn btn-outline-danger" onClick={() => restarCantidad(pizza.id)}>-</button>
        <span>{pizza.quantity}</span>
        <button type="button" className="btn btn-outline-primary" onClick={() => sumarCantidad(pizza.id)}>+</button>
      </div>
    </li>
  ));

  return (
    <div style={{ padding: '5%' }}>
      <h2 style={{ padding: '2%' }}>Detalles del pedido:</h2>
      <ul>{renderCart}</ul>
      <h1 style={{ padding: '2%' }}>Total: ${calcularTotal()}</h1>
      <button type="button" 
      className={token ? "btn btn-dark" : "btn btn-dark disabled"} 
      style={{ margin: '2%' }}
      onClick={handleCheckout}
      >Pagar</button>
    </div>
  );
};

export default Cart;
