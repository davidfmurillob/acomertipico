import React from 'react'
import { Link } from 'react-router-dom'

const DefaultButton = ({text, ruta}) => {


    
  return (
    <div className='flex justify-center mb-9'>
        <Link
          to={`/${ruta}`}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          {text}
          </Link>
    </div>
  )
}

export default DefaultButton