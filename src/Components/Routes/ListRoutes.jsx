import { useState, useEffect, useCallback } from "react";
import "./ListRoutes.css";
import axios from "axios";
import { Table, Pagination, Container } from "react-bootstrap";
import InsertRouteComponent from "./InsertRouteComponent";

function ListRoutes({ routesUpdated }) {
  const [routes, setRoutes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [routesPerPage, setRoutesPerPage] = useState(10);

  const fetchRoutes = useCallback(async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Route");
      setRoutes(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes, routesUpdated]);

  const indexOfLastRoute = currentPage * routesPerPage;
  const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
  const currentRoutes = routes.slice(indexOfFirstRoute, indexOfLastRoute);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <h2>Rotas</h2>
        <Table className="tabela-rotas" striped bordered hover>
          <thead>
            <tr>
              <th style={{ display: "none" }}>Id</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {currentRoutes.map((route) => (
              <tr key={route.id}>
                <td style={{ display: "none" }}>{route.id}</td>
                <td>{route.origin ?? "Origem"}</td>
                <td>{route.destination ?? "Destino"}</td>
                <td>
                  {route.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="pagination-container">
          <Pagination size="sm" variant="dark" className="pagination">
            {Array.from(
              { length: Math.ceil(routes.length / routesPerPage) },
              (v, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default ListRoutes;
