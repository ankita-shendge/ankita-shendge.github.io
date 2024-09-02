const HeroSection = () => {
  return (
    <main className="hero ">
      <div className="hero-content">
        <h1>Your Feet Deserve Best</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
          laborum iusto dolore non! Id consequuntur optio illo provident, esse
          sapiente a. Ipsum minus exercitationem fugit voluptatibus molestias
          quam ullam iste!
        </p>
        <div className="btn">
          <button className="hero-btn">Shop Now</button>
          <button className="secondary-btn">Category</button>
        </div>
        <div className="shop-on">
          <p>Available On</p>
          <div className="brand-icons">
            <img src="/images/amazon.png" alt="amazon-logo" />
            <img src="/images/flipkart.png" alt="flipkart-logo" />
          </div>
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/shoe_image.png" alt="" />
      </div>
    </main>
  );
};

export default HeroSection;
