import React from 'react'
import { motion } from 'framer-motion';
import { useState } from 'react'
import { useEffect } from 'react'
import Loader from '../components/utils/Loader'
import ProductoCard from '../components/shoppingCart/ProductoCard';

const ProductosRestaurantesView = () => {
    
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    const [localSet, setlocalSet] = useState(false);


    const [idRestaurante, setIdRestaurante] = useState("") 
    const [restauranteName, setRestauranteName] = useState("") 
   
    useEffect(() => {
        setIdRestaurante(localStorage.getItem("id_restaurante"));
        setRestauranteName(localStorage.getItem('nombre_restaurante'));    
        setlocalSet(!localSet)
          
    }, [])
    
    
    useEffect(() => {
        
        fetchData()
      
    }, [localSet])
    

const fetchData = async () => {
    setIsLoading(true);
    const productArr = []
    try {
      //Cambiar la api por la de acomertipico
      const res = await fetch(`http://localhost:8000/api/establishments/${idRestaurante}`);
      // const res = await fetch('https://fakestoreapi.com/products');
      console.log(res)
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      const response = await data.product;
      console.log(response);
      setIsLoading(false);
      response.map((item) => {
        productArr.push({
          id: item.id,
          nombre_producto: item.nombre_producto,
          descripcion_producto: item.descripcion_producto,         
          precio_producto: item.precio_producto,
          imagen_producto: item.imagen_producto 
        });
        return item;
      });
      
    } catch (err) {
      setIsLoading(false);
      console.error(err.message);
    }
    setProducts(productArr);
    

}
    

  return (
    <div className="products">     
      <h2 className="text-2xl sm:text-3xl text-center text-black italic py-10 px-6">
            Todos los productos del restaurante{" "}
            <span className="text-2xl sm:text-3xl text-orange-400">
              {restauranteName}
            </span>
            
          </h2>

        {isLoading && <Loader />}
        <motion.div className="products__container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {!isLoading && <ProductoCard products={products} />}
        </motion.div>
      </div>
  )
}

export default ProductosRestaurantesView