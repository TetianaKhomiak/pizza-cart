import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./pages/Cart.tsx";
import Menu from "./pages/Menu.tsx";
import Login from "./pages/Login.tsx";
import Order from "./pages/Order.tsx";
import OrderDetails from "./pages/OrderDetails.tsx";
import OrderNotFound from "./pages/OrderNotFound.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import OrderDetailsProvider from "./context/OrderDetailsProvider.tsx";
import UserNameProvider from "./context/UserNameProvider.tsx";
import { store } from "./api/store.ts";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/pizza-cart/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: "menu", element: <Menu /> },
      { path: "cart", element: <Cart /> },
      { path: "order/new", element: <Order /> },
      { path: "order/:id", element: <OrderDetails /> },
      { path: "order/not-found", element: <OrderNotFound /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <OrderDetailsProvider>
        <UserNameProvider>
          <RouterProvider router={router} />
        </UserNameProvider>
      </OrderDetailsProvider>
    </Provider>
  </React.StrictMode>
);
