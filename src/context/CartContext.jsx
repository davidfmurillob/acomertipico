import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const CartContext = createContext({})

export function useCart() {
    return useContext(CartContext);
  }
  
  export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
  
    const getItemQuantity = id => {
      return cartItems.find(item => item.id === id)?.quantity || 0;
    };
  
    const increaseQuantity = (id, image, title, price) => {
      setCartItems(prevItems => {
        if (prevItems.find(item => item.id === id) == null) {
          return [...prevItems, { id, image, title, price, quantity: 1 }];
        } else {
          return prevItems.map(item => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          });
        }
      });
    };
  
    const decreaseQuantity = id => {
      setCartItems(prevItems => {
        if (prevItems.find(item => item.id === id)?.quantity === 1) {
          return prevItems.filter(item => item.id !== id);
        } else {
          return prevItems.map(item => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          });
        }
      });
    };
  
    const removeFromCart = id => {
      setCartItems(prevItems => {
        return prevItems.filter(item => item.id !== id);
      });
    };
  
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
  
    useEffect(() => {
      if (isOpen) document.body.classList.add('no-scroll');
      else document.body.classList.remove('no-scroll');
    }, [isOpen]);
  
    return (
      <CartContext.Provider
        value={{
          openCart,
          closeCart,
          isOpen,
          getItemQuantity,
          increaseQuantity,
          decreaseQuantity,
          removeFromCart,
          cartItems,
          cartQuantity,
        }}>
        {children}
      </CartContext.Provider>
    );
  }
  