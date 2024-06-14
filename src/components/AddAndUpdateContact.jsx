import { addDoc, collection, doc,updateDoc } from 'firebase/firestore';
import ContactCard from './ContactCard';
import Modal from './Modal'
import { db } from '../config/firebase';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from "yup" ;

const  contactSchemaValidation = Yup.object().shape({
    name : Yup.string().required("Name is required"),
    email : Yup.string().email("Invalid email").required("email is required")
})

const AddAndUpdateContact = ({isOpen,onClose, isUpdate, contact}) => {
    const addContact  = async (contact) =>{
        try {
            const contactsRef = collection(db,"contacts") ;
            await addDoc(contactsRef,contact);
            onClose();
            toast.success("Contact Added Successfully");
        } catch (error) {
            console.log(error);
        }
    };
    const updateContact  = async (contact,id) =>{
        try {
            const contactsRef = doc(db,"contacts", id) ;
            await updateDoc(contactsRef,contact);
            onClose();
            toast.success("Contact updated Successfully");
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} >
          <Formik
            validationSchema={contactSchemaValidation}
            initialValues={isUpdate ? {
                name: contact.name,
                email: contact.email,
            }:{
                name: "",
                email: "",
            }}
            onSubmit={(values) => {
                console.log(values);
                isUpdate ? updateContact(values,contact.id):
                addContact(values); 
            }}
          >
            <Form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2 '>
                   <label htmlFor='name'>Name</label>
                  <Field name = "name" className = "p-2 h-10 border"/>
                </div>
                <div className='text-xs text-red-500'>
                    <ErrorMessage name='name'/>
                </div>
                <div className='flex flex-col'>
                   <label htmlFor='email'>Email</label>
                  <Field  type = "email" name = "email" className = "h-10 border"/>
                </div>
                <div className='text-xs text-red-500'>
                    <ErrorMessage name='email'/>
                </div>
                <button className = "bg-gradient-to-l from-blue-900 to-blue-900 text-white hover:to-black p-2">
                    {isUpdate ? "Update" : "add"} contact
                </button>
            </Form>
          </Formik>
      </Modal>
    </div>
  )
}

export default AddAndUpdateContact ; 
