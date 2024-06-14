import NavBar from "./components/NavBar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import {db} from "./config/firebase" ;
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclose from "./hooks/useDisclose";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [contacts, setContacts] = useState([]) ;

  const {isOpen,onClose,onOpen} = useDisclose();

  useEffect(()=>{
    const getContacts = async() => {
      try {
        const contactsRef = collection(db,"contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });

        
        setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();

  }, []) ;
  const filterContacts = (e) => {
    const value = e.target.value ;
    const contactsRef = collection(db,"contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          const filteredContacts = contactLists.filter((contact) => 
            contact.name.toLowerCase().includes(value.toLowerCase())
          );
          setContacts(filteredContacts);

          return filteredContacts;
        });
  }
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
      <NavBar/>
      <div className="flex gap-2">
        <div className="relative flex  flex-grow items-center">
          <FiSearch className="text-white absolute ml-2 "/>
          <input 
            onChange={filterContacts}
            type="text" 
            className=" h-10 flex-grow rounded-md border
            border-white bg-transparent text-white pl-8" 
          />
        </div>
        <AiFillPlusCircle 
        onClick = {onOpen} 
        className="text-white text-4xl cursor-pointer  hover:text-zinc-200"/>
      </div>
      <div className="mt-4 gap-3 flex flex-col">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact}/>
        ))}
      </div>
     </div>
     <AddAndUpdateContact onClose= {onClose}isOpen = {isOpen}/>
     <ToastContainer position="bottom-center"/>
    </>
    
    
  );
};
