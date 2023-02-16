import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './InsertRouteComponent.css'
import './ListRoutes'

function InsertRouteComponent({ onRoutesUpdate }) {
  
  const [newRoute, setNewRoute] = useState({
    origin: '',
    destination: '',
    price: 0
  });

  const handleAddRoute = () => {
    axios
      .post('https://localhost:5001/api/Route', newRoute)
      .then((res) => {        
        setNewRoute({
          origin: '',
          destination: '',
          price: 0
        });
        onRoutesUpdate();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Nova Rota</h2>
      <Form className="form-add-route">
        <Form.Group controlId="formBasicOrigin">
          <Form.Label>Origem</Form.Label>
          <Form.Control
            type="text"
            placeholder="insira a origem"
            value={newRoute.origin}
            onChange={(e) =>
              setNewRoute({ ...newRoute, origin: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicDestination">
          <Form.Label>Destino</Form.Label>
          <Form.Control
            type="text"
            placeholder="insira o destino"
            value={newRoute.destination}
            onChange={(e) =>
              setNewRoute({ ...newRoute, destination: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicPrice">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            step="1.00"
            placeholder="Enter price"
            value={newRoute.price}
            onChange={(e) =>
              setNewRoute({ ...newRoute, price: parseFloat(e.target.value) })
            }
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleAddRoute}>
          Adcionar
        </Button>
      </Form>
    </div>
  );
}

export default InsertRouteComponent;
