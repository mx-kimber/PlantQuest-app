import { useState, useEffect } from 'react';

export function CollectedPlantsShow(props) {
  const { collectedPlant, closeModal, refreshIndex } = props;
  const [shouldCloseModal, setShouldCloseModal] = useState(false);

  useEffect(() => {
    if (shouldCloseModal) {
      closeModal();
    }
  }, [shouldCloseModal, closeModal]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData.entries());
    console.log('handleSubmit params:', params);
    props.onUpdateCollectedPlant(collectedPlant.id, params)
      .then(() => {
        setShouldCloseModal(true); 
        refreshIndex();
      })
      .catch((error) => {
        console.log('Error updating collected plant:', error);
      });
  };

  const handleDestroy = () => {
    console.log('collectedPlant:', collectedPlant);
    props.onDestroyCollectedPlant(collectedPlant);
  };

  const renderCustomName = () => {
    if (collectedPlant.custom_name) {
      return <h1>{collectedPlant.custom_name}</h1>;
    } else {
      return (
        <div>
          <h1>{collectedPlant.plant.name}</h1>
          <button onClick={handleUpdateCustomName}>Update Nickname</button>
        </div>
      );
    }
  };

  const handleUpdateCustomName = () => {
    const updatedCustomName = prompt('Enter the custom name');
    if (updatedCustomName) {
      props.onUpdateCollectedPlant(collectedPlant.id, { custom_name: updatedCustomName })
        .then(() => {
          setShouldCloseModal(true);
          refreshIndex();
        })
        .catch((error) => {
          console.log('Error updating custom name:', error);
        });
    }
  };
  

  return (
    <div id="plant-collection">
      {renderCustomName()}
      {collectedPlant.users_image ? (
        <p>
          <img
            src={collectedPlant.users_image}
            alt="Plant Image"
            className="plant-image"
          />
        </p>
      ) : (
        <p>
          <img
            src="https://smartgardenguide.com/wp-content/uploads/2019/10/zz-plant-stalks-falling-over-9.jpg"
            alt="Default Plant Image"
            className="plant-image"
          />
        </p>
      )}
      
      <form onSubmit={handleSubmit}>
        <div id="collectedPlant.edit-form">
          <p>
            Custom Name:{" "}
            <input defaultValue={collectedPlant.custom_name} name="custom_name" type="text" />
          </p>
          <p>
            Notes: <input defaultValue={collectedPlant.notes} name="notes" type="text" />
          </p>
          <p>
            Users Image: <input name="users_image" type="text" />
          </p>
        </div>
        <button type="submit">Update collected plant</button>
      </form>
      
      <button onClick={handleDestroy}>Destroy collected plant</button>
    </div>
  );
}
