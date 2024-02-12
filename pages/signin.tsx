import React from 'react'
const Wrapper = dynamic(() => import("@/layout/wrapper/Wrapper"), {ssr : false})
import { Box, Button, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import { useForm,SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationText } from '@/lib/validationText'
import { Auth, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'


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



interface signinData{
    firstName:string
    lastName:string
    email:string
    password:string
}

const schim = yup.object({
    firstName:yup.string().required(validationText.error.enter_firstName),
    lastName:yup.string().required(validationText.error.enter_lastName),
    email:yup.string().trim().required(validationText.error.enter_email),
    password:yup.string().required(validationText.error.enter_password)
}).required()

const signin = () => {
  const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<signinData>({
        resolver:yupResolver(schim)
      });

    //   console.log(errors, "Error");
      
    const onSubmit: SubmitHandler<signinData>= async (data)=>{
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email,data.password);
        const user = userCredential.user;
        if(window !== undefined){
          window.localStorage.setItem("uid", user.uid)
          console.log("User created:", user);
          router.push("/login")
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
            <b>Plase SignUp !!</b>
        </Typography>
        <Paper sx={{width:"50%",height:"500px",margin:" 50px auto",background:"lightblue" }}>
        <Box 
        component="form" 
        gap={1} 
        display="flex" 
        flexDirection="column" 
        justifyContent={'space-evenly'} 
        sx={{width:"80%",margin:" 50px auto",paddingTop:"50px"}} 
        onSubmit={handleSubmit(onSubmit)}>

            <TextField label="First Name" {...register("firstName")} error={Boolean(errors?.firstName)} helperText={errors?.firstName?.message}/>

            <TextField label="Last Name" {...register("lastName")} error={Boolean(errors?.lastName)} helperText={errors?.lastName?.message}/>

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

export default signin
