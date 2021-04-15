import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Form as RedwoodForm, TextField } from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { toast } from '@redwoodjs/web/toast'
import { useLiveQuery } from 'dexie-react-hooks'
import Button from 'react-bootstrap/Button'

import { useState } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

// Local Import
import MainLayout from 'src/layouts/MainLayout'
import db from 'src/db'

const UserPage = () => {
  const allUsers = useLiveQuery(() => db.users.toArray(), [])
  const countOfUsers = useLiveQuery(() => db.users.count())
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)
  const onGridReady = (params) => {
    setGridApi(params.api)
    setGridColumnApi(params.columnApi)
    window.onresize = () => {
      gridApi?.sizeColumnsToFit()
    }
  }

  async function removeSelected(e) {
    const selectedNodes = gridApi.getSelectedNodes()
    const selectedDataList = selectedNodes.map((node) => node.data)
    const userIds = selectedDataList.map((user) => user.id)
    await db.users.bulkDelete(userIds)
    toast.success(`Successfully removed ${userIds.length} users`)
  }

  const formMethods = useForm()
  async function formSubmit(data) {
    if(!data.userName) {
      toast.error(`Need a user name to add a user`)
      return
    }
    await db.users.add(data)
    toast.success(
      `A new user ${data.userName} successfully added to the database`
    )
    formMethods.reset()
  }

  async function editUser(e) {
    await db.users.update(e.data.id, e.data)
    toast.success(`User Id ${e.data.id} changed to ${e.data.userName}`)
  }
  return (
    <MainLayout>
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <RedwoodForm onSubmit={formSubmit} formMethods={formMethods}>
                <p className="text-center text-info font-weight-bolder">
                  {' '}
                  # Of Users: {countOfUsers && countOfUsers}
                </p>
                <Form.Group>
                  <h4 className="text-primary text-center">
                    Enter Name to add User
                  </h4>
                  <TextField
                    className="form-control"
                    name="userName"
                    placeholder="User Name"
                  />
                </Form.Group>
              </RedwoodForm>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Jumbotron>
        <Container>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: '100%' }}
          >
            <Button variant="danger" block onClick={removeSelected}>
              Delete Selected
            </Button>
            <AgGridReact
              rowData={allUsers}
              onGridReady={onGridReady}
              rowSelection="multiple"
              unSortIcon={true}
              suppressMenuHide={true}
              defaultColDef={{ editable: true, resizable: true }}
              pagination={true}
              onCellValueChanged={editUser}
            >
              <AgGridColumn
                field="id"
                checkboxSelection={true}
                sortable={true}
                editable={false}
              />
              <AgGridColumn field="userName" sortable={true} filter={true} />
            </AgGridReact>
          </div>
        </Container>
      </Jumbotron>
    </MainLayout>
  )
}

export default UserPage
