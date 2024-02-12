import { QueryClient, QueryClientProvider } from "react-query"
import {AppProps} from 'next/app'


function MyApp({Component,pageProps}: AppProps){
    const queryClient = new QueryClient()

    return(
        <>
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps}/>
        </QueryClientProvider>
        </>
    )
}


export default MyApp;


