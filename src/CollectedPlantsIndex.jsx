export function CollectedPlantsIndex({ collectedPlants, onShowCollectedPlant }) {
  return (
    <div>
      <h1>Collected Plants</h1>
      {collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          <h3>{collectedPlant.custom_name}</h3>
          <p>Notes: {collectedPlant.notes}</p>
          <p><img src={collectedPlant.users_image} alt="Plant Image" className="plant-image" /></p>
          <p>User ID: {collectedPlant.user_id}</p>
          <p>Plant ID: {collectedPlant.plant_id}</p>
          <button onClick={() => onShowCollectedPlant(collectedPlant)}>Show Details</button>
        </div>
      ))}
    </div>
  );
}
