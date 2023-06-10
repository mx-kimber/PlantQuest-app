// import axios from "axios";

export function PlantsIndex(props) {
  // const handleMoveToCollection = (plantId, currentUser) => {
  //   const params = {
  //     plant_id: plantId,
  //     user_id: currentUser,
  //   };

  //   axios
  //   .post("http://localhost:3000/collected_plants.json", params)
  //   .then(() => {
  //     console.log("Plant moved to collection successfully");
  //     // Redirect to another page
  //     window.location.href = "/collected_plants"; // Replace with the desired URL
  //   })
  //   .catch((error) => {
  //     console.error("Error moving plant to collection:", error);
  //   });
  
  // };

  return (
    <div id="plants-index">
      <h1>All plants</h1>
      {props.plants.map((plant) => (
        <div key={plant.id}>
          <h2>{plant.name}</h2>
          <p>Description: {plant.description}</p>
          <p>Amount of sun: {plant.sun_amount}</p>
          
          <button onClick={() => props.onShowPlant(plant)}>Read more about this plant!</button>
          {/* <button onClick={() => handleMoveToCollection(plant.id, props.currentUser)}>
            Move to collection
          </button> */}
        </div>
      ))}
    </div>
  );
}

