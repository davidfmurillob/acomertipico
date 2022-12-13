import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/Header.scss';
// import axios from "axios";
import swal from "sweetalert";
import { BsCart2 } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import '../../styles/NavLinks.scss'

function NavLinks({ closeByLink }) {



  const { openCart, cartQuantity } = useCart();





  const navigate = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();

    // axios.post(`api/auth/logout`).then((res) => {
    //   console.log(res)
    //   if (res.data.status === 200) {
    //     // localStorage.removeItem("auth_token");
    //     // localStorage.removeItem("auth_name");
    //     localStorage.clear()
    //     swal("Success", res.data.message, "success");
    //     navigate("/");
    //   }
    // });

    localStorage.clear()
        swal("Success", "Cerraste sesión", "success");
        navigate("/");
  };

  var AuthButtons = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <>
        <Link
          to="login"
          className="underline underline-offset-8 decoration-orange-500 sm:pl-4 hover:cursor-pointer hover:scale-105"
          onClick={closeByLink}
        >
          Login
        </Link>

        <Link
          to="registro"
          className="underline underline-offset-8 decoration-green-500 sm:pl-4 hover:cursor-pointer  hover:scale-105"
          onClick={closeByLink}
        >
          Registro
        </Link>
      </>
    );
  } else {
    AuthButtons = (
      <Link
        to="/"
        onClick={logoutSubmit}
        
        className="underline underline-offset-8 decoration-rose-500 sm:pl-4 hover:cursor-pointer hover:scale-105"
      >
        Logout
      </Link>
    );
  }

  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };

  return (
    <ul className="flex flex-col sm:flex-row gap-3 items-baseline text-xl font-light pb-2 md:pb-0">
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        className="hover:underline hover:underline-offset-8 decoration-orange-500 sm:pl-4 hover:cursor-pointer"
      >
        <Link to="productos" onClick={closeByLink}>
          Productos
        </Link>
      </motion.li>
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        className="hover:underline hover:underline-offset-8 decoration-orange-500 sm:pl-4 hover:cursor-pointer"
      >
        <Link to="restaurantes" onClick={closeByLink}>
          Restaurantes
        </Link>
      </motion.li>
      <motion.li
        initial={animateFrom}
        animate={animateTo}
        className="hover:underline hover:underline-offset-8 decoration-orange-500 sm:pl-4 hover:cursor-pointer"
      >
        <Link to="recetas" onClick={closeByLink}>
          Recetas
        </Link>
      </motion.li>
      {/* <motion.li
        initial={animateFrom}
        animate={animateTo}
        className="hover:underline hover:underline-offset-8 decoration-orange-500 sm:pl-4 hover:cursor-pointer"
      >
        <Link to="cart" onClick={closeByLink} className="">
          Carrito{" "}
          <BsCart2 className="inline-block hover:underline hover:underline-offset-8 decoration-orange-500" />
        </Link>
      </motion.li> */}

      {AuthButtons}
      <div className="cart-group">
      <BsCart2 className="inline-block hover:underline hover:underline-offset-8 decoration-orange-500 hover:cursor-pointer ml-4" onClick={openCart} size="40"/>

          {/* <img src={iconCart} alt="cart" onClick={openCart} className="cart-icon text-slate-300" /> */}
          {cartQuantity > 0 && (
            <div className="red-dot" onClick={openCart}>
              <span> {cartQuantity}</span>
            </div>
          )}
        </div>
    </ul>
  );
}

export default NavLinks;
