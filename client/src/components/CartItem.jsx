const CartItem = () => {
    return (
        <div className="cart-item">
        <div className="details">

          <div className="title-price-x">
              <h4 className="title-price">
                <p></p>
                <p className="cart-item-price">$ </p>
              </h4>
              <i onclick="removeItem(${id})" className="bi bi-x-lg"></i>
          </div>

          <div className="buttons">
              <i  className="bi bi-dash-lg"></i>
              <div  className="quantity"></div>
              <i  className="bi bi-plus-lg"></i>
          </div>

          <h3>$ $</h3>
        </div>
      </div>
    )
}

export default CartItem;