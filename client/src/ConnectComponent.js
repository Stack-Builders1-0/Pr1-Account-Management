import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./component/login";
import SignUp from "./component/signup";


function ConnectComponent  (){
return(
    <div>
        <BrowserRouter>
            <Routes>
                <Route path = '/' element={<Login/>}/>
                <Route path = '/signup' element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    </div>
    );
}
  
  

export default ConnectComponent;
