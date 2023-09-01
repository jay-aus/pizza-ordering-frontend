function ReviewScreen({ selectedPizzas, totalOrderPrice }) {  
    return (
      <div className="review-screen">
        <h2>Review Your Order</h2>
        <ul>
          {Object.keys(selectedPizzas).map((flavor, index) => (
            <li key={flavor}>
              {index + 1}. {flavor} - Qty: {selectedPizzas[flavor]}
            </li>
          ))}
        </ul>
        <p>Total Order Price: {totalOrderPrice}</p>
      </div>
    );
  }
  
  export default ReviewScreen;
  