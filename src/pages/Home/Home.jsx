import { useEffect, useState } from "react";
import HomeSkeleton from "../../components/Skeleton/HomeSkeleton";
import "./Home.css";

function Home() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <main className="home">

      {/* OUR STORY */}
      <section className="story-section">
        <div className="container">
          <div className="section-heading">
            <h2>Our Story</h2>
            <div className="heading-line"></div>
          </div>

          <div className="story-card">
            <p className="story-text"> We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. 
              Fans were given situations where they had to come up with wacky and fun excuses. 
              The person with the best excuse won the Best Excuse Badge and won Pizzeria's vouchers. 
              Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever! </p>
            <br />
            <p className="story-text"> Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist the softest, 
              cheesiest, crunchiest, butteriest Pizzeria's Fresh Pan Pizza. They have been leaving the stage in the middle of a 
              performance and even finding excuses to be disqualified in a football match. </p>
            <br />
            <p className="story-text"> We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. 
              Fans were given situations where they had to come up with wacky and fun excuses. 
              The person with the best excuse won the Best Excuse Badge and won Pizzeria's vouchers. 
              Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever! </p>
          </div>
        </div>
      </section>

      {/* FRESH INGREDIENTS */}
      <section className="ingredients-section">
        <div className="container">
          <div className="row align-items-center section-card">
      
            {/* Left */}
            <div className="col-lg-6">
              <img
                src="/images/ingredients.jpeg"
                alt="Fresh Ingredients"
                className="section-image"
              />
            </div>

            {/* Right */}
            <div className="col-lg-6">
              <div className="section-content">
                <h2 className="section-title">
                  Fresh Ingredients
                </h2>
                <p className="section-description">
                  We're ruthless about goodness. We have no qualms about tearing up a day-old lettuce leaf (straight from the farm), 
                  or steaming a baby carrot. Cut. Cut. Chop. Chop. Steam. Steam. Stir. Stir. While they're still young and fresh - 
                  that's our motto. It makes the kitchen a better place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR CHEFS */}
      <section className="chef-section">
        <div className="container">
          <div className="row align-items-center section-card">

          {/* Left */}
            <div className="col-lg-6">
              <div className="section-content">
                <h2 className="section-title">
                  Our Chefs
                </h2>
                <p className="section-description">
                  Our experienced CHEF's make sauces sing and salads dance. 
                  They create magic with skill, knowledge, passion, and stirring spoons (among other things). 
                  They make goodness so good, it doesn't know what to do with itself. We do though. We send it to you.
                </p>
              </div>
            </div>

          {/* Right */}

          <div className="col-lg-6">
            <img
              src="/images/chef.jpeg"
              alt="Our Chefs"
              className="section-image"
            />
          </div>
        </div>
      </div>
    </section>

    {/* 45 MIN DELIVERY */}
    <section className="delivery-section">
      <div className="container">
        <div className="row align-items-center section-card">
          {/* Left */}
            <div className="col-lg-6">
              <img
                src="/images/Timer.jpg"
                alt="Delivery"
                className="section-image"
              />
            </div>

          {/* Right */}
          <div className="col-lg-6">
            <div className="section-content">
              <h2 className="section-title">
                45 Minutes Delivery
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
  );
}

export default Home;