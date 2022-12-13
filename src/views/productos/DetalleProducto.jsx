import React, { useEffect, useState } from 'react';
import '../../styles/ProductDetails.scss';
import iconTick from '../../assets/cart/tick.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import {BsArrowLeft} from 'react-icons/bs'

const smallScreen = window.innerWidth < 600;
let imgVariants = {};
if (!smallScreen) {
  imgVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: {
      opacity: 0,
      x: -30,
      transition: { duration: 0.3, delay: 0.15 },
    },
  };
} else {
  imgVariants = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.3, delay: 0.15 },
    },
  };
}

let infoVariants = {};
if (!smallScreen) {
  infoVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: {
      opacity: 0,
      x: 30,
      transition: { duration: 0.3, delay: 0.15 },
    },
  };
} else {
  infoVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      y: 30,
      transition: { duration: 0.3, delay: 0.15 },
    },
  };
}

export default function DetalleProducto() {
  const { id } = useParams();
  const { increaseQuantity } = useCart();
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {

        //Cambiar por la api de acomertipico
        // const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const res = await fetch(`http://localhost:8000/api/products/${id}`);  
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        const response = data.data;
        console.log(response)
        setIsLoading(false);
        setItem(response);
        setError(null);
      } catch (err) {
        setIsLoading(false);
        setError('Could not fetch the data');
        console.log(err.message);
      }
    };
    fetchData();
  }, [id]);



  const previousRoute = () => {
    navigate(-1)
  }

  return (
    <div className="product-details">
      {error && <h2 className="error">{error}</h2>}
      {isLoading && <h2 className="loading">Loading...</h2>}
      {!isLoading && (
        <div className="details-container">
          <motion.div
            className="details__img-box"
            variants={imgVariants}
            initial="initial"
            animate="animate"
            exit="exit">
            <img src={item.imagen_producto} alt="product" className="details__img" />
          </motion.div>
          <motion.div
            className="details__info"
            variants={infoVariants}
            initial="initial"
            animate="animate"
            exit="exit">
            <h2 className="details__info--title">{item.nombre_producto}</h2>
            <h3 className="details__info--price">$&nbsp;{item.precio_producto}</h3>
            <p className="details__info--description">{item.descripcion_producto}</p>
            <button
              className="transition-colors  rounded duration-400 text-black bg-green-500 hover:bg-orange-400 hover:text-black"
              onClick={() => {
                increaseQuantity(id, item.imagen_producto, item.nombre_producto, item.precio_producto);
              }}>
              Agregar al carrito
            </button>
            <div className="details__info--guarantee">
              <img src={iconTick} alt="check" />
              <p>Recibes en la puerta de tu casa</p>
            </div>
            <button
              onClick={previousRoute}
              className="details__previous--button inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-300 rounded border-black border shadow-md  hover:bg-slate-200 hover:scale-95"
            >
              <BsArrowLeft size={40} className="pr-4"/>
              Seguir comprando
            </button>
            
          </motion.div>
        </div>
      )}
    </div>
  );
}
