import DrawerAppBar from "../components/checkOutNavbar.js";
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import '../App.css'
import { useState } from "react";

function CheckOut() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');
    const navigate = useNavigate()
    const goBack = ()=> {
        navigate('/')
    }
    const orderPlaced = ()=> {
      if (fullName === '' || phone === '' || email === '' || adress === '') {
        Swal.fire({
          icon: 'error',
          text: 'Please fill out all the required fields.',
        })
      }
      else {
        Swal.fire(
          'Good job!',
          'Your order has been successfully placed.',
          'success'
        )
      }
    }
    return (
        <div>
            <DrawerAppBar />
            <div style={{marginTop: 100, display: 'flex', justifyContent: 'center'}}>
                <div className="checkout-div" style={{ width: '80%'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" onClick={()=> goBack()} style={{color: '#bfdbba', backgroundColor: 'transparent', boxShadow: 'none'}}><KeyboardBackspaceIcon fontSize="large" /></Button>
                    </div>
                    <div className="input-div input-div-1" style={{display: 'flex', justifyContent: 'center'}}>
                        <TextField onChange={(event)=> setFullName(event.target.value)} className="textField" label='Fullname' type="text"></TextField>
                        <TextField onChange={(event)=> setPhone(event.target.value)} className="textField" label='Phone' type="number"></TextField>
                    </div>
                    <div className="input-div" style={{display: 'flex', justifyContent: 'center'}}>
                    <TextField onChange={(event)=> setEmail(event.target.value)} className="textField" label='Email' type="email"></TextField>
                    <TextField onChange={(event)=> setAdress(event.target.value)} className="textField" label='Adress' type="text">Hello</TextField>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
                        <Button style={{boxShadow: 'none', backgroundColor: '#bfdbba', width: 200, height: 40}} variant="contained" onClick={()=> orderPlaced()}>Place Order</Button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default CheckOut;