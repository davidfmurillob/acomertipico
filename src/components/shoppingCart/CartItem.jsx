import React from 'react';
import '../../styles/CartItem.scss';
import iconAdd from '../../assets/cart/add.svg';
import iconSubtract from '../../assets/cart/subtract.svg';
import iconRemove from '../../assets/cart/remove.svg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart, getItemQuantity } = useCart();
  const { closeCart } = useCart();
  const displayedTitle = item.title.length > 50 ? item.title.substring(0, 40) + '...' : item.title;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${item.id}`);
    closeCart();
  };

  return (
    <motion.div
      className="item"
      exit={{
        opacity: 0,
        x: 200,
        transition: { duration: 0.25, delay: 0.1 },
      }}>
      <div className="item__info">
        <div className="item__info--img-box">
          <img src={item.image} alt="item" onClick={handleClick} />
        </div>
        <div className="item__info--details">
          <p>{displayedTitle}</p>
          <div className="item__info--quantity">
            <img src={iconSubtract} alt="subtract" onClick={() => decreaseQuantity(item.id)} />
            <input type="number" value={item.quantity} onChange={() => getItemQuantity(item.id)} />
            <img
              src={iconAdd}
              alt="add"
              onClick={() => increaseQuantity(item.id, item.image, item.title, item.price)}
            />
          </div>
        </div>
      </div>
      <div className="item__right">
        <p>$&nbsp;{(item.price * item.quantity).toFixed(2)}</p>
        <img src={iconRemove} alt="remove" onClick={() => removeFromCart(item.id)} />
      </div>
    </motion.div>
  );
}
