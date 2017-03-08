function confirmPayment() {
  var EXECUTE_PAYMENT_URL = 'http://arthurius.local.dev/execute-payment';

  var paymentID = getParameterByName('paymentID');
  var payerID = getParameterByName('payerID');

  paypal.request.post(EXECUTE_PAYMENT_URL,
    {paymentID: paymentID, payerID: payerID})

    .then(function (data) {
      console.log("Go to success page");
      window.location.href = '/payment-ok';
    })
    .catch(function (err) {
      console.log("Go to error page");
    });
}

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
