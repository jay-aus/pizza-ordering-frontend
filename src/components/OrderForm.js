import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDropdown from './LocationDropdown';
import PizzaDropdown from './PizzaDropdown';
import SubmitButton from './SubmitButton';
import ReviewScreen from './ReviewScreen';
import '../css/OrderForm.css';
const BASE_URL = 'http://localhost:3001'; // move to env variable or const file

const MAX_TOTAL_PIZZAS = 15;

const INFO_MESSAGE =
  '* Please note you can order a maximum of 8 pizzas of one type; and a combined order of no more than 15 pizzas';

function OrderForm() {
  const [locationsData, setLocationsData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPizzas, setSelectedPizzas] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [isPizzaSelected, setIsPizzaSelected] = useState(false);
  const [isError, setIsError] = useState('');
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [areQuantitiesFrozen, setAreQuantitiesFrozen] = useState(false);
  const [isReviewingOrder, setIsReviewingOrder] = useState(false);



  useEffect(() => {
    axios.get(`${BASE_URL}/locations`)
      .then(response => {
        setLocationsData(response.data);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  }, []);

  const validatePizzaOrder = () => {
    if (!selectedLocation) {
      setIsLocationSelected(true);
      return false;
    }

    const totalOrderedPizzas = Object.values(selectedPizzas).reduce(
      (total, quantity) => total + parseInt(quantity),
      0
    );

    if (totalOrderedPizzas === 0) {
      setIsPizzaSelected(true);
      return false;
    }

    if (totalOrderedPizzas > MAX_TOTAL_PIZZAS) {
      setIsSuccess(false);
      setIsPizzaSelected(false);
      setIsError(
        `You can order a maximum of ${MAX_TOTAL_PIZZAS} pizzas in total. Current total: ${totalOrderedPizzas}`
      );
      return false;
    }

    return true;
  };

  const calculateTotalPrice = async () => {
    try {
      const orders = Object.keys(selectedPizzas).map(flavor => ({
        pizza: flavor,
        quantity: parseInt(selectedPizzas[flavor])
      }));

      const response = await axios.post(`${BASE_URL}/calculateTotalPrice`, {
        location: selectedLocation,
        orders
      });

      return response.data.totalPrice;
    } catch (error) {
      console.error('API Error:', error);
      return 0;
    }
  };

  const handleAdd = async () => {
    if (validatePizzaOrder()) {
      const totalPrice = await calculateTotalPrice();
      setTotalOrderPrice(totalPrice);
      setIsReviewVisible(true);
      setIsSuccess(false);
      setIsError('');
      setAreQuantitiesFrozen(true); // Freeze the quantities
      setIsReviewingOrder(true);
    }
  };

  const handleCancel = () => {
    setIsReviewingOrder(false);
    setIsReviewVisible(false);
    setAreQuantitiesFrozen(false);
    setSelectedPizzas({});
  };
  

  const handleConfirm = () => {
    // Implement the logic for handling the confirmation here
    alert("You will be taken to the payment screen");
    setIsReviewVisible(false);
    setIsReviewingOrder(false);
    setAreQuantitiesFrozen(false);
    setSelectedPizzas({});
  };

  const handleLocationChange = e => {
    setSelectedLocation(e.target.value);
    setIsLocationSelected(false);
    setIsPizzaSelected(false);
    setIsError('');
    setSelectedPizzas({});
    setIsReviewVisible(false);
  };

  return (
    <div className="order-form">
      <div className="info-message">{INFO_MESSAGE}</div>
      <h2>Place Your Pizza Order</h2>
      <LocationDropdown
        locations={locationsData.map(location => location.name)}
        selectedLocation={selectedLocation}
        onSelectLocation={handleLocationChange}
      />
      {isLocationSelected && <div className="error-box">Please select a location</div>}
      <PizzaDropdown
        pizzaFlavors={
          locationsData.find(location => location.name === selectedLocation)?.menu || []
        }
        selectedPizzas={selectedPizzas}
        onSelectPizza={(flavor, quantity) => {
            if (!areQuantitiesFrozen) {
              setSelectedPizzas(prevPizzas => {
                setIsError(''); // Clear the error
                return { ...prevPizzas, [flavor]: quantity };
              });
            }
            setIsPizzaSelected(false);
          }}
      />
      {isReviewVisible ? (
  <ReviewScreen selectedPizzas={selectedPizzas} totalOrderPrice={totalOrderPrice} />
) : (
  <>
    {isReviewingOrder ? (
      <>
        <SubmitButton onSubmit={handleConfirm} isSuccess={isSuccess} label="Confirm" />
        <button onClick={() => handleCancel()}>Cancel</button>
      </>
    ) : (
      <SubmitButton onSubmit={handleAdd} isSuccess={isSuccess} label="Add" />
    )}
  </>
)}
      {isReviewVisible ? (
        <SubmitButton onSubmit={handleConfirm} isSuccess={isSuccess} label="Confirm" />
      ) : null}
      {isPizzaSelected && <div className="error-box">Please select at least one pizza flavor</div>}
      {isError && <div className="error-box">{isError}</div>}
    </div>
  );
}

export default OrderForm;
