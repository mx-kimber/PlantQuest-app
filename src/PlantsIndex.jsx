import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function PlantsIndex(props) {

  return (
    <div id="plants-index">
      <hr />
      <h1>All Plants</h1>
      <hr />
      <br />
      <div className="container" id="index-container">
        <div className="row">
          {props.plants.map((plant) => (
            <div key={plant.id} className="col-md-4">
              <div className="card-container">
                <Card className="mb-4">
                  <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_zYzYokFtHdm2QNcuYl0HTd1pgyvI842zLvauEA04jw1ia0XQa2gtlWPLOhbDKsebia0&usqp=CAU" className="card-image-top" />
                  <Card.Body>
                    <Card.Title>{plant.name}</Card.Title>
                    <Card.Text>
                      {plant.description}
                      <br />
                      Loves ({plant.sun_amount}) light
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="card-button">
                      <Button variant="primary" onClick={() => props.onShowPlant(plant)}>
                        More info
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
            }  
