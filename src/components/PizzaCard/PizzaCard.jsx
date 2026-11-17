import "./PizzaCard.css";

function PizzaCard({ pizza, onCustomize }) {

  return (
    <div className="pizza-card">

      {/* Veg / Non Veg Badge */}

      <div
        className={`pizza-type ${
          pizza.type === "veg" ? "veg" : "non-veg"
        }`}
      ></div>

      {/* Pizza Image */}

      <div className="pizza-image">

        <img
          src={pizza.image}
          alt={pizza.name}
        />

      </div>

      {/* Content */}

      <div className="pizza-content">

        <h3>{pizza.name}</h3>

        <p>{pizza.description}</p>

        <span className="starting-text">
          Starting at
        </span>

        <h4>₹{pizza.price}</h4>

      </div>

      {/* Button */}

      <div className="pizza-action">

        <button className="add-btn"
        onClick={() => onCustomize(pizza)}>

          <span>Add</span>

          <span>+</span>

        </button>

        <p>Customisable</p>

      </div>

    </div>
  );
}

export default PizzaCard;