export function SchedulesNew() {
  return (
    <div>
      <h1>New Schedule</h1>
      <form>
        <div>
          User ID: <input name="user_id" type="number" required />
        </div>
        <div>
          Collected Plant ID: <input name="collected_plant_id" type="number" required />
        </div>
        <div>
          Watering Start Date: <input name="watering_start_date" type="datetime" required />
        </div>
        <button type="submit">Create Schedule</button>
      </form>
    </div>
  );
}
