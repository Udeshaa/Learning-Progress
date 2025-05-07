import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";



import CreateSchedul from "./pages/Progress";
import Myschedul from "./pages/Myprogress";
import UpdateSchedul from "./pages/UpdateProgress";




export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
     
      
 


        <Route path="/createschedul" element={<CreateSchedul/>} />
        <Route path="/" element={<Myschedul/>} />
        <Route path="/updateworkout/:workId" element={<UpdateSchedul/>} />

       

       

       
         
        
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
