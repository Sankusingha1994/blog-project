import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { DocumentData, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Box, Button, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import Wrapper from "@/layout/wrapper/Wrapper";
// import { Query } from "react-query";


const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
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

interface BlogPost {
  imageUrl: string;
  title: string;
  content: string;
  createdAt: number;
  id: string;
}
interface Comment {
  text: string;
  createdAt: number;
  id: string
}

const BlogDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState<string>("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (typeof id === "string") {
        const blogDoc = doc(db, "blogs", id);
        const docSnap = await getDoc(blogDoc);
        console.log(docSnap?.id, "docSnap test")
        if (docSnap.exists()) {
          const data = docSnap.data() as BlogPost;

          setBlog({
            ...data,
            createdAt: docSnap.data().createdAt.toMillis(),
            id: docSnap.id,

          });
        }
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (blog) {

      const commentsQuery = query(collection(db, "comments"), orderBy("createdAt", "desc"), where("postId", "==", id));

      const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        const commentsData: Comment[] = [];
        snapshot.forEach((doc) => {
          console.log(doc, "docc test")
          commentsData.push({ ...(doc.data() as Comment), id: doc.id });
        });
        setComments(commentsData);
      });

      return () => unsubscribe();
    }
  }, [blog]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      return;
    }

    await addDoc(collection(db, "comments"), {
      postId: id,
      text: commentText,
      createdAt: new Date().getTime(),
    });

    setCommentText("");
  };


  if (!blog) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <Box
          component="form"
          gap={1}
          display="flex"
          flexDirection="column"
          justifyContent={'space-evenly'}
          sx={{ width: "80%", margin: " 50px auto", paddingTop: "50px" }}>
          <img src={blog.imageUrl} alt="" style={{ maxWidth: "100%" }} />
          <Typography variant="h1">{blog.title}</Typography>
          <Typography>{blog.content}</Typography>
          <Typography>Created at: {new Date(blog.createdAt).toLocaleString()}</Typography>
          <Box mt={4}>
            <Typography variant="h4">Comments</Typography>
            {comments.map((comment, index) => (
              <Box key={index} mb={2}>
                <Typography>{comment.text}</Typography>
              </Box>
            ))}
            <Box mt={2} gap={1}>
              <TextField
                label="Add a comment"
                variant="outlined"
                fullWidth
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button variant="contained" onClick={handleCommentSubmit}>
                Add Comment
              </Button>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default BlogDetails;



