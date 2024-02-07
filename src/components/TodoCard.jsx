import React from 'react'

const TodoCard = ({title,innerRef}) => {
  return (
    <p
    ref={innerRef}
    className='todo-card'>
      {title}
    </p>
  )
}

export default TodoCard
