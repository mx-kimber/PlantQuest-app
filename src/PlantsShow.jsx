export function PlantsShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdatePlant(props.plant.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyPlant(props.plant);
  };

  return (
    <div>
      <h1>Plant information</h1>
      <p>Name: {props.plant.name}</p>
      <p>Description: {props.plant.description}</p>
      <p>Amount of Sun: {props.plant.sun_amount}</p>
      <p>Days to water: {props.plant.days_to_water}</p>
      <form onSubmit={handleSubmit}>
        <div id="plant.edit-form">
          <p>
            Name: <input defaultValue={props.plant.name} name="name" type="text" />
          </p>

          <p>
            Description: <input defaultValue={props.plant.description} name="description" type="text" />
          </p>

          <p>
            Amount of Sun: <input defaultValue={props.plant.sun_amount} name="sun_amount" type="number" />
          </p>

          <p>
            Days to water: <input defaultValue={props.plant.days_to_water} name="days_to_water" type="number" />
          </p>
        </div>
        <button type="submit">Update plant</button>
      </form>
      <button onClick={handleClick}>Destroy plant</button>
    </div>
  );
}
