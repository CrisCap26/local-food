import React from 'react'

function Input({tipo, label, placeholder, name, leyendaError, expresionRegular}) {
  return (
    <div>
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