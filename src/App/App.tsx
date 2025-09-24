import { RouterProvider } from "react-router";
import { router } from "./Router/Router";
import { CookiesBanner } from "@/Components/UI/CookiesBanner/CookiesBanner";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <CookiesBanner />
    </>
  );
};

export default App;
