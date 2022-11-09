import React from 'react'
import images from '../imgs/images'
import './slideshow.css'
import { motion } from 'framer-motion'

function SlideShow({platillos}) {
  return (
    <div className='slider-container'>
      {
        platillos && platillos.reverse().map((platillo, i) => (
          <div key={i} className='item'>
            <img src={images[i % 3]} alt="" />
            <p>{platillo.name}</p>
            <p>{platillo.description}</p>
            <p>{platillo.price}</p>
            <p>{platillo.category}</p>
          </div>
        ))
      }
    </div>
  )
}

export default SlideShow