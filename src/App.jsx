import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./components/Pages/MainPage/MainPage";
import AnimeTitle from "./components/Pages/AnimeTitle/AnimeTitle";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import Films from "./components/Pages/Films/Films";
import Serials from "./components/Pages/Serials/Serials";
import AnimeSearch from "./components/Pages/AnimeSearch/AnimeSearch";
import { lazy, Suspense } from "react";
// import Popular from "./components/ui/Popular/Popular";
const Popular = lazy(() => import("./components/ui/Popular/Popular"));


const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
    {
      path: "/",
      element: <MainPage />
    }, 
    {
      path: "/title/:id",
      element: <AnimeTitle />
    },
    {
      path: "/films",
      element: <Films />
    },
    {
      path: "/serials",
      element: <Serials />
    },
    {
      path: "/searcher",
      element: <AnimeSearch />
    },
    {
      path: "/popular",
      element: <Suspense fallback={<div>Loading...</div>}>
      <Popular />
    </Suspense>
    },
    
  ]
  },
]
const router = createBrowserRouter(routes, {basename: '/anime-search/'});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f5f5f5',
    },
    secondary: {
      main: '#d68c89',
    },
    background: {
      default: '#242424',
      paper: '#242424',
    },
    error: {
      main: '#c00000',
    },
    divider: 'rgba(0,0,0,0.12)',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
    // <BrowserRouter>
    //   <ThemeProvider>
    //     <Header />
    //     <Routes>
    //       <Route path="/" element={<MainPage />} />
    //       <Route path="/title" element={<Title />} />
    //       <Route path="/search/*" element={<SearchPage />} />
    //     </Routes>
    //   </ThemeProvider>
    // </BrowserRouter>
  );
}

export default App;
