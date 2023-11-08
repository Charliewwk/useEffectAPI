import React, { useState, useEffect } from 'react';
import { Table, Pagination, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [mostrarCargando, setMostrarCargando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setMostrarCargando(false);
      });
  }, []);

  const columns = ['userId', 'id', 'title', 'completed'];
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const renderData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFirstPage = () => setCurrentPage(1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const handleLastPage = () => setCurrentPage(totalPages);

  return (
    <div className="container">
      {mostrarCargando && (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Cargando...</p>
        </div>
      )}
      {!mostrarCargando && (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <td>ID</td>
                <td>ID USuario</td>
                <td>Título</td>
                <td>Estado</td>
              </tr>
            </thead>
            <tbody>
              {renderData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.userId}</td>
                  <td>{item.title}</td>
                  <td>{item.completed.toString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.First onClick={handleFirstPage} />
            <Pagination.Prev onClick={handlePreviousPage} />
            {currentPage > 2 && <Pagination.Ellipsis />}
            {currentPage > 1 && <Pagination.Item onClick={handlePreviousPage}>{currentPage - 1}</Pagination.Item>}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < totalPages && <Pagination.Item onClick={handleNextPage}>{currentPage + 1}</Pagination.Item>}
            {currentPage < totalPages - 1 && <Pagination.Ellipsis />}
            <Pagination.Next onClick={handleNextPage} />
            <Pagination.Last onClick={handleLastPage} />
          </Pagination>
        </>
      )}
    </div>
  );
}

export default App;
