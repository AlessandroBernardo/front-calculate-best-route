import "./App.css";
import ListRoutes from "./Components/Routes/ListRoutes";
import InsertRouteComponent from "./Components/Routes/InsertRouteComponent";
import { useState, React, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [routesUpdated, setRoutesUpdated] = useState(false);

  const handleRoutesUpdate = useCallback(() => {
    setRoutesUpdated(!routesUpdated);
  }, [routesUpdated]);

  return (
    <div className="container">
      <div className="row">
        <div className="col div-with-margin-top">
          <InsertRouteComponent onRoutesUpdate={handleRoutesUpdate} />
        </div>        
        <div className="col div-with-margin-bottom">
          <ListRoutes routesUpdated={routesUpdated} />
        </div>
      </div>
    </div>
  );
}

export default App;
