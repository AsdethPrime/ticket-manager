import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {
  Form as RedwoodForm,
  TextField,
  TextAreaField,
  TelField,
  SelectField,
  Submit
} from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { toast } from '@redwoodjs/web/toast'
import { useLiveQuery } from 'dexie-react-hooks'
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
// Local Import
import MainLayout from 'src/layouts/MainLayout'
import db from 'src/db'

const TicketPage = () => {
  const allTickets = useLiveQuery(() => db.ticket.toArray(), [])
  const numberOfTickets = useLiveQuery(() => db.ticket.count())
  const allEngineers = useLiveQuery(() => db.engineer.toArray(), [])
  const allUsers = useLiveQuery(() => db.users.toArray(), [])

  const columns = [
    { dataField: 'id', text: 'ID', sort: true },
    { dataField: 'ticketTitle', text: 'Ticket Title', sort: true },
    { dataField: 'ticketDescription', text: 'Ticket Description', sort: true },
    { dataField: 'engineer', text: 'Engineer', sort: true },
    { dataField: 'user', text: 'User', sort: true },
    { dataField: 'userPhoneNumber', text: 'User Phone', sort: true },
  ]
  const formMethods = useForm()
  async function formSubmit(data) {
    await db.ticket.add(data)
    toast.success(`A new ticket ${data.ticketTitle} successfully added to the database`)
    formMethods.reset()
  }
  return (
    <MainLayout>
      <Jumbotron>
        <Container>
          <RedwoodForm onSubmit={formSubmit} formMethods={formMethods}>
          <p className="text-center text-info font-weight-bolder"> # Of Tickets: { numberOfTickets && numberOfTickets }</p>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ticket Title</Form.Label>
                  <TextField
                    name="ticketTitle"
                    placeholder="title of ticket"
                    className="form-control"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Engineer</Form.Label>
                  { allEngineers && (
                    <SelectField name="engineer" className="form-control" required>
                      { allEngineers.map(engineer => <option value={engineer.id} key={engineer.id}>{engineer.engineerName}</option>)}
                    </SelectField>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>User</Form.Label>
                  { allUsers && (
                    <SelectField name="user" className="form-control" required>
                      { allUsers.map(user => <option value={user.id} key={user.id}>{user.userName}</option>)}
                    </SelectField>
                  ) }
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <TelField
                    name="userPhoneNumber"
                    placeholder="user's phonenumber"
                    className="form-control"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <TextAreaField
                    name="ticketDescription"
                    placeholder="describe Problem"
                    className="form-control"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </Col>
            </Row>
          </RedwoodForm>
        </Container>
      </Jumbotron>
      { allTickets && <BootstrapTable keyField="id" data={allTickets} columns={columns} />}
    </MainLayout>
  )
}

export default TicketPage
