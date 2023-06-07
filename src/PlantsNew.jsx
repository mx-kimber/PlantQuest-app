// export function PlantsNew(props) {

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const params = new FormData(event.target);
//     props.onCreatePlant(params)
//     window.location.href = "/plants";
//   };
  
//   return (
//     <div>
//       <h1>New Plant</h1>
//       <form onSubmit={handleSubmit}>
//         <div id="plantsNew">
//           Name: <input name="name" type="text" required />
//         </div>
//         <div>
//           Description: <input name="description" type="text" required />
//         </div>
//         <div>
//           Amount of Sun: <input name="sun_amount" type="number" required />
//         </div>
//         <div>
//           Days to Water: <input name="days_to_water" type="number" required />
//         </div>
//         <button type="submit">Create plant</button>
//       </form>
//     </div>
//   );
// }
