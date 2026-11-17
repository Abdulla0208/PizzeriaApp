import { useState } from "react";
import { useCart } from "../../context/CartContext";
import toppings from "../../data/Toppins.json";
import "./CustomizeModal.css";

function CustomizeModal({ pizza, editingItem = null, onClose }) {

    const [selectedToppings, setSelectedToppings] = useState(() => {
        if (!editingItem) return {};
        const initial = {};
        editingItem.toppings.forEach((top) => {
            initial[top.id] = top.quantity;
        });
        return initial;
    });

    const { addToCart, updateCartItem } = useCart();

    if (!pizza) return null;

    const increaseQuantity = (id) => {
        setSelectedToppings((prev) => ({
            ...prev,
            [id]: Math.min((prev[id] || 0) + 1, 2),
        }));
    };

    const decreaseQuantity = (id) => {
        setSelectedToppings((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0),
        }));
    };

    const extraTotal = toppings.reduce((total, item) => {
        return total + ((selectedToppings[item.id] || 0) * item.price);
    }, 0);

    const grandTotal = pizza.price + extraTotal;

    const handleAddToCart = () => {
    // Only keep toppings whose quantity is greater than 0
        const selectedExtras = toppings
            .filter(item => (selectedToppings[item.id] || 0) > 0)
            .map(item => ({
                id: item.id,
                name: item.tname,
                price: item.price,
                quantity: selectedToppings[item.id]
            }));

        const cartItem = {
            cartId: crypto.randomUUID(),
            pizzaId: pizza.id,
            name: pizza.name,
            image: pizza.image,
            basePrice: pizza.price,
            toppings: selectedExtras,
            extraPrice: extraTotal,
            totalPrice: grandTotal,
            quantity: 1
        };

        if (editingItem) {
            updateCartItem(editingItem.cartId, {
                ...cartItem,
                quantity: editingItem.quantity
            });
        } else {
            addToCart(cartItem);
        }
    onClose();
    };

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="customize-modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER*/}
                <div className="modal-header">
                    <h2>Customize Your Pizza</h2>
                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* SCROLLABLE CONTENT*/}

                <div className="modal-content">
                    {/* PREVIEW CARD*/}
                    <div className="preview-card">
                        {/* Top Section */}
                        <div className="pizza-details">
                            <img
                                src={pizza.image}
                                alt={pizza.name}
                                className="preview-image"
                            />
                            <div className="preview-info">
                                <h3>{pizza.name}</h3>
                                <p>{pizza.description}</p>
                                <h4>₹{pizza.price}</h4>
                            </div>
                        </div>
                        {/* Included Ingredients */}
                        <div className="preview-block">
                            <h6>Included Ingredients</h6>
                            <div className="badge-wrapper">
                                {pizza.ingredients.map((ingredient, index) => (
                                    <span
                                        key={index}
                                        className="ingredient-badge badge rounded-pill"
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Default Toppings */}
                        <div className="preview-block">
                            <h6>Default Toppings</h6>
                            <div className="badge-wrapper">
                                {pizza.topping.map((item, index) => (
                                    <span
                                        key={index}
                                        className="topping-badge badge rounded-pill"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* EXTRA TOPPINGS*/}
                    <section className="custom-section">
                        <h3>Extra Toppings</h3>
                        <p className="extra-note">
                            Maximum 2 quantities allowed per topping.
                        </p>
                        <div className="toppings-list">
                            {toppings.map((item) => (
                                <div
                                key={item.id}
                                className={`topping-item ${
                                (selectedToppings[item.id] || 0) > 0
                                    ? "selected"
                                    : ""
                            }`}
                        >
                            <div className="topping-info">
                                <img
                                    src={item.image}
                                    alt={item.tname}
                                    className="topping-image"
                                />
                                <div>
                                    <h5>{item.tname}</h5>
                                    <span>₹{item.price}</span>
                                </div>
                            </div>
                            <div className="quantity-controls">
                                <button
                                    disabled={(selectedToppings[item.id] || 0) === 0}
                                    onClick={() => decreaseQuantity(item.id)}
                                >
                                    −
                                </button>
                                <span>
                                    {selectedToppings[item.id] || 0}
                                </span>
                                <button
                                    disabled={(selectedToppings[item.id] || 0) === 2}
                                    onClick={() => increaseQuantity(item.id)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        ))}
                        </div>
                    </section>
                </div>

                {/* FOOTER */}
                <div className="modal-footer">
                    <div className="footer-total">
                        <span>Total</span>
                        <strong>₹{grandTotal}</strong>
                    </div>

                    <button className="add-cart-btn"
                        onClick={handleAddToCart}>
                        {editingItem ? "Update Cart" : "Add To Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomizeModal;