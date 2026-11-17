import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CustomizeModal from "../../components/CustomizeModal/CustomizeModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { useCart } from "../../context/CartContext";
import pizzas from "../../data/Pizzas.json";
import Popup from "../../components/Popup/Popup";
import CartSkeleton from "../../components/Skeleton/CartSkeleton";
import "./Cart.css";

function Cart() {

const navigate = useNavigate();

const { isLoggedIn } = useAuth();

const [selectedPizza, setSelectedPizza] = useState(null);
const [editingItem, setEditingItem] = useState(null);

const [showCustomize, setShowCustomize] = useState(false);

const [showPopup, setShowPopup] = useState(false);
const [showLoginPopup, setShowLoginPopup] = useState(false);
const [paymentSuccess, setPaymentSuccess] = useState(false);

const {

    cartItems,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart

} = useCart();

const handleCustomizeAgain = (item) => {
    const pizza = pizzas.find(
        (p) => p.id === item.pizzaId
    );
    setSelectedPizza(pizza);
    setEditingItem(item);
    setShowCustomize(true);
};

const handlePayment = () => {
    if (cartItems.length === 0) return;
    if (!isLoggedIn) {
        setShowLoginPopup(true);
        return;
    }

    setPaymentSuccess(false);
    setShowPopup(true);
    // Processing...

    setTimeout(() => {
        setPaymentSuccess(true);
        // Success screen
        setTimeout(() => {
            clearCart();
            setShowPopup(false);
            navigate("/feedback");
        }, 2000);
    }, 3000);
};

const [loading, setLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
}, []);

if (loading) {
    return <CartSkeleton />;
}

return (
        <main className="cart-page">
            <div className="container">
                <h1 className="cart-title">
                    Your Cart
                </h1>
                <div className="cart-layout">
                    {/* LEFT */}
                    <section className="cart-items">
                        {cartItems.length === 0 ? (
                            <div className="empty-cart">
                                <div className="empty-icon">
                                    {/* 🍕 */}
                                </div>

                                <h3>Your Cart is Empty</h3>

                                <p>
                                    Looks like you haven't added any pizzas yet.
                                </p>

                                <button
                                    className="order-now-btn"
                                    onClick={() => navigate("/order")}
                                >
                                    Order Pizza
                                </button>
                            </div>

                            ) : (

                            cartItems.map((item) => (
                                <div
                                    className="cart-card"
                                    key={item.cartId}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-image"
                                    />

                                    <div className="cart-info">
                                        <h3>{item.name}</h3>
                                        {item.toppings.length > 0 ? (
                                            <div className="cart-toppings">
                                                {item.toppings.map((top) => (
                                                    <span key={top.id}>
                                                        {top.name} × {top.quantity}
                                                    </span>
                                                ))}
                                            </div>

                                        ) : (

                                            <p className="no-toppings">
                                                No extra toppings
                                            </p>
                                        )}

                                        <div className="cart-bottom">

                                            <div className="cart-actions">
                                                <button
                                                    className="customize-link"
                                                onClick={() => handleCustomizeAgain(item)}
                                                >
                                                    Customize
                                                </button>

                                                <button
                                                    className="remove-link"
                                                    onClick={() => removeFromCart(item.cartId)}
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                            <div className="quantity-box">

                                                <button
                                                    onClick={() => decreaseQuantity(item.cartId)}
                                                >
                                                    −
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    onClick={() => increaseQuantity(item.cartId)}
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </div>

                                        <h4 className="cart-price">
                                            ₹{(item.basePrice + item.extraPrice) * item.quantity}
                                        </h4>

                                    </div>
                                </div>
                            ))
                        )}
                    </section>


                    {/* RIGHT */}
                    <aside className="order-summary">

                        <h3>Order Summary</h3>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        {/* Placeholder rows to keep the order summary layout consistent */}
                        <div className="summary-row">
                            <span>Delivery</span>
                            <span>₹0</span>
                        </div>

                        <div className="summary-row">
                            <span>GST</span>
                            <span>₹0</span>
                        </div>

                        <hr />

                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="summary-buttons">

                            <button
                                className="close-btn-cart"
                            disabled={showPopup}
                                onClick={() => navigate(-1)}
                            >
                                Close
                            </button>

                            <button
                                className="pay-btn"
                                onClick={handlePayment}
                                disabled={cartItems.length === 0 || showPopup}
                            >
                                Pay
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        {
            showCustomize && (
                <CustomizeModal
                    pizza={selectedPizza}
                    editingItem={editingItem}
                    onClose={() => setShowCustomize(false)}
                />
            )
        }

        <Popup
            open={showPopup}
            success={paymentSuccess}
            title={paymentSuccess ? "Payment Successful" : "Processing Payment"}
            message={paymentSuccess ? "Your order has been placed successfully." : "Please wait while we process your payment."}
        />

        {
            showLoginPopup && (
                <ConfirmationModal
                    icon=""
                    title="Login Required"
                    message="Please login to place your order."
                    confirmText="Login"
                    cancelText="Cancel"
                    onConfirm={() => {
                        setShowLoginPopup(false);
                        navigate("/login");
                    }}
                    onCancel={() => setShowLoginPopup(false)}
                />
            )
        }
    </main>
    );
}

export default Cart;