export function SchedulesShow(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateSchedule(props.schedule.id, params)
    window.location.href = '/schedules';
  };

  const handleDestroy = () => {
    props.onDestroySchedule(props.schedule);
  };

  return (
    <div>
      <h1>Schedule information</h1>
      <p>User ID: {props.schedule.user_id}</p>
      <p>Collected Plant ID: {props.schedule.collected_plant_id}</p>
      <p>Watering Start Date: {props.schedule.watering_start_date}</p>
      
      <form onSubmit={handleSubmit}>
        <div id="schedule.edit-form">
          <p>
            User ID: <input defaultValue={props.schedule.user_id} name="user_id" type="number" required />
          </p>
        
          <p>
            Collected Plant ID: <input defaultValue={props.schedule.collected_plant_id} name="collected_plant_id" type="number" required />
          </p>
        
          <p>
            Watering Start Date: <input defaultValue={props.schedule.watering_start_date} name="watering_start_date" type="date" required />
          </p>
        </div>
        <button type="submit">Update schedule</button>
      </form>
      <button onClick={handleDestroy}>Destroy schedule</button>
    </div>
  );
}









