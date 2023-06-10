import axios from "axios";
import { useState, useEffect } from "react";
import { PlantsIndex } from "./PlantsIndex";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Modal } from "./Modal";
import { PlantsShow } from "./PlantsShow";
import { SchedulesIndex } from "./SchedulesIndex";
import { SchedulesShow } from "./SchedulesShow";
import { SchedulesNew } from "./SchedulesNew";
import { CollectedPlantsIndex } from "./CollectedPlantsIndex";
import { CollectedPlantsNew } from "./CollectedPlantsNew";
import { CollectedPlantsShow } from "./CollectedPlantsShow";
import { Routes, Route } from "react-router-dom";
import { PlantQuest } from "./PlantQuest";
import { useNavigate } from "react-router-dom";

export function Content(props) {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [isPlantsShowVisible, setIsPlantsShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [isSchedulesShowVisible, setIsSchedulesShowVisible] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({});
  const [collectedPlants, setCollectedPlants] = useState([]);
  const [isCollectedPlantsShowVisible, setIsCollectedPlantsShowVisible] = useState(false);
  const [currentCollectedPlant, setCurrentCollectedPlant] = useState({});
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const closeModal = () => {};
  const refreshIndex = () => {
    console.log("Refreshing index");
    window.location.reload();
  };


  // PLANTS

  const handleIndexPlants = () => {
    console.log("Handling index plants");
    axios.get("http://localhost:3000/plants.json").then((response) => {
      setPlants(response.data);
    });
  };

  const handleShowPlant = (plant) => {
    console.log("Handling show plant");
    setIsPlantsShowVisible(true);
    setCurrentPlant(plant);
  };
  

  // SCHEDULES

  const handleIndexSchedules = () => {
    console.log("Handling index schedules");
    axios.get("http://localhost:3000/schedules.json").then((response) => {
      const updatedSchedules = response.data.map((schedule) => {
        const plantName = schedule.collected_plant && schedule.collected_plant.plant && schedule.collected_plant.plant.name;
        return { ...schedule, plantName };
      });
      setSchedules(updatedSchedules);
    });
  };
  
  const handleCreateSchedule = (params, successCallback) => {
    console.log(params);
    axios.post("http://localhost:3000/schedules.json", params)
      .then((response) => {
        const newSchedule = {
          ...response.data,
          plantName: response.data.collected_plant && response.data.collected_plant.plant && response.data.collected_plant.plant.name
        };
        setSchedules([...schedules, newSchedule]);
        successCallback();
        refreshIndex();
        console.log("Handled create schedule");
      })
    .catch((error) => {
      console.error("Error creating schedule:", error);
      throw error;
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
      
      refreshIndex();
      console.log("Handled update schedule");
    })
    .catch((error) => {
      console.error("Error updating schedule:", error);
    
      throw error;
    });
  };
  
  const handleShowSchedule = (schedule) => {
    console.log("Handling show schedule");
    setIsSchedulesShowVisible(true);
    setCurrentSchedule(schedule);
  };
  
  
  const handleDestroySchedule = (schedule) => {
    console.log("Deleting schedule:", schedule);
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
            // setIsModalVisible(false);
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
    console.log("Fetching collected plants");
    axios.get("http://localhost:3000/collected_plants.json")
      .then((response) => {
        setCollectedPlants(response.data);
      });
  };
  

  const handleCreateCollectedPlant = (params) => {
    console.log(params);
    axios.post("http://localhost:3000/collected_plants.json", params)
      .then((response) => {
        setCollectedPlants([...collectedPlants, response.data]);
        closeModal();
        refreshIndex();
      })
      .catch((error) => {
        console.error("Error creating collected plant:", error);
      });
  };
  
  const handleShowCollectedPlant = (collected) => {
    console.log("Showing collected plant:", collected);
    setIsCollectedPlantsShowVisible(true);
    setCurrentCollectedPlant(collected);
    
  };
  

  const handleUpdateCollectedPlant = (id, params, successCallback) => {
    console.log("Updating collected plant...");
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
      console.log("Deleting collected plant...");
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
  
  

  const handleMoveToCollection = (plantId, currentUser, customName, usersImage, plantNotes) => {
    console.log("Moving plant to collection...");
    // note to self: add to after API integration
    const params = {
      plant_id: plantId,
      user_id: currentUser,
      custom_name: customName || '',
      users_image: usersImage || '',
      notes: plantNotes || '',
    };
  
    axios
      .post('http://localhost:3000/collected_plants.json', params)
      .then(() => {
        console.log('Plant moved to collection successfully');
        setIsPlantsShowVisible(false);
        setIsConfirmationVisible(true);
        setTimeout(() => {
          setIsConfirmationVisible(false);
          handleIndexCollectedPlants();
          navigate("/plants");
        }, 3000);
      })
      .catch((error) => {
        console.error('Error moving plant to collection:', error);
      });
  };
  

  useEffect(() => {
    handleIndexPlants();
    handleIndexSchedules();
    handleIndexCollectedPlants();
  }, []);




  return (
    <div>
      <Routes>
      <Route path="/plant_quest" element={<PlantQuest />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* PLANTS */}

      <Route
        path="/plants" element={
          <PlantsIndex
            plants={plants}
            onShowPlant={handleShowPlant}
            onMoveToCollection={handleMoveToCollection}
          />
        }
      />
    
        
      {/* COLLECTED PLANTS // */}

      <Route
        path="/collected_plants" element={
          <CollectedPlantsIndex
            collectedPlants={collectedPlants}
            onShowCollectedPlant={handleShowCollectedPlant}
            onDestroyCollectedPlant={handleDestroyCollectedPlant}
            onUpdateCollectedPlant={handleUpdateCollectedPlant}
            onCreateCollectedPlant={handleCreateCollectedPlant}
            onShowSchedule={handleShowSchedule}
            onUpdateSchedule={handleUpdateSchedule}
            onDestroySchedule={handleDestroySchedule}
            onCreateSchedule={handleCreateSchedule}
          />
        }
      />

      <Route
        path="/collected_plants/new" element={
        <CollectedPlantsNew 
          onCreateCollectedPlant={handleCreateCollectedPlant} />
        }
      />



      {/* SCHEDULES */}

      <Route
        path="/schedules"
        element={
          <SchedulesIndex
            schedules={schedules}
            onShowSchedule={(schedule) => {
              handleShowSchedule(schedule);
              console.log("Handled show schedule");
              
            }}
            onUpdateSchedule={(id, params) => {
              handleUpdateSchedule(id, params, () => {
                console.log("Handled update schedule");
                
              });
            }}
            onDestroySchedule={(id) => {
              handleDestroySchedule(id, () => {
                console.log("Handled destroy schedule");
                
              });
            }}
            onShowCollectedPlant={(collectedPlant) => {
              handleShowCollectedPlant(collectedPlant);
              console.log("Handled show collected plant");
              
            }}
            onDestroyCollectedPlant={(id) => {
              handleDestroyCollectedPlant(id, () => {
                console.log("Handled destroy collected plant");
                
              });
            }}
            onUpdateCollectedPlant={(id, params) => {
              handleUpdateCollectedPlant(id, params, () => {
                console.log("Handled update collected plant");
                
              });
            }}
            onCreateCollectedPlant={(params) => {
              handleCreateCollectedPlant(params, () => {
                console.log("Handled create collected plant");
                
              });
            }}
          />
        }
      />

      
      <Route 
       path="/schedules/new"               element={
        <SchedulesNew
          onCreateSchedule={(params, user_id, collected_plant_id) => {
            handleCreateSchedule(params, () => {
              console.log("Handled create schedule");
              
            }, user_id, collected_plant_id);
          }}
          currentCollectedPlant={currentCollectedPlant}
          currentUser={props.currentUser}
        />
      }
    />

    </Routes>
      
  
                   {/* MODALS  */}

  {/* in plants show */}

  <Modal
  show={isPlantsShowVisible}
  onClose={() => setIsPlantsShowVisible(false)}
>
  {currentPlant && (
    <PlantsShow
      plant={currentPlant}
    />
  )}
  <button
    onClick={() => {
      handleMoveToCollection(currentPlant.id, props.currentUser);
      console.log("Handled move to collection");
      
    }}
  >
    Move to collection
  </button>
</Modal>


  

    <Modal
      show={isSchedulesShowVisible}
      onClose={() => setIsSchedulesShowVisible(false)}
    >
      {currentSchedule && (
        <SchedulesShow
          schedule={currentSchedule}
          onUpdateSchedule={(id, params) => {
            handleUpdateSchedule(id, params, () => {
              console.log("Handled update schedule");
              
            });
          }}
          onCreateSchedule={(params, user_id, collected_plant_id) => {
            handleCreateSchedule(params, () => {
              console.log("Handled create schedule");
              
            }, user_id, collected_plant_id);
          }}
          onDestroySchedule={() => {
            handleDestroySchedule(currentSchedule, () => {
              console.log("Handled destroy schedule");
              
            });
            setIsSchedulesShowVisible(false);
            refreshIndex();
          }}
        />
      )}
    </Modal>



    <Modal show={isCollectedPlantsShowVisible} onClose={() => setIsCollectedPlantsShowVisible(false)}>
      {currentCollectedPlant && (
        <CollectedPlantsShow
          collectedPlant={currentCollectedPlant}
          onUpdateCollectedPlant={(params) => {
            console.log('onUpdateCollectedPlant params:', params);
            handleUpdateCollectedPlant(params, () => {
              console.log('Handled update collected plant');
            });
          }}
          onCreateCollectedPlant={(params) => {
            console.log('onCreateCollectedPlant params:', params);
            handleCreateCollectedPlant(params, () => {
              console.log('Handled create collected plant');
              
            });
          }}
          onDestroyCollectedPlant={() => {
            console.log('onDestroyCollectedPlant');
            handleDestroyCollectedPlant(currentCollectedPlant);
            setIsCollectedPlantsShowVisible(false);
            refreshIndex();
          }}
          onShowSchedule={(schedule) => {
            console.log('onShowSchedule schedule:', schedule);
            handleShowSchedule(schedule);
          }}
          onUpdateSchedule={(id, params) => {
            console.log('onUpdateSchedule id:', id);
            console.log('onUpdateSchedule params:', params);
            handleUpdateSchedule(id, params);
          }}
          onDestroySchedule={(schedule) => {
            console.log('onDestroySchedule schedule:', schedule);
            handleDestroySchedule(schedule);
          }}
          onCreateSchedule={(params) => {
            console.log('onCreateSchedule params:', params);
            handleCreateSchedule(params, () => {
              console.log('Handled create schedule');
            });
          }}
        />
      )}
    </Modal>

{/* CONFIRMATION MODAL FOR PLANT INTO COLLECTION */}

    <Modal show={isConfirmationVisible} onClose={() =>
      setIsConfirmationVisible(false)}>
      {currentPlant && (
        <div>
          <h1>Congrats! Your collection is growing!</h1>
          <p>Name: {currentPlant.name}</p>
          {/* Note to self: Add photo after API integration - will change */}
        </div>
      )}
    </Modal>
  </div>
  );
}  



