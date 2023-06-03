import axios from "axios";
import { useState, useEffect } from "react";
import { PlantsIndex } from "./PlantsIndex";
import { Signup } from "./Signup";
import { Login } from "./Login"

export function Content() {
  const [plants, setPlants] = useState([]);
  
  const handleIndexPlants = () => {
    console.log("handleIndexPlants");
    axios.get("http://localhost:3000/plants.json").then((response) => {
      console.log(response.data);
      setPlants(response.data);
    });
  };

  useEffect(handleIndexPlants, []);

  return (
    <div>
      <h1>Welcome to PlantQuest!</h1>
      <Login />
      <Signup />
      <PlantsIndex plants={plants} />
    </div>
  )
}