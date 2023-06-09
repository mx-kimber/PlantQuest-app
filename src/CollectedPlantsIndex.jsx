import { useState } from 'react';
import { Modal } from './Modal';
import { SchedulesNew } from './SchedulesNew';
// import { SchedulesShow } from './SchedulesShow';


export function CollectedPlantsIndex(props) {
  const [isAddScheduleModalVisible, setIsAddScheduleModalVisible] = useState(false);

  const showAddScheduleModal = () => {
    setIsAddScheduleModalVisible(true);
  };

  const handleCreateSchedule = (params) => {
    props.onCreateSchedule(params);
    setIsAddScheduleModalVisible(false);
  };

  // const handleUpdateSchedule = (scheduleId, params) => {
  //   props.onUpdateSchedule(scheduleId, params);
  //   setIsEditScheduleModalVisible(false);
  // };

  // const handleDestroySchedule = (schedule) => {
  //   props.onDestroySchedule(schedule);
  // };

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
            Plant Settings
          </button>
          {/* <button className="modal-button" onClick={() => showEditScheduleModal(collectedPlant)}>
            Manage Schedule
          </button> */}
          <button className="modal-button" onClick={showAddScheduleModal}>
            Create Schedule
          </button>

         
          {/* {isEditScheduleModalVisible && selectedPlant && (
            <Modal show={isEditScheduleModalVisible} onClose={() => setIsEditScheduleModalVisible(false)}>
              <SchedulesShow
                schedule={selectedPlant.schedule}
                onUpdateSchedule={handleUpdateSchedule}
                onDestroySchedule={handleDestroySchedule}
              />
            </Modal>
          )} */}

        
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





         

  




