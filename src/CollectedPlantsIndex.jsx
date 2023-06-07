export function CollectedPlantsIndex(props) {
  return (
    <div is="collected-plants-index">
      <h1>Collected Plants</h1>
      {props.collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          <h2>{collectedPlant.custom_name}</h2>
          <h4>{collectedPlant.plant.name}</h4>
          
          <p><img src={collectedPlant.users_image} alt="Plant Image" className="plant-image" /></p>
          <button onClick={() => props.onShowCollectedPlant(collectedPlant)}>Show Details</button>
        </div>
      ))}
    </div>
  );
}
