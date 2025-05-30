import Footer from "../components/Footer.tsx";
import FormOrder from "../components/FormOrder.tsx";
import Header from "../components/Header.tsx";
import "../styles/order.css";

const Order = () => {
  return (
    <div>
      <div className="order__wrapper">
        <Header className="order__header" />
      </div>
      <main className="order__form_wrapper">
        <FormOrder />
      </main>
      <Footer />
    </div>
  );
};

export default Order;
