import "./App.css";
// libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Components
import Header from "./Layout/Header";
// Pages
import SearchPage from "./Pages/SearchPage";
import RootPage from "./Pages/RootPage";
import ArtistDetailPage from "./Pages/ArtistDetailPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        { index: true, element: <SearchPage /> },
        {
          path: "/detail/:id",
          element: <ArtistDetailPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
