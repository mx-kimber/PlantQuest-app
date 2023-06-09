export function SchedulesNew(props) {
  console.log('props:', props);
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log('handleSubmit params:', params);
    props.onCreateSchedule(params)
    window.location.href = "/schedules";
  };

  return (
    <div>
      <h1>New Schedule</h1>
      <form onSubmit={handleSubmit}>
        <div>
          User ID: <input name="user_id" type="number" />
        </div>
        <div>
          Collected Plant ID: <input name="collected_plant_id" type="number"/>
        </div>
        <div>
          Days between: <input name="days_to_water" type="number" required />
        </div>
        <div>
          Watering Start Date: <input name="watering_start_date" type="date" required />
        </div>
        <button type="submit">Create Schedule</button>
      </form>
    </div>
  );
}