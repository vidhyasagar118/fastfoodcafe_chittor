import { useState } from "react";
import axios from "axios";
import "./Admin.css"

export default function Admin(){

  const [form,setForm] = useState({
    name:"", price:"", image:"", category:""
  });

  const addItem = async ()=>{
    await axios.post("http://localhost:5000/api/items/add", form);
    alert("Item Added");
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Price" onChange={e=>setForm({...form,price:e.target.value})}/>
      <input placeholder="Image URL" onChange={e=>setForm({...form,image:e.target.value})}/>

      <button onClick={addItem}>Add Item</button>
    </div>
  );
}