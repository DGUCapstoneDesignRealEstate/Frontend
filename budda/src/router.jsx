import AllList from "./pages/AllList/AllList";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import Detail from "./pages/Detail/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/all-list",
    element: <AllList />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
]);

export default router;
