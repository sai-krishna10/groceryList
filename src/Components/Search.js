import React from 'react'

const Search = ({search,setSearch}) => {
    
  return (
    <div className='search'>
        <input type='text' placeholder='Search for a item' value={search} onChange={(e)=>setSearch(e.target.value)}  />
    </div>
  )
}

export default Search 