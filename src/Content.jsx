import axios from "axios";
import { useState, useEffect } from "react";
import { PlantsIndex } from "./PlantsIndex";
import { Signup } from "./Signup";
import { Login } from "./Login"
import { LogoutLink } from "./LogoutLink";
import { Modal } from "./Modal";
import { PlantsNew } from "./PlantsNew"

export function Content() {
  const [plants, setPlants] = useState([]);
  const [isPlantsShowVisible, setisPlantsShowVisible] = useState(false);

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

  useEffect(handleIndexPlants, []);
  const handleShowPlant = () => {
    console.log('handling show Plant')
    setisPlantsShowVisible(true);
  }

  const handleClose = () => {
    console.log('close modal')
    setisPlantsShowVisible(false);
  }
  return (
    <div>
      <h1>Welcome to PlantQuest!</h1>
      <Login />
      <LogoutLink />
      <Signup />
      <PlantsNew onCreatePlant={handleCreatePlant} />
      <button onClick={handleIndexPlants}>All Plants</button>
      <PlantsIndex plants={plants} onShowPlant={handleShowPlant}/>
      <Modal show={isPlantsShowVisible} onClose={handleClose}>
        <p>Plant photo and image here</p>
      </Modal>
    </div>
  )
}