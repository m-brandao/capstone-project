import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <section>
        <h1>Little Lemon</h1>
        <h3>Chicago</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque velit
          ipsum hic est dolores ipsa, cumque et impedit laborum, dignissimos
          aliquam unde iusto quibusdam nemo vitae corrupti voluptate deleniti.
          Doloremque!
        </p>
        <button>
          <Link to={"/reservations"}>Reserve a table</Link>
        </button>
      </section>
      <section>
        <div>
          <img
            src={require("../assets/images/restauranfood.jpg")}
            alt="Showing some food served at the restaurant"
          />
        </div>
      </section>
    </header>
  );
}
