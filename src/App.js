import AddItem from './Components/AddItem';
import Content from './Components/Content';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Search from './Components/Search';
import './index.css';
import apiRequest from './apiRequest';
import { useEffect, useState } from 'react';


function App() {
  const API_URL=" http://localhost:3500/items";
  
  const [items,setItems]= useState([]);
  const [newItem,setNewItem]=useState('');
  const [search,setSearch]=useState('');
  

  useEffect(()=>{
      const fetchItems=async()=>{
        try{
          const response=await fetch(API_URL);
          if(!response.ok) throw Error("Did not recieve expected data");
          const listItems=await response.json();
          setItems(listItems);
        }catch(err){
          console.log(err.message);
        }
      }
      setTimeout(()=>{
        (async ()=> await fetchItems())();
      },1000)  
  },[])

  const addItem= async (item)=>{
  const id=items.length?items[items.length-1].id+1:1;
  const myNewItem={id,checked:false,item};
  const listItems=[...items,myNewItem]
  setItems(listItems);

  const postOptions={
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(myNewItem)
  }
    const result=await apiRequest(API_URL,postOptions); 
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  const handleDelete= async (id)=>{
    const listItems=items.filter((item)=>item.id !==id);
    setItems(listItems);

    const deleteOptions={
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify()
    }
    const reqUrl= `${API_URL}/${id}`;
    const result=await apiRequest(reqUrl,deleteOptions);
  }



  const handleCheck=async (id)=>{
    const listItems=items.map((item) =>item.id===id?{...item,
    checked:!item.checked}:item);
    setItems(listItems);

    const myItem=listItems.filter((item)=>item.id===id)
    const patchOptions={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl= `${API_URL}/${id}`;
    const result=await apiRequest(reqUrl,patchOptions);

  }


  return (
    <div className="App">
      <Header/>
      <Search search={search} setSearch={setSearch}/>
      <AddItem setItems={setItems} items={items} handleSubmit={handleSubmit} newItem={newItem} setNewItem={setNewItem}/>
      
        <Content 
            items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))} 
            handleCheck={handleCheck} 
            handleDelete={handleDelete}
        />
      <Footer items={items}/>
    </div>
  );
}

export default App;
