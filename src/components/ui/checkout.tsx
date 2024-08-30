import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard', // Default payment method
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Validate form data
  const validateForm = () => {
    const { name, email, address, cardNumber, cardExpiry, cardCvc } = formData;
    if (!name || !email || !address || (formData.paymentMethod === 'creditCard' && (!cardNumber || !cardExpiry || !cardCvc))) {
      return 'All fields are required';
    }
    if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return 'Invalid email address';
    }
    if (formData.paymentMethod === 'creditCard') {
      if (!/^\d{16}$/.test(cardNumber)) {
        return 'Invalid card number';
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        return 'Invalid card expiry date';
      }
      if (!/^\d{3}$/.test(cardCvc)) {
        return 'Invalid card CVC';
      }
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      // Implement your form submission logic here (e.g., API call)
      // Example: await api.submitCheckout(formData);

      // Simulate successful submission
      setTimeout(() => {
        setSuccess(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setError('Submission failed, please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className={cn('p-6 bg-background')}>
      <h2 className={cn('text-2xl font-bold mb-4 text-primary')}>Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            required
          />
        </div>
        <div>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            {/* Add other payment methods as needed */}
          </select>
        </div>
        {formData.paymentMethod === 'creditCard' && (
          <>
            <div>
              <Input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleChange}
                placeholder="Card Expiry (MM/YY)"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                name="cardCvc"
                value={formData.cardCvc}
                onChange={handleChange}
                placeholder="Card CVC"
                required
              />
            </div>
          </>
        )}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Checkout successful!</p>}
        <Button type="submit" isLoading={isSubmitting}>Complete Purchase</Button>
      </form>
    </section>
  );
};

export default Checkout;
