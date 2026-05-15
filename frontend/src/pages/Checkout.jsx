import { useUser } from "@clerk/clerk-react";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const hashText = async (text) => {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export default function Checkout() {
  const { user } = useUser();
  const { cart } = useContext(CartContext);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const generateReceipt = (orderId, paymentDetails) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text("LUXE FASHION - OFFICIAL E-BILL", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 50);
    doc.text(`Customer: ${user?.firstName}`, 20, 60);
    doc.text(`Email: ${user?.emailAddresses?.[0]?.emailAddress}`, 20, 70);
    
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);
    
    // Items
    doc.setFontSize(14);
    doc.text("ITEMS", 20, 85);
    
    let y = 95;
    doc.setFontSize(10);
    cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name}`, 20, y);
      doc.text(`$${item.price}`, 170, y, { align: "right" });
      y += 10;
    });
    
    doc.line(20, y, 190, y);
    y += 10;
    
    // Total
    doc.setFontSize(14);
    doc.text("TOTAL AMOUNT:", 20, y);
    doc.text(`$${total}`, 170, y, { align: "right" });
    
    y += 20;
    doc.setFontSize(12);
    doc.text(`Payment Method: ${paymentDetails.method.toUpperCase()}`, 20, y);
    if (paymentDetails.method === "card") {
      doc.text(`Card Holder: ${paymentDetails.cardHolder}`, 20, y + 10);
      doc.text(`Card Number: **** **** **** ${paymentDetails.cardNumber.slice(-4)}`, 20, y + 20);
      doc.text(`Expiry: ${paymentDetails.expiryDate}`, 20, y + 30);
      doc.text(`CVV Hash: ${paymentDetails.cvvHash.slice(0, 16)}...`, 20, y + 40);
      y += 40;
    } else if (paymentDetails.method === "paypal") {
      doc.text(`PayPal Email: ${paymentDetails.paypalEmail}`, 20, y + 10);
      y += 10;
    }
    doc.text(`Shipping Address: ${address}`, 20, y + 50);
    
    doc.setFontSize(10);
    doc.text("Thank you for shopping with LUXE.", 105, 280, { align: "center" });
    
    doc.save(`LUXE_Bill_${orderId}.pdf`);
  };

  const handleOrder = async () => {
    const orderId = "LX-" + Math.floor(Math.random() * 1000000);

    let paymentDetails = { method: paymentMethod };

    if (paymentMethod === "card") {
      const hashedCvv = await hashText(cvv || "");
      paymentDetails = {
        ...paymentDetails,
        cardNumber: cardNumber.replace(/\s+/g, ""),
        cardHolder,
        expiryDate,
        cvvHash: hashedCvv,
      };
    } else if (paymentMethod === "paypal") {
      paymentDetails = {
        ...paymentDetails,
        paypalEmail,
      };
    }

    const orderData = {
      orderId,
      userId: user?.id,
      paymentMethod,
      paymentDetails,
      address,
      phone,
      items: cart,
      totalAmount: total,
    };

    console.log("ORDER CREATED:", orderData);
    generateReceipt(orderId, paymentDetails);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="p-10 md:p-20 text-center flex flex-col items-center justify-center min-h-[70vh]">
        <div className="glass p-12 rounded-[3rem] space-y-6 animate-in zoom-in duration-500">
           <div className="bg-gold text-black w-20 h-20 flex items-center justify-center rounded-full text-4xl font-black mx-auto">✓</div>
           <h1 className="text-4xl md:text-5xl font-black text-white italic">THANK YOU!</h1>
           <p className="text-gray-400 text-xl max-w-md mx-auto">Your order has been confirmed. Your e-bill has been downloaded automatically.</p>
           <Link to="/products" className="bg-white text-black px-10 py-5 rounded-full font-black inline-block transform hover:scale-110 transition-all">
             CONTINUE SHOPPING
           </Link>
        </div>
      </div>
    );
  }

  const isCardValid =
    cardHolder.trim() &&
    /^[0-9]{16}$/.test(cardNumber.replace(/\s+/g, "")) &&
    /^[0-9]{3}$/.test(cvv) &&
    /\/?\d{2}-?\d{2}/.test(expiryDate);

  const isPaypalValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail);
  const canProceed =
    address.trim() &&
    phone.trim() &&
    (paymentMethod === "cod" ||
      (paymentMethod === "card" && isCardValid) ||
      (paymentMethod === "paypal" && isPaypalValid));

  return (
    <div className="p-10 md:p-20 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter text-white italic text-center md:text-left">
        CHECKOUT
      </h1>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Form Section */}
        <div className="glass p-10 rounded-[3rem] space-y-8 h-fit">
          <div className="pb-6 border-b border-white/10">
            <p className="text-gold font-bold tracking-widest text-sm mb-2 uppercase">Account & Shipping</p>
            <p className="text-gray-400 font-light mb-4">{user?.emailAddresses?.[0]?.emailAddress}</p>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full glass bg-white/5 border-white/10 text-white rounded-xl p-4 focus:ring-2 focus:ring-gold outline-none"
                defaultValue={user?.firstName}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full glass bg-white/5 border-white/10 text-white rounded-xl p-4 focus:ring-2 focus:ring-gold outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                placeholder="Shipping Address"
                className="w-full glass bg-white/5 border-white/10 text-white rounded-xl p-4 focus:ring-2 focus:ring-gold outline-none h-24 resize-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">Payment Method</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['card', 'paypal', 'cod'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`p-4 rounded-2xl glass font-bold text-xs uppercase tracking-widest border transition-all ${paymentMethod === method ? 'border-gold bg-gold/20 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  {method === 'cod' ? 'Cash on Delivery' : method}
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 pt-4">
                <input
                  type="text"
                  placeholder="Card Number (16 digits)"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  className="w-full glass bg-white/5 border-white/10 text-white rounded-xl p-4 focus:ring-2 focus:ring-gold outline-none"
                />
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full glass bg-white/5 border-white/10 text-white rounded-xl p-4 focus:ring-2 focus:ring-gold outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value.replace(/[^0-9\/]/g, "").slice(0, 5))}
                    className="w-full glass bg-white/5 border-white/10 text-white rounded-xl p-4 focus:ring-2 focus:ring-gold outline-none"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    className="w-full glass bg-white/5 border-white/10 text-white rounded-xl p-4 focus:ring-2 focus:ring-gold outline-none"
                  />
                </div>
                <p className="text-sm text-gray-400">Your CVV is stored securely as a hash and never displayed in plain text.</p>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="space-y-4 pt-4">
                <input
                  type="email"
                  placeholder="PayPal Email Address"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="w-full glass bg-white/5 border-white/10 text-white rounded-xl p-4 focus:ring-2 focus:ring-gold outline-none"
                />
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="pt-4 text-gray-400 text-sm">
                Cash on Delivery selected. You can proceed without entering payment details.
              </div>
            )}
          </div>

          <button
            onClick={handleOrder}
            disabled={!canProceed}
            className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-gold hover:text-white transition-all transform hover:scale-105 shadow-2xl disabled:opacity-50"
          >
            CONFIRM & PAY
          </button>
        </div>

        {/* Summary Section */}
        <div className="space-y-8">
            <div className="glass p-10 rounded-[3rem]">
                <h2 className="text-2xl font-black mb-8 tracking-tight text-white uppercase italic">Summary</h2>
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                    {cart.map((item) => (
                        <div key={item._id} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0">
                            <p className="text-white font-bold italic">{item.name}</p>
                            <p className="text-gold font-bold">${item.price}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/20 space-y-4 text-xl">
                    <div className="flex justify-between">
                        <span className="font-bold text-white uppercase italic">Total</span>
                        <span className="font-black text-gold italic">${total}</span>
                    </div>
                </div>
            </div>
            <Link to="/cart" className="block text-center text-gray-400 hover:text-white transition-colors py-2 font-medium">
                ← BACK TO BAG
            </Link>
        </div>
      </div>
    </div>
  );
}

