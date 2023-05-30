export function PlantsIndex(props) {
  return (
    <div>
      <h1>All plants</h1>
      {props.plants.map((plant) => (
        <div key={plant.id}>
          <h2>{plant.name}</h2>
            <p>Description: {plant.description}</p>
            <p>Days to water: {plant.days_to_water}</p>
            <p>Amount of sun: {plant.sun_amount}</p>
        </div>
      ))}
    </div>
  );
}