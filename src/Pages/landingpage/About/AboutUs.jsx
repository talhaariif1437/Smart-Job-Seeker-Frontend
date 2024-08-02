import React from "react";
import AboutSectionOne from "./AboutSectionOne";
import AboutSectionTwo from "./AboutSectionTwo";


export default function AboutUs(){
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
               About Us
          </h1>
               <AboutSectionOne/>
               <AboutSectionTwo/>
               
          </div>
     )
}