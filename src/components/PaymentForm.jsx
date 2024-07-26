import React from 'react'; 
function PaymentForm() {
  return (
    <form action="https://uat.esewa.com.np/epay/main" method="POST">
      <input type="hidden" name="tAmt" value="100" />
      <input type="hidden" name="amt" value="90" />
      <input type="hidden" name="txAmt" value="5" />
      <input type="hidden" name="psc" value="2" />
      <input type="hidden" name="pdc" value="3" />
      <input type="hidden" name="scd" value="EPAYTEST" />
      <input
        type="hidden"
        name="pid"
        value="ee2c3ca1-696b-4cc5-a6be-2c40d92453"
      />
      <input
        type="hidden"
        name="su"
        value="https://loksewanepal.geoneer.com.np/rquiz"
      />
      <input
        type="hidden"
        name="fu"
        value="https://loksewanepal.geoneer.com.np/"
      />
      <button type="Pay with Esewa" >Pay with Esewa </button>
    </form>
  );
}

export default PaymentForm;
