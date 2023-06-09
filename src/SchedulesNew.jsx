export function SchedulesNew(props) {

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentUserID = props.currentUser;
    const currentCollectedPlantID = props.currentCollectedPlantID;
    const params = new FormData(event.target);
    
    params.set("user_id", currentUserID);
    params.set("collected_plant_id", currentCollectedPlantID);
  
    props.onCreateSchedule(params);
    window.location.href = "/schedules";
  };
  

  return (
    <div>
      <h1>New Schedule</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          User ID: <input name="user_id" type="number" required />
        </div>
        <div>
          Collected Plant ID: <input name="collected_plant_id" type="number" required />
        </div> */}
        <div>
          days_to_water: <input name="days_to_water" type="number" required />
        </div>
        <div>
          Watering Start Date: <input name="watering_start_date" type="datetime" required />
        </div>
        <button type="submit">Create Schedule</button>
      </form>
    </div>
  );
}
