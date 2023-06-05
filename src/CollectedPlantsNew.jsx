export function CollectedPlantsNew() {
  return (
    <div>
      <h1>New Collected Plant</h1>
      <form>
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
        <button type="submit">Create Collected Plant</button>
      </form>
    </div>
  );
}

