import React from 'react'

const AddItem = ({handleSubmit,newItem,setNewItem}) => {
  
  return (
    <form className='add' onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter a item to add' value={newItem} onChange={(e)=>setNewItem(e.target.value)}/>
        <button type='submit'>Add Item</button>
    </form>
  )
}

export default AddItem