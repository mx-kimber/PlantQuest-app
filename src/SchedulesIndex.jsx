export function SchedulesIndex(props) {
  return (
    <div id="schedules-index">
      <h1>All Schedules</h1>
      {props.schedules.map((schedule) => (
        <div key={schedule.id}>
          {schedule.nickname && <h1>{schedule.nickname}</h1>}
          {schedule.collected_plant && <p>{schedule.collected_plant}</p>}
          <p>Days to water: {schedule.days_to_water}</p>
          <p>Watering Start Date: {schedule.watering_start_date}</p>
          
          <button onClick={() => props.onShowSchedule(schedule)}>Edit Schedule</button>
        </div>
      ))}
    </div>
  );
}



