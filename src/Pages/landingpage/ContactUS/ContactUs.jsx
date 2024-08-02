import React from "react";
import Contact from "../Contact";
import NewsLatterBox from "../NewsLatterBox";


export default function Contactus(){
     return(
          <div>
               <h1
                style={{ 
                    color: 'darkslategray', 
                    fontSize: '28px', 
                    fontWeight: 'bold', 
                    margin: '0px 0px', 
                    textAlign: 'center', 
                    backgroundColor: 'lightgray', 
                    padding: '10px',
                    borderRadius: '8px'
                  }}>
                    Contact Us
               </h1>
               <Contact/>
               <NewsLatterBox/>


          </div>
     )
}