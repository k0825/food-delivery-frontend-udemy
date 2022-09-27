import { CardElement } from "@stripe/react-stripe-js";
import { Button, Label } from "reactstrap";

const CardSection = (props) => {
  const { submitOrder, errorMsg, successMsg } = props;
  return (
    <div>
      <div>
        <Label htmlFor="card-element">クレジットカード/デビットカード</Label>
        <div>
          <fieldset>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement />
              </div>
              <br />
              <div className="order-button-wrapper">
                <button onClick={submitOrder}>注文を確定</button>
              </div>
              {errorMsg ? <div>{errorMsg}</div> : null}
              {successMsg ? <div>{successMsg}</div> : null}
            </div>
          </fieldset>
        </div>
      </div>
      <style jsx>
        {`
           {
            .order-button-wrapper {
              display: flex;
              width: 100%;
              justify-content: flex-end;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CardSection;
