
import Container from 'react-bootstrap/Container';

export function PlantsIndex(props) {
  return (
    <div id="plants-index">
      <Container className="left-nav">
      <hr />
      {props.plants.map((plant) => (
        <div key={plant.id}>
          <h2>{plant.name}</h2>
          <p>(Latin name)</p>
          <p><img src="https://bloody-disgusting.com/wp-content/uploads/2019/06/Little-Shop-of-Horrors-e1560782203967.jpg" className="plant-image"></img></p>
          <p>{plant.description}</p>
          <p>Light Tolerated | {plant.sun_amount}</p>
          
          <button onClick={() => props.onShowPlant(plant)}>More on this plant</button>
          <br/>
          <hr/>
          
        </div>
      ))}
      </Container>
    </div>
  );
}


{/* <button onClick={() => handleMoveToCollection(plant.id, props.currentUser)}>
            Move to collection
          </button> */}

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

