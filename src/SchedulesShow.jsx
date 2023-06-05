export function SchedulesShow(props) {
  const { schedule } = props;

  return (
    <div>
      <h1>Schedule Information</h1>
      <p>ID: {schedule.id}</p>
      <p>User ID: {schedule.user_id}</p>
      <p>Collected Plant ID: {schedule.collected_plant_id}</p>
      <p>Watering Start Date: {schedule.watering_start_date}</p>
      
    </div>
  );
}








