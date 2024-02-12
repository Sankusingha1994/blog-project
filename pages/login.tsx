import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button,Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
const Wrapper = dynamic(() => import("@/layout/wrapper/Wrapper"), {ssr : false})
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { validationText } from '@/lib/validationText';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';




const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "green",
          color: "white",
          "&:hover": {
            backgroundColor: "darkgreen",
          },
        },
      },
    },
  },
});



interface loginData{
    email:string
    password:string
}

const schim = yup.object({
    email:yup.string().required(validationText.error.enter_email),
    password:yup.string().required(validationText.error.enter_password)
}).required()

const Login = () => {
  const router=useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<loginData>({
        resolver:yupResolver(schim)
      });

      const onSubmit: SubmitHandler<loginData>= async (data)=>{
        try {
          const userCredential = await signInWithEmailAndPassword(auth, data.email,data.password);
          const user = userCredential.user;
          
          if(window !== undefined){
            window.localStorage.setItem("uid", user.uid)
            console.log("User created:", user);
            router.push("/")
          }
          
  } catch (error) {
      console.error("Error creating user:", error);
  }
    console.log(data);
    
          
        }  
    
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
    <Box >
        <Typography variant='h3'textAlign="center" sx={{color:"orange",marginTop:"20px"}}>
            <b>Plase Login !!</b>
        </Typography>

        <Paper sx={{width:"50%",height:"400px",margin:" 50px auto",background:"lightblue"}}>

        <Box component="form" gap={1} display="flex" flexDirection="column" justifyContent={'space-evenly'} sx={{width:"80%",margin:" 50px auto",paddingTop:"80px"}} onSubmit={handleSubmit(onSubmit)}>
        
        <TextField label="Email" {...register("email")} error={Boolean(errors?.email)} helperText={errors?.email?.message}/>

        <TextField type="password" label="Password" {...register("password")} error={Boolean(errors?.password)} helperText={errors?.password?.message}/>
        <Button type="submit" variant='contained'>Submit</Button>
        </Box>
        </Paper>
    </Box>
    </ThemeProvider>
    </Wrapper>
  )
}

export default Login
