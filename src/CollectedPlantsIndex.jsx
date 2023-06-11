import { useState } from 'react';
import { Modal } from './Modal';
import { SchedulesNew } from './SchedulesNew';

export function CollectedPlantsIndex(props) {
  const [isAddScheduleModalVisible, setIsAddScheduleModalVisible] = useState(false);

  const showAddScheduleModal = () => {
    setIsAddScheduleModalVisible(true);
  };

  const handleCreateSchedule = (params) => {
    props.onCreateSchedule(params);
    setIsAddScheduleModalVisible(false);
  };

  const handleUpdateCustomName = (collectedPlantId) => {
    const updatedCustomName = prompt('Give your plant a custom name!');
    if (updatedCustomName) {
      props.onUpdateCollectedPlant(collectedPlantId, { custom_name: updatedCustomName })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
        console.log('Error updating custom name:', error);
        });
    }
  };

  return (
    <div id="collected-plants-index">
      <hr />
      <h1>Plant Collection</h1>
      <hr />
      {props.collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          
          <h2><b>{collectedPlant.custom_name || collectedPlant.plant.name}</b></h2>
          {!collectedPlant.custom_name && (
            <button onClick={() => handleUpdateCustomName(collectedPlant.id)}>
              Give your plant a nickname!
            </button>
          )}
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
          
          <p>Loves {collectedPlant.plant.sun_amount} sun</p>
          <p>Schedule: {collectedPlant.schedule.watering_start_date}</p>
          <p>{collectedPlant.notes}</p>

          <button onClick={() => props.onShowCollectedPlant(collectedPlant)}>
            Plant Settings
          </button>

          <button className="modal-button" onClick={showAddScheduleModal}>
            Create Schedule
          </button>
          <br />
          <br />
          <hr />

          {isAddScheduleModalVisible && (
            <Modal show={isAddScheduleModalVisible} onClose={() => setIsAddScheduleModalVisible(false)}>
              <SchedulesNew onCreateSchedule={handleCreateSchedule} />
            </Modal>
          )}
        </div>
      ))}
    </div>
  );
}