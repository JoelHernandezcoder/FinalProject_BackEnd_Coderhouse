var stripe = Stripe(
  'pk_test_51LEeSoLIosFZTclcPWiPbp6zVCtT8rPRlADlkoacHuMwauKWclIoXMsBfdyc4Di9b19WT9yw7vWqBS8y0dHAA6uT00RZhgeXM2'
);
var orderButton = document.getElementById('orderBtn');
var stripeSessionID = document.getElementById('stripeSessionID').value;

orderButton.addEventListener('click', () => {
  stripe.redirectToCheckout({
    sessionId: stripeSessionID,
  });
});
