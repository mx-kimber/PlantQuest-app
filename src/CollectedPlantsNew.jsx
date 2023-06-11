export function CollectedPlantsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log('handleSubmit params:', params);
    props.onCreateCollectedPlant(params);
    window.location.href = '/collected_plants';
  };
  
  return (
    <div>
      <h1>New Collected Plant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          User ID: <input name="user_id" type="number" required />
        </div>
        <div>
          Plant ID: <input name="plant_id" type="number" required />
        </div>
        <div>
          Custom Name: <input name="custom_name" type="text" required />
        </div>
        <div>
          Notes: <textarea name="notes" required></textarea>
        </div>
        <div>
          Users Image: <input name="users_image" type="text" required />
        </div>
        <button onClick="submit">Create Collected Plant</button>
      </form>
    </div>
  );
}

