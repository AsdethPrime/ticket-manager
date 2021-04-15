import 'bootstrap-css-only/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { navigate, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar bg="primary" expand="md" fixed="top">
        <Navbar.Brand className="text-white">
          <Button
            onClick={() => navigate(routes.home())}
            className="font-weight-bold"
          >
            Ticket Management
          </Button>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link
              className="text-white"
              onClick={() => navigate(routes.home())}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate(routes.user())}
            >
              User
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate(routes.engineer())}
            >
              Engineer
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => navigate(routes.ticket())}
            >
              Ticket
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ height: 80 }} />
      <Toaster />
      <main>{children}</main>
    </>
  )
}

export default MainLayout
