import Footer from "../components/Footer.jsx";
import FormOrder from "../components/FormOrder.jsx";
import Header from "../components/Header.jsx";
import "../styles/order.css";

const Order = () => {
  return (
    <div>
      <div className="order__wrapper">
        <Header className="order__header" />
      </div>
      <div className="order__form_wrapper">
        <FormOrder />
      </div>
      <Footer />
    </div>
  );
};

export default Order;
