import React  from 'react';
import { motion } from 'framer-motion';
import ProductoCard from '../../components/shoppingCart/ProductoCard';
import '../../styles/Products.scss'
import Loader from '../../components/utils/Loader';
// import { useLocation } from 'react-router-dom';

export default function Products({products, isLoading, error}) {

  //Hacer el get de categorias a la api y almacenar en la variable

  
 
  return (
    
      <div className="products">     
      <h2 className="text-2xl sm:text-3xl text-center text-black italic py-10 px-6">
            Todos los{" "}
            <span className="text-2xl sm:text-3xl text-orange-400">
              productos
            </span>{" "}
            que puedes encontrar en AcomerTípico
          </h2>

        {error && <h2 className="error">{error}</h2>}
        {isLoading && <Loader />}
        <motion.div className="products__container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {!isLoading && <ProductoCard products={products} />}
        </motion.div>
      </div>

  );
}
