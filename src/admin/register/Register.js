import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { registerUser } from '../../_services/register/registerUser.service';

function Register() {
    const navigate = useNavigate();
    const paperStyle = { padding: 20, width: 400, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const grid = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center ",
        alignContent: "center",
        height: "100vh"
    }
    const textFiled = { marginTop: "20px" }
    const loginBtn = { marginTop: "20px" }
    const haveAccount = { marginTop: "20px" }
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [c_password, setC_Password] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const [phoneErr, setPhoneErr] = useState("");
    const [c_passErr, setC_PassErr] = useState("");

    const formInputChangeHandler = (e) => {
        e.preventDefault();
        if (e.target.name == 'name') {
            setName(e.target.value)
        }
        if (e.target.name == 'email') {
            setEmail(e.target.value)
            setEmailErr("")
        }
        if (e.target.name == 'phone') {
            setPhone(e.target.value)
            setPhoneErr("")
        }
        if (e.target.name == 'password') {
            setPassword(e.target.value)
            setPassErr("")
        }
        if (e.target.name == 'c_password') {
            setC_Password(e.target.value)
            setC_PassErr("")
        }
    }
    const submitClickHandler = (e) => {
        e.preventDefault();
        let postData = {};
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var regexp = " /^[0-9\b]+$/"
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

        if (name) {
            postData.name = name;
        }
        if (mailformat.test(email)) {
            postData.email = email;
            setEmailErr(false)
        } else {
            setEmailErr(true)
        }
        if (phone) {
            postData.phone = phone;
        }
        if (password.match(regexp) || format.test(password)) {
            postData.password = password;
            setPassErr(false)
        } else {
            setPassErr(true)
        }
        if (password.match(c_password) || format.test(c_password)) {
            postData.c_password = c_password;
            setPassErr(false)
        } else {
            setPassErr(true)
        }
        if (mailformat.test(email) && (password.match(regexp) || format.test(password))) {
            registerUser(postData).then(function (response) {
                console.log('Registered Successfully');
                if (response.data.data) {
                }
                else if (response.data.errors) {
                    response.data.errors.map((data) => {
                        return (alert(data.detail))
                    })
                }
                else {
                    alert("Something went wrong")
                    // history.push("/register-view");
                }

                console.log(response);
            })
        } else {
            console.log("error")
        }
    }
    return (
        <Grid style={grid}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlined /></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField label='Name' placeholder='Enter Name' type="text" style={textFiled} name="name" onChange={formInputChangeHandler} variant="outlined" fullWidth />
                <TextField label='Email' placeholder='Enter email' type="email" style={textFiled} name="email" error={emailErr} helperText={emailErr && "Enter valid email "} onChange={formInputChangeHandler} variant="outlined" fullWidth required />
                <TextField label='Phone Number' placeholder='Enter Phone Number' type="text" style={textFiled} name="phone" error={phoneErr} helperText={phoneErr && "Enter valid Phone Number "} onChange={formInputChangeHandler} variant="outlined" fullWidth />
                <TextField label='Password' placeholder='Enter password' type="password" style={textFiled} name="password" error={passErr} helperText={passErr && "Please enter valid password (First letter should be capital and contain special character and number )"} onChange={formInputChangeHandler} variant="outlined" fullWidth required />
                <TextField label='Confirm Password' placeholder='Enter Confirm Password' type="password" style={textFiled} name="c_password" error={c_passErr} helperText={c_passErr && "Please enter valid confirm password"} onChange={formInputChangeHandler} variant="outlined" fullWidth required />
                <Button type='submit' color='primary' variant="contained" style={loginBtn} fullWidth onClick={submitClickHandler}>Register</Button>
                <Typography style={haveAccount}> Already have account ?
                    <Link href="/" >
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Register

