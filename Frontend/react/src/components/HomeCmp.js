import React,{useState} from 'react'
import { WebcamCapture } from './Webcam.js'
import '../App.css'
const Home = () => {
const [name,setName]=useState('')
const [email,setEmail]=useState('');
const submitForm = () =>
{
    alert("Form submitted")

}
return (
    
<div className="home-container">
 <div className="container">
   <div className="text">
    <h1>Fill up this form!</h1>
   <form className="form">
 <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
 <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
  <button type="submit" id="login-button" onClick={(e)=>submitForm(e)}>Submit</button>
      </form>
    </div>
 </div>
</div>
)
}
export default Home