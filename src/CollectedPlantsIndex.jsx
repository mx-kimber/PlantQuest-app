import { useState } from 'react';
import { Modal } from './Modal';
import { SchedulesNew } from './SchedulesNew';

export function CollectedPlantsIndex(props) {
  const [isAddScheduleModalVisible, setIsAddScheduleModalVisible] = useState(false);

  const showAddScheduleModal = () => {
    setIsAddScheduleModalVisible(true);
  };

  const handleCreateSchedule = (params) => {
    console.log('handleCreateSchedule params:', params);
    props.onCreateSchedule(params);
    setIsAddScheduleModalVisible(false);
  };

  const handleUpdateCustomName = (collectedPlantId) => {
    const updatedCustomName = prompt('Give your plant a custom name!');
    if (updatedCustomName) {
      console.log('handleUpdateCustomName updatedCustomName:', updatedCustomName);
      props.onUpdateCollectedPlant(collectedPlantId, 
        { custom_name: updatedCustomName })
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
          
          <h2>
            <b>{collectedPlant.custom_name || collectedPlant.plant.name}</b>
          </h2>
          {!collectedPlant.custom_name && (
            <button onClick={() => handleUpdateCustomName(collectedPlant.id)}>
              Give your plant a nickname!
            </button>
          )}
          {collectedPlant.users_image ? (
          
              <img
                src={collectedPlant.users_image}
                alt="Plant Image"
                className="plant-image"
              />
            
          ) : (
          
              <img
                src="https://smartgardenguide.com/wp-content/uploads/2019/10/zz-plant-stalks-falling-over-9.jpg"
                alt="Default Plant Image"
                className="plant-image"
              />
            
          )}
          <h4>{collectedPlant.plant.name}</h4>
          
          <button className="modal-button" onClick={showAddScheduleModal}>
            Create Schedule
          </button><button onClick={() => props.onShowCollectedPlant(collectedPlant)}>
            Plant Settings
          </button>

          <p>Loves {collectedPlant.plant.sun_amount} sun</p>
          <p>Notes: {collectedPlant.notes}</p>
         

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


