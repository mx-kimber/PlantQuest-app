import axios from "axios";
import { useState, useEffect } from "react";
import { PlantsIndex } from "./PlantsIndex";
import { Signup } from "./Signup";
import { Login } from "./Login"
import { LogoutLink } from "./LogoutLink";
import { Modal } from "./Modal";
import { PlantsNew } from "./PlantsNew";
import { PlantsShow } from "./PlantsShow";

export function Content() {
  const [plants, setPlants] = useState([]);
  const [isPlantsShowVisible, setIsPlantsShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});
    
  const handleIndexPlants = () => {
    console.log("handleIndexPlants");
    axios.get("http://localhost:3000/plants.json").then((response) => {
      console.log(response.data);
      setPlants(response.data);
    });
  };

  

  const handleCreatePlant = (params, successCallback) => {
    console.log("handleCreatePlant", params);
    axios.post("http://localhost:3000/plants.json", params).then((response) => {
      setPlants([...plants, response.data]);
      successCallback();
    });
  };

  const handleShowPlant = (plant) => {
    console.log("handleShowPlant", plant);
    setIsPlantsShowVisible(true);
    setCurrentPlant(plant);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsPlantsShowVisible(false);
  };

  useEffect(handleIndexPlants, []);

  return (
    <div>
      <h1>Welcome to PlantQuest!</h1>
      <Login />
      <LogoutLink />
      <Signup />
      <PlantsNew onCreatePlant={handleCreatePlant} />
      <button onClick={handleIndexPlants}>All Plants</button>
      <PlantsIndex plants={plants} onShowPlant={handleShowPlant} />
      
      <Modal show={isPlantsShowVisible} onClose={handleClose}>
      <PlantsShow plant={currentPlant} />
      </Modal>
    </div>
  )
}