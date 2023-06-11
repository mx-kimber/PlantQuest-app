export function SchedulesIndex(props) {
  console.log('props:', props);
  return (
    <div id="schedules-index">
      <h1>All Schedules</h1>
      {props.schedules.map((schedule) => (
        <div key={schedule.id}>
          {schedule.collected_plant && schedule.collected_plant.plant && (
            <div>
              <h3>
                {schedule.collected_plant.custom_name || schedule.collected_plant.plant.name}
              </h3>
            </div>
          )}
          <p>Days to water: {schedule.days_to_water}</p>
          <p>Watering Start Date: {schedule.watering_start_date}</p>
          
          <button onClick={() => props.onShowSchedule(schedule)}>Edit Schedule</button>
        </div>
      ))}
    </div>
  );
}






