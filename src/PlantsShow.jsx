export function PlantsShow(props) {

  return (
    <div id="plant-information">
      <h1>Plant information</h1>
      <p>Name: {props.plant.name}</p>
      <p>Description: {props.plant.description}</p>
      <p>Amount of Sun: {props.plant.sun_amount}</p>
      
    </div>
  );
}


