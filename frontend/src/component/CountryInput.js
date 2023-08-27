import {FloatingLabel, Form} from "react-bootstrap";
import {useState} from "react";

/**
 * A component that renders a search input box.
 *
 * @param {Function} onSearchChange - A function that is called when the search text changes.
 *
 * @returns {Element} A Country Input component.
 *
 * @author Sean
 * @date 24-08-2023
 */
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
