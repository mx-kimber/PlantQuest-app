import axios from "axios";
import { useState, useEffect } from "react";
import { PlantsIndex } from "./PlantsIndex";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { Modal } from "./Modal";
import { PlantsNew } from "./PlantsNew";
import { PlantsShow } from "./PlantsShow";

export function Content() {
  const [plants, setPlants] = useState([]);
  const [isPlantsShowVisible, setIsPlantsShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});

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
  
  useEffect(handleIndexPlants, []);

  const closeModal = () => {
    // Implement the code to close the modal here
  };

  const refreshIndex = () => {
    window.location.reload(); // Refresh the index page
  };

  return (
    <div>
      <h1>Welcome to PlantQuest!</h1>
      <Login />
      <LogoutLink />
      <Signup />

      <PlantsNew onCreatePlant={handleCreatePlant} />
      <button onClick={handleIndexPlants}>All Plants</button>
      <PlantsIndex plants={plants} onShowPlant={handleShowPlant} />

      <Modal show={isPlantsShowVisible} onClose={() => setIsPlantsShowVisible(false)}>
        <PlantsShow plant={currentPlant} onUpdatePlant={handleUpdatePlant} onDestroyPlant={handleDestroyPlant} />
      </Modal>
    </div>
  );
}
