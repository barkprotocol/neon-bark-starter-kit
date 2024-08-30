"use client";

import { useState } from "react";
import { PayButton } from "@/components/ui/pay-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!token) {
      setError("Token cannot be empty.");
      return;
    }

    try {
      // Handle payment submission (e.g., API call)
      console.log("Submitting payment:", { amount, token });

      // Simulate successful payment
      setSuccess("Payment submitted successfully!");
      
      // Clear form fields
      setAmount("");
      setToken("");
    } catch (err) {
      console.error("Payment submission failed:", err);
      setError("Failed to submit payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-2 bg-red-100 text-red-700 border border-red-300 rounded">{error}</div>}
      {success && <div className="p-2 bg-green-100 text-green-700 border border-green-300 rounded">{success}</div>}

      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="token">Token</Label>
        <Input
          id="token"
          type="text"
          placeholder="Enter token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
      </div>
      <PayButton type="submit" className="w-full">
        Submit Payment
      </PayButton>
    </form>
  );
}
