import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Col, Row } from "reactstrap";
import Cart from "../components/Cart";
import CheckOutForm from "../components/CheckOut/CheckOutForm";

const checkout = () => {
  const stripePromise = loadStripe(
    "pk_test_51Llur7DxtpbdDqXowtO2wM9MtV13j3LxGxbnTQ5pgY5EZEFO40Z6ZeFlQDrnRyj5mOrpJzmNRpR5ozGFNnuapDZR00xicHdHcZ"
  );
  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20, fontSize: 20, textAlign: "center" }}>
          チェックアウト
        </h1>
        <Cart />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </Col>
    </Row>
  );
};

export default checkout;
