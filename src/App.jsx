import "./App.scss";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";

const cardData = [
  {
    id: 1,
    title: "Greek Salad",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a  pulvinar dolor. Duis gravida ultricies ipsum, sit amet vehicula mi.",
    price: "$10.99",
    imageURL: "/assets/images/greek_salad.png",
  },
  {
    id: 2,
    title: "Bruschetta",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a  pulvinar dolor. Duis gravida ultricies ipsum, sit amet vehicula mi.",
    price: "$7.99",
    imageURL: "/assets/images/Bruschetta.png",
  },
  {
    id: 3,
    title: "Lemon Dessert",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a  pulvinar dolor. Duis gravida ultricies ipsum, sit amet vehicula mi.",
    price: "$5.99",
    imageURL: "/assets/images/lemon_dessert.png",
  },
];

function App() {
  return (
    <div className="App">
      <Navbar />
      <header>
        <section>
          <h1>Little Lemon</h1>
          <h3>Chicago</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
            velit ipsum hic est dolores ipsa, cumque et impedit laborum,
            dignissimos aliquam unde iusto quibusdam nemo vitae corrupti
            voluptate deleniti. Doloremque!
          </p>
          <button href="#">Reserve a table</button>
        </section>
        <section>
          <div>
            <img
              src={require("./assets/images/restauranfood.jpg")}
              alt="Showing some food served at the restaurant"
            />
          </div>
        </section>
      </header>
      <main>
        <section id="highlights-section">
          <div className="first-row">
            <h2>This week specials!</h2>
            <button href="#">Online Menu</button>
          </div>

          <div className="grid-card">
            {cardData.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                price={card.price}
                imageURL={card.imageURL}
              />
            ))}
          </div>
        </section>

        <Testimonials />

        <section id="about-section">
          <div>
            <h2>Little Lemon</h2>
            <h3>Chicago</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
              velit ipsum hic est dolores ipsa, cumque et impedit laborum,
              dignissimos aliquam unde iusto quibusdam nemo vitae corrupti
              voluptate deleniti. Doloremque!
            </p>
          </div>

          <div className="images-column">
            <div>
              <img src={require("./assets/images/restaurant_chef_B.jpg")} />
            </div>
            <div className="absolute-parent">
              <img
                className="absolute"
                src={require("./assets/images/Mario_and_Adrian_A.jpg")}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
