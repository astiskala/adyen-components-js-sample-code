getOriginKey().then((originKey) => {
  getPaymentMethods().then((paymentMethodsResponse) => {
    // 1. Create an instance of AdyenCheckout
    const checkout = new AdyenCheckout({
      originKey,
      environment: 'test',
      amount: { currency: 'EUR', value: 1000 },
      onAdditionalDetails: (result) => {
        console.log(result);
      },
      onError: (error) => {
        console.log(error);
      },
      onSubmit: (state, component) => {
        makePayment(state.data).then((response) => {
          component.unmount();
          // 3. present the voucher using the action object returned from /payments
          checkout
            .createFromAction(response.action)
            .mount('#multibanco-container');
        });
      },
      paymentMethodsResponse,
    });

    // 2. create Multibanco component
    checkout.create('multibanco').mount('#multibanco-container');
  });
});
