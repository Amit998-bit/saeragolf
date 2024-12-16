document.getElementById('pay-button').onclick = async function () {
    // Fetch the order ID from the server
    const response = await fetch('http://34.229.149.63:8000/create-order', { method: 'POST' });
    const data = await response.json();
  
    if (!data.orderId) {
      alert('Error creating order');
      return;
    }
  
    const options = {
      key: 'rzp_live_xxMqs6bYK7A4kz', // Replace with Razorpay Key ID
      amount: data.amount, // Amount in smallest currency unit
      currency: data.currency,
      name: 'Your Company Name',
      description: 'Purchase Description',
      image: './assets/logo.png', // Optional: Company logo
      order_id: data.orderId,
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#0000FF'
      }
    };
  
    const razorpay = new Razorpay(options);
    razorpay.open();
  };
  

 