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
      <br />
      {props.collectedPlants.map((collectedPlant) => (
        <div key={collectedPlant.id}>
          
          <h2>
            {collectedPlant.custom_name || collectedPlant.plant.name}
          </h2>
          

          {collectedPlant.users_image ? (
             <img
                src={collectedPlant.users_image}
                alt="Plant Image"
                className="plant-image"
              />
            
          ) : (
          
              <img
                src="https://bloody-disgusting.com/wp-content/uploads/2019/06/Little-Shop-of-Horrors-e1560782203967.jpg"
                alt="Default Plant Image"
                className="plant-image"
              />
            
          )}
          <br />
          <br />
          <p>{!collectedPlant.custom_name && (
           <button onClick={() => handleUpdateCustomName(collectedPlant.id)}>
              Name your plant!
            </button>
          )}</p>
          <p>Common Name: {collectedPlant.plant.name}</p>
          
          <p>Loves {collectedPlant.plant.sun_amount} sun</p>
          <p>Watering Schedule: <br /> {collectedPlant.schedule.watering_start_date}
          </p>
          

          <button className="modal-button" onClick={showAddScheduleModal}>
            Create Schedule
          </button>
          <button onClick={() => props.onShowCollectedPlant(collectedPlant)}>
            Plant Settings
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


