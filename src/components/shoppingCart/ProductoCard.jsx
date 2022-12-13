import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductoCard({ products }) {
  return (
    <>
      {products.map(p => (
        <Link to={`/products/${p.id}`} className="product-card" key={p.id}>
          <div className="product-card__img-box">

            {/* //Cambiar imagen */}
            <img src={p.imagen_producto} alt="product" className="product-card__img" />
          </div>
          <p className="product-card__name">{p.nombre_producto}</p>
          <h3 className="product-card__price">$&nbsp;{p.precio_producto}</h3>
        </Link>
      ))}
    </>
  );
}
