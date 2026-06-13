const Bill = ({ items = [] }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-5">
        CHITTORGARH FASTFLASH
      </h2>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between mb-2"
        >
          <span>
            {item.name} x {item.qty}
          </span>

          <span>
            ₹{item.price * item.qty}
          </span>
        </div>
      ))}

      <hr className="my-3" />

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between">
        <span>GST</span>
        <span>₹{gst}</span>
      </div>

      <div className="flex justify-between font-bold text-lg mt-3">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <p className="text-center mt-5 text-green-600">
        Thank You For Ordering ❤️
      </p>
    </div>
  );
};

export default Bill;