import React from 'react'
import { Button, Card, CardContent } from './Card';
import { useNavigate,Link } from 'react-router-dom';
import WeSkillNavbar from './MainNavbar';
import weSkill from "./photos/weskillremovedbg.png";

export default function WelcomeMsg() {
    
  return (
    
   <>
         <WeSkillNavbar />
   
         <div className="container d-flex justify-content-center align-items-center vh-100">
           <Card className="p-5 shadow-lg rounded-4 w-100" style={{ maxWidth: '700px' }}>
             <CardContent>
         
                 
                 <div className="text-center">
                   <div className="mb-4">
                     <img src={weSkill} alt="WeSkill Logo" className="img-fluid rounded mb-3" style={{ maxHeight: "10rem", maxWidth: '20rem' }} />
                   </div>
                   <h2 className="text-primary mb-4" style={{ fontFamily: "Big Shoulders Inline", fontSize: "5rem" }}>
                     Welcome to WeSkill!
                   </h2>
                   <p className="lead text-secondary mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                     We're excited to have you here. Let's get started
                   </p>
                   <Button className="bg-success mt-3 px-4 py-2" ><Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }} > Get Started</Link>
                     
                   </Button>
                 </div>
             </CardContent>
           </Card>
         </div>
       </>
  )
}
