
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { db } from "../config/firebase";
import { deleteDoc,doc } from "firebase/firestore";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclose from "../hooks/useDisclose.js";
import { toast } from "react-toastify";
const ContactCard = ({contact}) => {
  const {isOpen,onClose, onOpen} = useDisclose();

  const deleteContact = async(id) =>{
    try {
      await deleteDoc(doc(db, "contacts" , id));
      toast.success("Contact Deleted Successfully");

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div 
        key={contact.id} 
        className="bg-black rounded-md flex
        text-white bg-gradient-to-l from-blue-950 to-black-500 
        items-center justify-between p-2">
            <div className="flex gap-1">
              <HiOutlineUserCircle className="text-blue-400 text-4xl "/>
              <div className="text-white">
                <h2 className="font-medium" >{contact.name}</h2>
                <p className="text-sm" >{contact.email}</p>
              </div>
            </div>
            <div className="flex text-3xl gap-1">
              <RiEditCircleLine onClick={onOpen} className="cursor-pointer hover:text-slate-400 "/>
              <IoMdTrash 
              onClick={() => deleteContact(contact.id)}
              className="text-red-500 hover:text-red-800 cursor-pointer"/>
             </div>
          </div>
          <AddAndUpdateContact 
          isUpdate 
          contact = {contact}
          isOpen={isOpen}
          onClose={onClose}/> 
      </>
  )
}

export default ContactCard
