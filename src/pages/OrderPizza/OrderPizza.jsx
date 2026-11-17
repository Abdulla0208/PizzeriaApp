import { useState, useEffect } from "react";
import "./OrderPizza.css";
import pizzas from "../../data/Pizzas.json";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import CustomizeModal from "../../components/CustomizeModal/CustomizeModal";
import PizzaCardSkeleton from "../../components/Skeleton/PizzaCardSkeleton";

function OrderPizza() {
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [showCustomize, setShowCustomize] = useState(false);

  const handleCustomize = (pizza) => {
    setSelectedPizza(pizza);
    setShowCustomize(true);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="order-page">
      <div className="container">
        {/* Page Heading */}
        <div className="page-heading">
          <h1>Order Your Pizza</h1>
          <p>
            Choose your favorite pizza and customize it just the way you like.
          </p>
        </div>

        {/* Pizza Cards */}
        <div className="row g-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <div
                  className="col-lg-4 d-flex justify-content-center"
                  key={index}
              >
                <PizzaCardSkeleton />
              </div>
            ))
              : 
            pizzas.map((pizza) => (

              <div
                  className="col-lg-4 d-flex justify-content-center"
                  key={pizza.id}
              >
                <PizzaCard
                    pizza={pizza}
                    onCustomize={handleCustomize}
                />
              </div>
            ))}
        </div>
      </div>

      {showCustomize && (
        <CustomizeModal
          pizza={selectedPizza}
          onClose={() => setShowCustomize(false)}
        />
      )}

    </main>
  );
}

export default OrderPizza;