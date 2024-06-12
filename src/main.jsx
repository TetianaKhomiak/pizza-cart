import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./pages/Cart.jsx";
import Menu from "./pages/Menu.jsx";
import Login from "./pages/Login.jsx";
import Order from "./pages/Order.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import OrderNotFound from "./pages/OrderNotFound.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import OrderSearch from "./context/OrderSearchProvider.jsx";
import UserNameProvider from "./context/UserNameProvider.jsx";
import { store } from "./api/store.jsx";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/pizza-app-redux-toolkit-rtk-query/",
    element: <App />,
    children: [
      {
        path: "/pizza-app-redux-toolkit-rtk-query/",
        element: <Login />,
      },
      {
        path: "/pizza-app-redux-toolkit-rtk-query/menu",
        element: <Menu />,
      },
      {
        path: "/pizza-app-redux-toolkit-rtk-query/cart",
        element: <Cart />,
      },
      {
        path: "/pizza-app-redux-toolkit-rtk-query/order/new",
        element: <Order />,
      },
      {
        path: "/pizza-app-redux-toolkit-rtk-query/order/:id",
        element: <OrderDetails />,
      },
      {
        path: "/pizza-app-redux-toolkit-rtk-query/order/not-found",
        element: <OrderNotFound />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <OrderSearch>
        <UserNameProvider>
          <RouterProvider router={router} />
        </UserNameProvider>
      </OrderSearch>
    </Provider>
  </React.StrictMode>
);
