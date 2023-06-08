
export function CollectedPlantsShow(props) {
  const { collectedPlant } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateCollectedPlant(collectedPlant.id, params) 
    window.location.href = '/collected_plants';
  };

  const handleDestroy = () => {
    props.onDestroyCollectedPlant(collectedPlant);
  };

  return (
    <div id="plant-collection">
      <h1>{collectedPlant.custom_name}</h1>
      <img src={collectedPlant.users_image} alt="Plant Image" className="plant-image" />
      <h3>{collectedPlant.plant.name}</h3>
      <h3>{collectedPlant.plant.id}</h3>
      <p>Description: {collectedPlant.plant.description}</p>
      <p>Sun Amount: {collectedPlant.plant.sun_amount}</p>
      <p>Days between watering: {collectedPlant.schedule.days_to_water}</p>
      <p>Watering Start Date: {collectedPlant.schedule.watering_start_date}</p>
      <p>Notes: {collectedPlant.notes}</p>
      <form onSubmit={handleSubmit}>
        <div id="collectedPlant.edit-form">
          <p>
            Custom Name:{" "}
            <input defaultValue={collectedPlant.custom_name} name="custom_name" type="text" />
          </p>
          <p>
            Notes: <input defaultValue={collectedPlant.notes} name="notes" type="text" />
          </p>
          <p>
            Users Image: <input name="users_image" type="text" />
          </p>
        </div>
        <button type="submit">Update collected plant</button>
      </form>
      
      <button onClick={handleDestroy}>Destroy collected plant</button>
    </div>
  );
}
