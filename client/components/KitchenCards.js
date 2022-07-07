import React from 'react'

const Card = (props) => {
  return (
    <div>
      <h1>
        {props.kitchenName}
      </h1>
      <p>
        {props.bio}
      </p>
    </div>
  )
}

export default Card;