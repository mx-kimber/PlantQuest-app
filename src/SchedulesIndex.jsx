export function SchedulesIndex(props) {
  return (
    <div id="schedules-index">
      <h1>All Schedules</h1>
      {props.schedules.map((schedule) => (
        <div key={schedule.id}>
          <h2>Schedule ID: {schedule.id}</h2>
          <p>User ID: {schedule.user_id}</p>
          <p>Collected Plant ID: {schedule.collected_plant_id}</p>
          <p>Watering Start Date: {schedule.watering_start_date}</p>
          
          <button onClick={() => props.onShowSchedule(schedule)}>More info</button>
        </div>
      ))}
    </div>
  );
}
