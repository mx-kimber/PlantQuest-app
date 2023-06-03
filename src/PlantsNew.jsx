export function PlantsNew(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreatePlant(params, () => event.target.reset());
  };
  

  return (
    <div>
      <h1>New Plant</h1>
      <form onSubmit={handleSubmit}>
        <div id="plantsNew">
          Name: <input name="name" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <div>
          Amount of Sun: <input name="sun_amount" type="number" />
        </div>
        <div>
          Days to Water: <input name="days_to_water" type="number" />
        </div>
        <button type="submit">Create plant</button>
      </form>
    </div>
  );
}
