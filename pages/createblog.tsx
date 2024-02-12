import React, { useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography, TextField, Button, createTheme, ThemeProvider, Box, Container } from "@mui/material";
import { storage, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
const Wrapper = dynamic(() => import("@/layout/wrapper/Wrapper"), {ssr : false})
import Input from '@mui/material/Input';
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA500", 
    },
    background: {
      default: "#F5F5F5", 
    },
  },
});

const CreateBlog: React.FC = () => {
    const router = useRouter()
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!title || !body || !image) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const imageRef = storageRef(storage, `images/${uuidv4()}`);
            await uploadBytes(imageRef, image);

            const imageUrl = await getDownloadURL(imageRef);

            await addDoc(collection(db, "blogs"), {
                title,
                body,
                imageUrl,
                createdAt: serverTimestamp(),
            });

            alert("Blog post created successfully");
            setTitle("");
            setBody("");
            setImage(null);
            router.push("/")
        } catch (error) {
            console.error("Error creating blog post:", error);
            alert("Failed to create blog post");
        }
    };

    return (
        <Wrapper>
        <ThemeProvider theme={theme}>

          <Container>
              <Typography variant="h4" sx={{textAlign:"center",marginTop:"20px", color:"orangered"}}>Create a Blog Post</Typography>
              <Box
              gap={1} 
              display="flex" 
              flexDirection="column" 
              justifyContent={'space-evenly'} 
              sx={{width:"80%",margin:" 50px auto",paddingTop:"50px"}}>
              <TextField
                  
                  label="Title"
                  value={title}
                  onChange={handleTitleChange}
                  fullWidth
              />
              <TextField
                  label="Body"
                  value={body}
                  onChange={handleBodyChange}
                  multiline
                  rows={4}
                  fullWidth
              />
              <Input
                  type="file"
                  onChange={handleImageChange}
              />
              <Button onClick={handleSubmit} variant="contained" color="primary">
                  Create Post
              </Button>
              </Box>
          </Container>
        </ThemeProvider>
        </Wrapper>
    );
};

export default CreateBlog;
