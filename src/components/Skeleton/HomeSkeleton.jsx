import "./Skeleton.css";

function HomeSkeleton() {

    return (

        <main className="home">
            {/* OUR STORY */}
            <section className="story-section">
                <div className="container">
                    <div className="section-heading">
                        <div className="skeleton skeleton-heading"></div>
                        <div className="skeleton skeleton-line"></div>
                    </div>
                    <div className="story-card">
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text short"></div>
                        <br />
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text short"></div>
                        <br />
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text short"></div>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTIONS */}
            {[1, 2, 3].map((item) => (
                <section
                    className="ingredients-section"
                    key={item}
                >
                    <div className="container">
                        <div className="row align-items-center section-card">
                            <div className="col-lg-6">
                                <div className="skeleton skeleton-image-large"></div>
                            </div>
                            <div className="col-lg-6">
                                <div className="section-content">
                                    <div className="skeleton skeleton-heading"></div>
                                    <div className="skeleton skeleton-text"></div>
                                    <div className="skeleton skeleton-text"></div>
                                    <div className="skeleton skeleton-text short"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </main>
    );

}

export default HomeSkeleton;