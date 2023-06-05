import axios from "axios";
import { useState, useEffect } from "react";
import { PlantsIndex } from "./PlantsIndex";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { Modal } from "./Modal";
import { PlantsNew } from "./PlantsNew";
import { PlantsShow } from "./PlantsShow";
import { SchedulesIndex } from "./SchedulesIndex";
import { SchedulesShow } from "./SchedulesShow";
import { SchedulesNew } from "./SchedulesNew";
import { CollectedPlantsIndex } from "./CollectedPlantsIndex";
import { CollectedPlantsNew } from "./CollectedPlantsNew.jsx";
import { CollectedPlantsShow } from "./CollectedPlantsShow"

export function Content() {
  const [plants, setPlants] = useState([]);
  const [isPlantsShowVisible, setIsPlantsShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [isSchedulesShowVisible, setIsSchedulesShowVisible] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({});
  const [collectedPlants, setCollectedPlants] = useState([]);
  const [isCollectedPlantsShowVisible, setIsCollectedPlantsShowVisible] = useState(false);
  const [currentCollectedPlant, setCurrentCollectedPlant] = useState({});
  


  const closeModal = () => {};

  const refreshIndex = () => {
    window.location.reload();
  };

  // PLANTS

  const handleIndexPlants = () => {
    axios.get("http://localhost:3000/plants.json").then((response) => {
      setPlants(response.data);
    });
  };

  const handleCreatePlant = (params, successCallback) => {
    axios.post("http://localhost:3000/plants.json", params).then((response) => {
      setPlants([...plants, response.data]);
      successCallback();
      closeModal();
      refreshIndex();
    });
  };

  const handleShowPlant = (plant) => {
    setIsPlantsShowVisible(true);
    setCurrentPlant(plant);
  };

  const handleUpdatePlant = (id, params, successCallback) => {
    axios.patch(`http://localhost:3000/plants/${id}.json`, params).then((response) => {
      setPlants(
        plants.map((plant) => {
          if (plant.id === response.data.id) {
            return response.data;
          } else {
            return plant;
          }
        })
      );
      successCallback();
      closeModal();
      refreshIndex();
    });
  };

  const handleDestroyPlant = (plant) => {
    const confirmed = window.confirm("Are you sure you want to delete this plant?");
    if (confirmed) {
      axios
        .delete(`http://localhost:3000/plants/${plant.id}.json`, { params: { confirm: "true" } })
        .then((response) => {
          const { message } = response.data;
          if (message === "Plant destroyed successfully") {
            console.log("Plant deleted successfully");
            setPlants(plants.filter((p) => p.id !== plant.id));
            setIsPlantsShowVisible(false);
            closeModal();
            refreshIndex();
          } else {
            console.log("Deletion canceled");
          }
        })
        .catch(() => {
          console.log("Error occurred during deletion");
        });
    }
  };

  // SCHEDULES

  const handleIndexSchedules = () => {
    axios.get("http://localhost:3000/schedules.json").then((response) => {
      setSchedules(response.data);
    });
  };

  const handleCreateSchedule = (params, successCallback) => {
    axios.post("http://localhost:3000/schedules.json", params).then((response) => {
      setSchedules([...schedules, response.data]);
      successCallback();
      closeModal();
      refreshIndex();
    });
  };

  const handleUpdateSchedule = (id, params, successCallback) => {
    axios.patch(`http://localhost:3000/schedules/${id}.json`, params).then((response) => {
      const updatedSchedule = response.data;
      setSchedules((prevSchedules) => {
        const updatedSchedules = prevSchedules.map((schedule) => {
          if (schedule.id === updatedSchedule.id) {
            return updatedSchedule;
          } else {
            return schedule;
          }
        });
        return updatedSchedules;
      });
      successCallback();
      closeModal();
      refreshIndex();
    });
  };
    
  const handleShowSchedule = (schedule) => {
    setIsSchedulesShowVisible(true);
    setCurrentSchedule(schedule);
  };

  const handleDestroySchedule = (schedule) => {
    const confirmed = window.confirm("Are you sure you want to delete this schedule?");
    if (confirmed) {
      axios
        .delete(`http://localhost:3000/schedules/${schedule.id}.json`, { params: { confirm: "true" } })
        .then((response) => {
          const { message } = response.data;
          if (message === "Schedule destroyed successfully") {
            console.log("Schedule deleted successfully");
            setSchedules(schedules.filter((s) => s.id !== schedule.id));
            setIsSchedulesShowVisible(false);
            closeModal();
            refreshIndex();
          } else {
            console.log("Deletion canceled");
          }
        })
        .catch(() => {
          console.log("Error occurred during deletion");
        });
    }
  };
  

  // COLLECTED PLANTS 

  const handleIndexCollectedPlants = () => {
    axios.get("http://localhost:3000/collected_plants.json").then((response) => {
      setCollectedPlants(response.data);
    });
  };

  const handleCreateCollectedPlant = (params, successCallback) => {
    axios.post("http://localhost:3000/collected_plants.json", params).then((response) => {
      setCollectedPlants([...collectedPlants, response.data]);
      successCallback();
      closeModal();
      refreshIndex();
    }).catch((error) => {
      console.error("Error creating collected plant:", error);
    });
  };

  const handleShowCollectedPlant = (collected) => {
    setIsCollectedPlantsShowVisible(true);
    setCurrentCollectedPlant(collected);
  };

  const handleUpdateCollectedPlant = (id, params, successCallback) => {
    axios
      .patch(`http://localhost:3000/collected_plants/${id}.json`, params)
      .then((response) => {
        const updatedCollectedPlant = response.data;
        setCollectedPlants((prevCollectedPlants) => {
          const updatedCollectedPlants = prevCollectedPlants.map((collectedPlant) => {
            if (collectedPlant.id === updatedCollectedPlant.id) {
              return updatedCollectedPlant;
            } else {
              return collectedPlant;
            }
          });
          return updatedCollectedPlants;
        });
        successCallback();
        closeModal();
        refreshIndex();
      })
      .catch((error) => {
        console.error("Error updating collected plant:", error);
      });
  };

  const handleDestroyCollectedPlant = (collectedPlant) => {
    const confirmed = window.confirm("Are you sure you want to delete this collected plant?");
    if (confirmed) {
      axios
        .delete(`http://localhost:3000/collected_plants/${collectedPlant.id}.json`, { params: { confirm: "true" } })
        .then((response) => {
          const { message } = response.data;
          if (message === "Collected plant destroyed successfully") {
            console.log("Collected plant deleted successfully");
            setCollectedPlants(collectedPlants.filter((cp) => cp.id !== collectedPlant.id));
            setIsCollectedPlantsShowVisible(false);
            closeModal();
            refreshIndex();
          } else {
            console.log("Deletion canceled");
          }
        })
        .catch(() => {
          console.log("Error occurred during deletion");
        });
    }
  };
  
  

  useEffect(() => {
    handleIndexPlants();
    handleIndexSchedules();
    handleIndexCollectedPlants();
  }, []);

  return (
    <div>
      <h1>Welcome to PlantQuest!</h1>
      <Login />
      <LogoutLink />
      <Signup />

  {/* // PLANTS  */}

      <PlantsNew onCreatePlant={handleCreatePlant} />
      <button onClick={handleIndexPlants}>All Plants</button>
      <PlantsIndex plants={plants} onShowPlant={handleShowPlant} />
  
      <Modal show={isPlantsShowVisible} onClose={() => setIsPlantsShowVisible(false)}>
        <PlantsShow plant={currentPlant} onUpdatePlant={handleUpdatePlant} onDestroyPlant={handleDestroyPlant} />
      </Modal>

  {/* // SCHEDULES */}
      <SchedulesNew onCreateSchedule={handleCreateSchedule} />
      <SchedulesIndex schedules={schedules} onShowSchedule={handleShowSchedule} onUpdateSchedule={handleUpdateSchedule} onDestroySchedule={handleDestroySchedule} />

      <Modal show={isSchedulesShowVisible} onClose={() => setIsSchedulesShowVisible(false)}>
        {currentSchedule && (
          <SchedulesShow
            schedule={currentSchedule}
            onUpdateSchedule={handleUpdateSchedule}
            onDestroySchedule={() => {
              handleDestroySchedule(currentSchedule);
              setIsSchedulesShowVisible(false);
              refreshIndex();
            }}
          />
        )}
      </Modal>

{/* // COLLECTED PLANTS */}

      <CollectedPlantsNew onCreateCollectedPlant={handleCreateCollectedPlant} />
      <CollectedPlantsIndex collectedPlants={collectedPlants} onShowCollectedPlant={handleShowCollectedPlant} />

      <Modal show={isCollectedPlantsShowVisible} onClose={() => setIsCollectedPlantsShowVisible(false)}>
        {currentCollectedPlant && (
          <CollectedPlantsShow
            collectedPlant={currentCollectedPlant}
            onUpdateCollectedPlant={handleUpdateCollectedPlant}
            onDestroyCollectedPlant={() => {
              handleDestroyCollectedPlant(currentCollectedPlant);
              setIsCollectedPlantsShowVisible(false);
              refreshIndex();
            }}
          />
        )}
      </Modal>
    </div>
  );
}  