import React from 'react'

const kitchens = [
  {
    id: 1,
    text: kitchen1, 
    cuisine: cuisine1, 
  },
  {
    id: 2,
    text: kitchen2, 
    cuisine: cuisine2, 
  },
  {
    id: 3,
    text: kitchen3, 
    cuisine: cuisine3, 
  },
]

const Card = () => {
  return (
      <>
        {kitchens.map((kitchen) => (
          <h3 key = {kitchens.id}>{kitchens.text}</h3>
        ))}
      </>
  )
}

export default Card;