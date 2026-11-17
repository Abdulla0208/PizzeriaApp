import "./Skeleton.css";

function CartSkeleton() {

    return (

        <main className="cart-page">
            <div className="container">
                <div className="skeleton skeleton-cart-title"></div>
                <div className="cart-layout">
                    {/* Left */}
                    <section className="cart-items">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div
                                className="cart-card"
                                key={index}
                            >
                                <div className="skeleton skeleton-cart-image"></div>
                                <div className="cart-info">
                                    <div className="skeleton skeleton-card-title"></div>
                                    <div className="skeleton skeleton-text"></div>
                                    <div className="skeleton skeleton-text short"></div>
                                    <div className="cart-bottom">
                                        <div className="cart-actions">
                                            <div className="skeleton skeleton-link"></div>
                                            <div className="skeleton skeleton-link"></div>
                                        </div>
                                        <div className="quantity-box">
                                            <div className="skeleton skeleton-qty"></div>
                                            <div className="skeleton skeleton-number"></div>
                                            <div className="skeleton skeleton-qty"></div>
                                        </div>
                                    </div>
                                    <div className="skeleton skeleton-price"></div>
                                </div>
                            </div>
                        ))}
                    </section>
                    {/* Right */}
                    <aside className="order-summary">
                        <div className="skeleton skeleton-summary-title"></div>
                        <div className="skeleton skeleton-summary-row"></div>
                        <div className="skeleton skeleton-summary-row"></div>
                        <div className="skeleton skeleton-summary-row"></div>
                        <div className="skeleton skeleton-total"></div>
                        <div className="skeleton skeleton-summary-btn"></div>
                        <div className="summary-buttons">
                            <div className="skeleton skeleton-half-btn"></div>
                            <div className="skeleton skeleton-half-btn"></div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default CartSkeleton;