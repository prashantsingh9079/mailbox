import React from 'react'
import { useState,useRef } from 'react'
import { Button , Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


export default function LoginComponent() {
    const [newUser,setNewUser] = useState(true);
    const navigate = useNavigate()
    const email = useRef()
    const pwd = useRef();
    const confirmPwd = useRef()

    async function submitHandler(e)
    {
        e.preventDefault();
        if(newUser===true)
        {
            const data = {email:email.current.value,password:pwd.current.value,confirmPassword:confirmPwd.current.value}
            if(data.password!==data.confirmPassword)
            {
                alert("Please enter same password in both the password fiels")
                return
            }
            console.log(data)
            await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpFF3_M0v475Z8YvgnYGpHPJfBnLj5u70",
            {
                method:'POST',
                body:JSON.stringify({
                    email:data.email,
                    password:data.password,
                    returnSecureToken:true
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }
            )
            // const res1 = await res.json()
            // localStorage.setItem('token',res1.idToken)
            // const updatedEmail = email.current.value.split('@')[0]
            // localStorage.setItem('email',updatedEmail)
            alert("account created")
            setNewUser(false)
        }
        else
        {
            const data = {email:email.current.value,password:pwd.current.value}   
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpFF3_M0v475Z8YvgnYGpHPJfBnLj5u70",
            {
                method:'POST',
                body:JSON.stringify({
                    email:data.email,
                    password:data.password,
                    returnSecureToken:true
                })
            }
            )
            if(res.ok ===false)
            {
                alert("invalid credentials")
                return
            }
            const res1 = await res.json()
            localStorage.setItem('token',res1.idToken)
            const updatedEmail = email.current.value.split('@')[0]
            localStorage.setItem('email',updatedEmail)
            alert("signed in")
            navigate('/home')
        }
    }

    function switchAccount()
    {
        setNewUser((p)=>!p)
    }
  return (
    <Card style={{ textAlign: 'center', marginTop: '8rem', marginLeft: '20rem', marginRight: '20rem', marginBottom: '20rem', padding: '3rem', borderRadius: '3rem', background: 'skyblue' }}>
      <form style={{}} >
        <input placeholder='Enter Your Email' type="email" ref={email} />
        <br /> <br />
        <input placeholder='Enter Your Password' type="password" ref={pwd} />
        <br /> <br />
        {newUser && <input placeholder='Confirm Your Password' type="password" ref={confirmPwd} /> }
        <br /> <br />
        {newUser && <br/> && <br/> && <Button onClick={submitHandler} style={{borderRadius:'5rem',background:'white',color:'blue',borderColor:'blue',borderWidth:'2px'}}>Sign Up</Button>}
        {!newUser && <Button onClick={submitHandler} style={{borderRadius:'5rem',background:'white',color:'blue',borderColor:'blue',borderWidth:'2px'}}>Sign In</Button>}
        <br /><br />
        {newUser && <i onClick={switchAccount}>Already have a account, please click here</i>}
        {!newUser && <i onClick={switchAccount}>Create a new account, please click here</i>}
      </form>
    </Card>
  )
}
