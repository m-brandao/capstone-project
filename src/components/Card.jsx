export default function Card({id, title, description, price, imageURL}) {

    return (
        <article className='card'>
            <div className='card-image'>
                <img src={`${imageURL}`} alt={title} loading='lazy' />
            </div>
            <div className='card-title'>
                <h3>{title}</h3>
                <p className='price'>{price}</p>
            </div>

            <div className="card-body">
                <p>{description}</p>
            </div>

            <div className='card-footer'>
                <button href='#'>Order a delivery</button>
                <a href='#'><img className='delivery-icon' src={require('../assets/images/delivery-icon.svg').default} /></a>
            </div>
        </article>
    )
}
