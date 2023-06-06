export function CollectedPlantsIndex(props) {
  return (
    <div is="collected-plants-index">
      <h1>Collected Plants</h1>
      {props.collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          <h3>{collectedPlant.custom_name}</h3>
          <p>Notes: {collectedPlant.notes}</p>
          <p><img src={collectedPlant.users_image} alt="Plant Image" className="plant-image" /></p>
          <p>User ID: {collectedPlant.user_id}</p>
          <p>Plant ID: {collectedPlant.plant_id}</p>

          <button onClick={() => props.onShowCollectedPlant(collectedPlant)}>Show Details</button>
        </div>
      ))}
    </div>
  );
}
