export function CollectedPlantsShow(props) {
  const { collectedPlant } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateCollectedPlant(collectedPlant.id, params, () => event.target.reset());
  };

  const handleDestroy = () => {
    props.onDestroyCollectedPlant(collectedPlant);
  };

  return (
    <div>
      <h2>Collected Plant Details</h2>
      <p>Custom Name: {collectedPlant.custom_name}</p>
      <p>Notes: {collectedPlant.notes}</p>
      <p>
        Image: <img src={collectedPlant.users_image} alt="Plant Image" className="plant-image" />
      </p>
      <form onSubmit={handleSubmit}>
        <div id="collectedPlant.edit-form">
          <p>
            Custom Name:{" "}
            <input defaultValue={collectedPlant.custom_name} name="custom_name" type="text" required />
          </p>
          <p>
            Notes: <input defaultValue={collectedPlant.notes} name="notes" type="text" required />
          </p>
        </div>
        <button type="submit">Update collected plant</button>
      </form>
      <button onClick={handleDestroy}>Destroy collected plant</button>
    </div>
  );
}
