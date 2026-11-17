import "./Skeleton.css";

function PizzaCardSkeleton() {

    return (

        <div className="pizza-card">
            {/* Veg Badge */}
            <div className="skeleton skeleton-badge"></div>
            {/* Image */}
            <div className="pizza-image">
                <div className="skeleton skeleton-pizza-image"></div>
            </div>

            {/* Content */}
            <div className="pizza-content">
                <div className="skeleton skeleton-card-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text short"></div>
                <div className="skeleton skeleton-price-label"></div>
                <div className="skeleton skeleton-price"></div>
            </div>

            {/* Button */}
            <div className="pizza-action">
                <div className="skeleton skeleton-add-btn"></div>
                <div className="skeleton skeleton-customisable"></div>
            </div>
        </div>
    );
}

export default PizzaCardSkeleton;