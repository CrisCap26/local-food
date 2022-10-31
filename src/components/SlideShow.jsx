import React from 'react'
import images from '../imgs/images'
import './slideshow.css'
import { motion } from 'framer-motion'

function SlideShow() {
  return (
    <motion.div className='slider-container'>
      <motion.div className='slider' drag='x' dragConstraints={{right: 0, left: -651}}>
      {
        images.map((img, i) => (
          <motion.div key={i} className='item'>
            <img src={img} alt="" />
          </motion.div>
        ))
      }
      </motion.div>
    </motion.div>
  )
}

export default SlideShow