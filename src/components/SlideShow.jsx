import React from 'react'
import images from '../imgs/images'
import './slideshow.css'
import { motion } from 'framer-motion'

function SlideShow({platillos}) {
  console.log(platillos)
  return (
    <motion.div className='slider-container'>
      <motion.div className='slider' drag='x' dragConstraints={{right: 0, left: -651}}>
      {
        platillos && platillos.splice(0, 3).map((platillo, i) => (
          <motion.div key={i} className='item'>
            <img src={images[i % 3]} alt="" />
            <p>{platillo.name}</p>
            <p>{platillo.description}</p>
            <p>{platillo.price}</p>
            <p>{platillo.category}</p>
          </motion.div>
        ))
      }
      </motion.div>
    </motion.div>
  )
}

export default SlideShow