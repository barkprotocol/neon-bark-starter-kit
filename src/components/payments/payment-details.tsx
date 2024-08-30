import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define the props type for PaymentDetails
interface PaymentDetailsProps {
  paymentMethod: string;
  formData: {
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    cryptoAddress: string;
    stripeId: string;
    applePayId: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ paymentMethod, formData, onChange }) => {
  if (paymentMethod === 'creditCard') {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={onChange}
            placeholder="Card Number"
            required
          />
        </div>
        <div>
          <Label htmlFor="cardExpiry">Card Expiry (MM/YY)</Label>
          <Input
            id="cardExpiry"
            type="text"
            name="cardExpiry"
            value={formData.cardExpiry}
            onChange={onChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <Label htmlFor="cardCvc">Card CVC</Label>
          <Input
            id="cardCvc"
            type="text"
            name="cardCvc"
            value={formData.cardCvc}
            onChange={onChange}
            placeholder="CVC"
            required
          />
        </div>
      </div>
    );
  }

  if (paymentMethod === 'crypto') {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="cryptoAddress">Cryptocurrency Address</Label>
          <Input
            id="cryptoAddress"
            type="text"
            name="cryptoAddress"
            value={formData.cryptoAddress}
            onChange={onChange}
            placeholder="Enter your cryptocurrency address"
            required
          />
        </div>
      </div>
    );
  }

  if (paymentMethod === 'stripe') {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="stripeId">Stripe ID</Label>
          <Input
            id="stripeId"
            type="text"
            name="stripeId"
            value={formData.stripeId}
            onChange={onChange}
            placeholder="Enter your Stripe ID"
            required
          />
        </div>
      </div>
    );
  }

  if (paymentMethod === 'applePay') {
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="applePayId">Apple Pay ID</Label>
          <Input
            id="applePayId"
            type="text"
            name="applePayId"
            value={formData.applePayId}
            onChange={onChange}
            placeholder="Enter your Apple Pay ID"
            required
          />
        </div>
      </div>
    );
  }

  return null; // No details required for other payment methods
};

export default PaymentDetails;
