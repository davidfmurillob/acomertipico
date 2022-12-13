import React, { useState } from 'react';
import '../../styles/Cart.scss';
import CartItem from './CartItem';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {AiOutlineWhatsApp} from 'react-icons/ai'
import swal from 'sweetalert';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { ease: 'easeInOut' } },
};

export default function Cart() {


  const { closeCart, cartItems, isOpen } = useCart();
  const subTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  // const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState(cartItems)
  
  const [pedidoString, setPedidoString] = useState('')

  const [telefonoRestaurante, setTelefonoRestaurante] = useState('')

  useEffect(() => {

    setSelectedItems(cartItems)
    
  }, [cartItems])
  

  useEffect(() => {

  
    const enviar = [];
      selectedItems.map((item => (
               enviar.push(item.quantity, item.title)
          )))
          console.log(enviar.toString().replaceAll(',', ' '))
          setPedidoString(enviar.toString().replaceAll(',', ' '))
      
    }, [selectedItems])

  
  const enviarWhatsapp = () => {      
    const telefonoEstablecimiento = localStorage.getItem('telefono_establecimiento')    
    window.location.href=`https://api.whatsapp.com/send?phone=57${telefonoEstablecimiento}&text=Hola, vengo de Acomertípico y solicito un pedido de: ${pedidoString} . Muchas gracias.`

  }

  const handleClick = () => {

    // setTelefonoRestaurante(localStorage.getItem('telefono_establecimiento'))
    swal('El número del restaurante es: ', localStorage.getItem('telefono_establecimiento'), "success")
    
  }





  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cart__backdrop"
          onClick={closeCart}
          key="backdrop"
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="hidden"></motion.div>
      )}

      {isOpen && (
        <motion.div
          className="cart__container"
          key="modal"
          variants={modal}
          animate="visible"
          initial="hidden"
          exit="hidden">
          <div className="cancel-icon" onClick={closeCart}>
            &#215;
          </div>
          <h2>Carrito de compras</h2>
          <AnimatePresence>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
          {cartItems.length > 0 && (
            <h3 className="cart__subtotal">Total: $&nbsp;{subTotal}</h3>
          )}
          {cartItems.length === 0 && <h3 className="cart__subtotal">Tu carrito está vacío</h3>}
          {cartItems.length > 0 && (
            // <Link to='pedido' subTotal={subTotal} className="inline-flex items-center font-semibold justify-center h-12 px-6 mr-6 transition-colors tracking-wide rounded duration-400 text-black bg-green-500 hover:bg-orange-400 hover:text-black " onClick={closeCart}>
            //   Realizar pedido
            // </Link>
            <Link 
              className="inline-flex items-center font-semibold justify-center h-12 px-6 mr-6 transition-colors tracking-wide rounded duration-400 text-black bg-green-500 hover:bg-orange-400 hover:text-black " 
              onClick={enviarWhatsapp} >
              Realizar pedido via Whatsapp <AiOutlineWhatsApp className='ml-2' size={28}/>
            </Link>
          )}
          {/* {cartItems.length === 0 && (
            <button className="btn" onClick={closeCart}>
              SHOP NOW
            </button>
          )} */}
          <div className='flex flex-col '>
            <h3 className='mx-auto text-base py-4'>O también puedes hacer el pedido vía telefónica</h3>
            <button onClick={handleClick} className="inline-flex items-center font-semibold justify-center h-12 px-6 mr-6 transition-colors tracking-wide rounded duration-400 text-black bg-green-500 hover:bg-orange-400 hover:text-black ">
              Obtener el numero del restaurante
            </button>
          </div>


        </motion.div>
      )}
    </AnimatePresence>
  );
}
