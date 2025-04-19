import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Pizza() {

    const [info, setInfo] = useState(null);

    const {id} = useParams()

    const consultarApi = async () => {
        const url = `http://localhost:5001/api/pizzas/${id}`;
        const response = await fetch(url);
        const data = await response.json();

        setInfo(data);
    };

    useEffect(() => { consultarApi() },
        []);

    if (!info) {
        return (
            <div className="container text-center m-5">
                <h1>Cargando...</h1>
                <img src="https://media.giphy.com/media/3o6Zt7j8x2vY0g9W4I/giphy.gif" alt="" />
            </div>
        )
    }

    return (
        <div>

            <h1>Pizza {info.name}</h1>
            <div className="container text-start m-0 p-5">
                <div className="row justify-content-start align-items-center">
                    <div className="col">
                        <img src={info.img} alt="" />
                    </div>
                    <div className="col">
                        <p><strong>Precio</strong>: ${info.price}</p>
                        <p><strong>Ingredientes:</strong> {info.ingredients.join(", ")}</p>
                        <p><strong>Descripción</strong>: {info.desc}</p>
                    </div>
                </div>

            </div>

            <button className="btn btn-dark m-5">Añadir al carrito</button>
        </div>
    )
}

export default Pizza