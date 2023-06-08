import { Link } from 'react-router-dom';

export function CollectedPlantsIndex(props) {
  return (
    <div id="collected-plants-index">
      <h1>Collected Plants</h1>
      {props.collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          <h2>{collectedPlant.custom_name}</h2>
          {collectedPlant.users_image ? (
            <p>
              <img
                src={collectedPlant.users_image}
                alt="Plant Image"
                className="plant-image"
              />
            </p>
          ) : (
            <p>
              <img
                src="https://smartgardenguide.com/wp-content/uploads/2019/10/zz-plant-stalks-falling-over-9.jpg"
                alt="Default Plant Image"
                className="plant-image"
              />
            </p>
          )}
          <h4>{collectedPlant.plant.name}</h4>
          <p>Collected on {collectedPlant.created_at}</p>
          <p>Thirsty every {collectedPlant.schedule.days_to_water} days</p>
          <p>Loves {collectedPlant.plant.sun_amount} sun</p>
          <p>Notes: {collectedPlant.notes}</p>
          <button onClick={() => props.onShowCollectedPlant(collectedPlant)}>
            Edit Information
          </button>
          <button onClick={() => props.onShowOriginalPlant(collectedPlant.plant)}>
            Original Plant Information
          </button>
          <Link to="/schedules/new" className="modal-button">
            Add Schedule
          </Link>
        </div>
      ))}
    </div>
  );
}

