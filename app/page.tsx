"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, addDoc,getDoc,QuerySnapshot, query, onSnapshot, deleteDoc, doc, } from "firebase/firestore";
import { set } from "firebase/database";
import { db } from "./firebase/firebase";
export default function Home() {
  const [items, setitems] = useState([
    // { name: "coffee", price: "4.96" },
    // { name: "movie", price: "24.95" },
    // { name: "candy", price: "7.95" },
  ]);
  const [newitem, setnewitem] = useState({ name: "", price: "" });
  const [total, settotal] = useState(0);

  // add item to database

  const additem = async (e: any) => {
    e.preventDefault();
    if (newitem.name !== "" && newitem.price !== "") {
      // setitems([...items, newitem]);
      await addDoc (collection( db ,'items'),{
        name:newitem.name.trim(),
        price:newitem.price,
      })
      setnewitem({name:"",price:""})
    }
  };

  // read item from the database
  useEffect(()=>{
const q=query(collection(db,'items'))
const unsubscribe=onSnapshot(q,(QuerySnapshot)=>{
  let itemsArr:any[]=[]
  QuerySnapshot.forEach((doc)=>{
    itemsArr.push({...doc.data(),id:doc.id})
  })
  setitems(itemsArr)

  //Read total from items ARRAy
  const calculatetotale=(()=>{
const totalprice=itemsArr.reduce((sum,item)=>sum+parseFloat(item.price),0)
settotal(totalprice)
  })
  calculatetotale()
  return()=>{
    unsubscribe()
  }
})
  },[])

  // delete item from database
  const deleteItem =async (id:any) => {
    await deleteDoc(doc(db,'items',id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-7 items-center  text-black">
            <input
              value={newitem.name}
              onChange={(e) => {
                setnewitem({ ...newitem, name: e.target.value });
              }}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter item"
            />
            <input
             value={newitem.price}
              onChange={(e) =>setnewitem({ ...newitem, price: e.target.value })}
             className="col-span-3 p-3 border mx-3"
              type="number"
              placeholder="Enter $"
            />
            <button
              onClick={additem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name} </span>
                  <span>${item.price} </span>
                </div>
                <button onClick={()=>deleteItem(item.id)} className="ml-8 p-4 border-l-2 border-y-slate-900 hover:bg-slate-900 w-16">
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3 ">
              <span>Total</span>
              <span>${total} </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
