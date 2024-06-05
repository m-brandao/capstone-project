import './App.scss';
import LLLogo from './assets/images/LittleLemonLogo.png';

const cardData = [
  {
    id: 1,
    title: 'Greek Salad',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a  pulvinar dolor. Duis gravida ultricies ipsum, sit amet vehicula mi.',
    price: '$10.99',
    imageURL: './assets/images/greek_salad.png'
  },
  {
    id: 2,
    title: 'Bruschetta',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a  pulvinar dolor. Duis gravida ultricies ipsum, sit amet vehicula mi.',
    price: '$7.99',
    imageURL: './assets/images/Bruschetta.png'
  },
  {
    id: 3,
    title: 'Lemon Dessert',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a  pulvinar dolor. Duis gravida ultricies ipsum, sit amet vehicula mi.',
    price: '$5.99',
    imageURL: './assets/images/lemon_dessert.png'
  }
]

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li className='logo'>
            <a href="#">
              <img src={LLLogo} alt='Little Lemon Logo' />
            </a>
          </li>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Reservations</a></li>
          <li><a href="#">Order Online</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </nav>
      <header>
        <section>
          <h1>Little Lemon</h1>
          <h3>Chicago</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque velit ipsum hic est dolores ipsa, cumque et impedit laborum, dignissimos aliquam unde iusto quibusdam nemo vitae corrupti voluptate deleniti. Doloremque!</p>

          <button href="#">Reserve a table</button>
        </section>
        <section>
          <div>
            <img src={require('./assets/images/restauranfood.jpg')} alt="Image showing some foode served at the restaurant" />
          </div>
        </section>
      </header>
      <main>
        <section id='highlights-section'>
          <div className='first-row'>
            <h2>This week specials!</h2>
            <button href="#">Online Menu</button>
          </div>

          <div className='grid-card'>
            {cardData.map(card => (
              <article className='card'>
                <div className='card-image'>
                  <img src={require(`${card.imageURL}`)} alt={card.title} />
                </div>
                <div className='card-title'>
                  <h3>{card.title}</h3>
                  <p className='price'>{card.price}</p>
                </div>

                <div className="card-body">
                  <p>{card.description}</p>
                </div>

                <div className='card-footer'>
                  <button href='#'>Order a delivery</button>
                  <a href='#'><img className='delivery-icon' src={require('./assets/images/delivery-icon.svg').default} /></a>
                </div>
              </article>
            ))}

          </div>
        </section>

        <section id='testimonials-section'>Testimonials</section>
        <section id='about-section'>About</section>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
