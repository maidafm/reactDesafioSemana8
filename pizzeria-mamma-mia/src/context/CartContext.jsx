import { createContext, useState } from "react";
import { PizzaCart } from "../utils/Pizzas"; 

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [listaPizzas, setListaPizzas] = useState(PizzaCart);

  const calcularTotal = () => {
    return listaPizzas.reduce((total, pizza) => total + pizza.price * pizza.quantity, 0);
  };

  const sumarCantidad = (id) => {
    const nuevaCantidad = [...listaPizzas];
    const encontrada = nuevaCantidad.findIndex((pizza) => pizza.id === id);
    if (encontrada !== -1) {
      nuevaCantidad[encontrada].quantity += 1;
      setListaPizzas(nuevaCantidad);
    }
  };

  const restarCantidad = (id) => {
    const nuevaCantidad = [...listaPizzas];
    const encontrada = nuevaCantidad.findIndex((pizza) => pizza.id === id);

    if (encontrada !== -1) {
      if (nuevaCantidad[encontrada].quantity === 1) {
        setListaPizzas(nuevaCantidad.filter((pizza) => pizza.id !== id));
      } else {
        nuevaCantidad[encontrada].quantity -= 1;
        setListaPizzas(nuevaCantidad);
      }
    }
  };

  const agregarAlCarrito = (pizza) => {
    const existe = listaPizzas.find((p) => p.id === pizza.id);
    if (existe) {
      const actualizadas = listaPizzas.map((p) =>
        p.id === pizza.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setListaPizzas(actualizadas);
    } else {
      setListaPizzas([...listaPizzas, { ...pizza, quantity: 1 }]);
    }
  };

  const verMas = (id) => {
    return id;
  };

  const sendCart = async () => {
    const response = await fetch("http://localhost:5001/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(listaPizzas),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Carrito enviado");
    } else {
      console.error("Error al enviar el carrito");
    }
  }


  return (
    <CartContext.Provider value={{ listaPizzas, calcularTotal, sumarCantidad, restarCantidad, agregarAlCarrito, verMas, sendCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
