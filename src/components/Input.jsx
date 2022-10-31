import React from 'react'
import 'reg_usu.css'

function Input({tipo, label, placeholder, name, leyendaError, expresionRegular}) {
  return (
    <div className='field'>
        <label htmlFor={name}>{label}</label>
        <div className='container-input'>
            <input type={tipo} placeholder={placeholder} id={name} />
            <div className='icon'></div>
        </div>
        <p>{leyendaError}</p>
    </div>
  )
}

export default Input