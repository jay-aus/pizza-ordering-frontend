import React from 'react';

const MAX_PIZZAS_PER_TYPE = 8;

function PizzaDropdown({ pizzaFlavors, selectedPizzas, onSelectPizza }) {
  return (
    <div className="pizza-dropdown">
      {pizzaFlavors.map(pizza => (
        <div className="pizza-option" key={pizza.name}>
          <label>
            {`${pizza.name} ($${pizza.price})`}
            <input
              type="number"
              min="0"
              max={MAX_PIZZAS_PER_TYPE}
              value={selectedPizzas[pizza.name] || ''}
              onChange={e => {
                onSelectPizza(pizza.name, e.target.value);
              }}
              onFocus={() => {
                onSelectPizza(pizza.name, selectedPizzas[pizza.name] || '1');
              }}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default PizzaDropdown;
