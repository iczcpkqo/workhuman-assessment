import {FloatingLabel, Form} from "react-bootstrap";
import {useState} from "react";

function CountryInput({onSearchChange}){

   const [searchText, setSearchText] = useState('');

   return (
       <>
           <FloatingLabel
               label="Country"
               className="mb-4 text-secondary">
               <Form.Control
                   label="Country"
                   placeholder="Country"
                   aria-label="Country"
                   className="border-3 border-primary"
                   value={searchText}
                   onChange={e => {
                       setSearchText(e.target.value);
                       onSearchChange(e.target.value);
                   }}
               />

           </FloatingLabel>
       </>
   );
}

export default CountryInput;
