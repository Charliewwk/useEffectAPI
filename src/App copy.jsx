import React, { useState, useEffect } from 'react';
import { Table, Pagination, Spinner, Container } from 'react-bootstrap';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [mostrarCargando, setMostrarCargando] = useState(true);

  useEffect(() => {
    console.log("1 iniciando fetch...")
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setMostrarCargando(false);
        console.log("2 fetch finalizado")
      });
    console.log("3 código asincrónico")

  }, []);

  const columns = ['ID', 'User', 'Título', 'Terminado'];
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const renderData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handleFirstPage = () => setCurrentPage(1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const handleLastPage = () => setCurrentPage(totalPages);

  return (
    <>
    <Container>
      <Header />
      <div className="centered-container">
        <div className="scroll-container" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
          <>{!mostrarCargando && (
            <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {renderData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.userId}</td>
                      <td className='text-start'>{item.title}</td>
                      <td>
                        {item.completed ? (
                          <input className="form-check-input" type="checkbox" value="" checked disabled />
                        ) : (
                          <input className="form-check-input" type="checkbox" value="" disabled />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table><Pagination>
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
          )}
          {mostrarCargando && (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
              <p>Cargando...</p>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </Container>
    </>
  );
}

export default App;
