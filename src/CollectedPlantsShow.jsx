export function CollectedPlantsShow({ collectedPlant }) {
  return (
    <div>
      <h2>Collected Plant Details</h2>
      <p>Custom Name: {collectedPlant.custom_name}</p>
      <p>Notes: {collectedPlant.notes}</p>
      <p>Image: <img src={collectedPlant.users_image} alt="Plant Image" /></p>
    </div>
  );
}
