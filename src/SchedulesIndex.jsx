export function SchedulesIndex(props) {
  console.log('props:', props);
  return (
    <div id="schedules-index">
      <hr />
      <h1>All Schedules</h1>
      <hr />
      <br />
      {props.schedules.map((schedule) => (
        <div key={schedule.id}>
          {schedule.collected_plant && schedule.collected_plant.id && (
            <div>
              
              <p>
                {schedule.collected_plant.custom_name || schedule.collected_plant.plant.name},<br />[{schedule.collected_plant.plant.name}]
              </p>
            </div>
          )}
          <p>Days to water: {schedule.days_to_water}</p>
          <p>Watering Start Date: {schedule.watering_start_date}</p>
          
          <p><button onClick={() => props.onShowSchedule(schedule)}>Edit Schedule</button></p>
         
        </div>
      ))}
    </div>
  );
}






