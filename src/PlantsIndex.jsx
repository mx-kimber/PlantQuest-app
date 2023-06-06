export function PlantsIndex(props) {
  return (
    <div id="plants-index">
      <h1>All plants</h1>
      {props.plants.map((plant) => (
        <div key={plant.id}>
          <h2>{plant.name}</h2>
            <p>Description: {plant.description}</p>
            <p>Amount of sun: {plant.sun_amount}</p>
            <p>Days to water: {plant.days_to_water}</p>
            
            <button onClick={() => props.onShowPlant(plant)}>More info</button>
        </div>
      ))}
    </div>
  );
}