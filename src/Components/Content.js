import React from 'react'
const Content = ({items,handleCheck,handleDelete}) => {
    
  return (
    <main>
        {items.length?(<div className='items'>
            {items.map((i)=> (
                <div key={i.id} className='item-row' >
                    <input type='checkbox' onChange={()=>handleCheck(i.id)} checked={i.checked}/>
                    <div className='item'>
                        <p style={(i.checked)?{textDecoration:'line-through'}:null}>{i.item}</p>
                        <button onClick={()=>handleDelete(i.id)}>Delete</button>
                    </div> 
                </div>     
            ))}
        </div>):<div className='empty'>Your List Is Empty</div>}
         
           
    </main>
  )
}

export default Content