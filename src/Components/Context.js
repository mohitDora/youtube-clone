import React, { createContext, useState } from 'react'

export const Card = createContext()

function Context({ children }) {

  const [searchopen,setsearchopen]=useState(false);

  return (
    <Card.Provider value={{searchopen,setsearchopen}}>
      {children}
    </Card.Provider>
  )
}

export default Context