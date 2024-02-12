import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from "@/firebase";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
// import dynamic from "next/dynamic";
// import Wrapper from "@/layout/wrapper/Wrapper";
const Wrapper = dynamic(() => import("@/layout/wrapper/Wrapper"), {ssr : false})


const theme = createTheme({
  typography: {
    h1: {
      fontSize: "15rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "blue", 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "green",
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

interface Props {
  allBlog: BlogPost[];
}


const Home: React.FC<Props> = ({ allBlog }) => {
    return (
      <Wrapper>
        <ThemeProvider theme={theme}>
        <Container>
          <Typography variant="h1">Our Blogs</Typography>
          <Grid container spacing={2}>
            {allBlog.map((blog) => (
              <Grid item key={blog.id} xs={12} sm={6} md={4}>
                <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    height="200"
                    image={blog.imageUrl}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />
                  
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography>
                      Created at: {new Date(blog.createdAt).toLocaleString()}
                    </Typography>
                    <Link href={`/blogDetails/${blog.id}`}>
                      <Button variant="contained">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </ThemeProvider>
        </Wrapper>
    );
  };
  
  export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(6));
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    const allBlog:any = querySnapshot.docs.map((docSnap) => ({
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
  
    }));
  
    // console.log(allBlog);
  
    return {
      props: { allBlog },
    };
  };
  
  export default Home;
