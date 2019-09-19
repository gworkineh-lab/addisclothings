import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_Rfoa4lxZzJmnCSKcZX4LmdKC00nmpL7thg';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert("Payment Succcessful")
        }).catch(error => {
            console.log("Payment error: ", JSON.parse(error));
            alert('There was an issue with your payment, Please use theprovided credit card')
        });
    };

    return (
        <StripeCheckout
            label="Pay Now"
            name="Addiss Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.com"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishablekey}
        />
    );
};

export default StripeCheckoutButton;