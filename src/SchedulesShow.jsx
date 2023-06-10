export function SchedulesShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log('handleSubmit params:', params);
    props.onUpdateSchedule(props.schedule.id, params);
    window.location.href = '/schedules';
  };

  const handleDestroy = () => {
    console.log('handleDestroy schedule:', props.schedule);
    props.onDestroySchedule(props.schedule);
  };

  return (
    <div>
      <h1>Schedule information</h1>
      <p>Needs watering every <b>{props.schedule.days_to_water}</b> days.</p>
      <p>Watering Start Date: {props.schedule.watering_start_date}</p>

      <form onSubmit={handleSubmit}>
        <div id="schedule.edit-form">
          <input name="user_id" type="hidden" value={props.schedule.user_id} />

          <p>
            Days between watering:{" "}
            <input defaultValue={props.schedule.days_to_water} name="days_to_water" type="number" required />
          </p>

          <p>
            Watering Start Date:{" "}
            <input defaultValue={props.schedule.watering_start_date} name="watering_start_date" type="date" required />
          </p>
        </div>
        <button type="submit">Update schedule</button>
      </form>
      <button onClick={handleDestroy}>Destroy schedule</button>
    </div>
  );
}
