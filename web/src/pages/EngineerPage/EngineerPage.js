import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Form as RedwoodForm, TextField } from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { toast } from '@redwoodjs/web/toast'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

// Local Import
import MainLayout from 'src/layouts/MainLayout'
import db from 'src/db'

const EngineerPage = () => {
  // Setting up Engineer Table
  const allEngineers = useLiveQuery(() => db.engineer.toArray(), [])
  const numberOfEngineers = useLiveQuery(() => db.engineer.count())

  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)
  const onGridReady = (params) => {
    setGridApi(params.api)
    setGridColumnApi(params.columnApi)
    window.onresize = () => {
      gridApi?.sizeColumnsToFit()
    }
  }

  // Setting for Engineer Form
  const formMethods = useForm()
  async function formSubmit(data) {
    if(!data.engineerName) {
      toast.error(`Need an engineer name to add an engineer`)
      return
    }
    await db.engineer.add(data)
    formMethods.reset()
    toast.success(`A new engineer ${data.engineerName} created`)
  }

  async function removeSelected(e) {
    const selectedNodes = gridApi.getSelectedNodes()
    const selectedDataList = selectedNodes.map(node => node.data)
    const engineerIds = selectedDataList.map(engineer => engineer.id)
    await db.engineer.bulkDelete(engineerIds)
    toast.success(`Successfully removed ${engineerIds.length} engineers`)
  }

  async function editEngineer(e) {
    await db.engineer.update(e.data.id, e.data)
    toast.success(`Engineer ID ${e.data.id} has been changed to ${e.data.engineerName}`)
  }

  return (
    <MainLayout>
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <RedwoodForm onSubmit={formSubmit} formMethods={formMethods}>
                <p className="text-center text-info font-weight-bolder">
                  # of Engineers {numberOfEngineers && numberOfEngineers}
                </p>
                <Form.Group>
                  <h4 className="text-primary text-center">
                    Enter Name to Add Engineer
                  </h4>
                  <TextField
                    className="form-control"
                    placeholder="Engineers Name"
                    name="engineerName"
                  />
                </Form.Group>
              </RedwoodForm>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Jumbotron>
        <Container className="justify-content-center">
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <Button variant="danger" block onClick={removeSelected}>Delete Selected</Button>
            <AgGridReact
              rowData={allEngineers}
              onGridReady={onGridReady}
              rowSelection="multiple"
              unSortIcon={true}
              suppressMenuHide={true}
              defaultColDef={{ editable: true, resizable: true }}
              pagination={true}
              onCellValueChanged={editEngineer}
              resizable={true}
            >
              <AgGridColumn field="id" checkboxSelection={true} sortable={true} editable={false} />
              <AgGridColumn field="engineerName" sortable={true} filter={true}/>
            </AgGridReact>
          </div>
        </Container>
      </Jumbotron>
    </MainLayout>
  )
}

export default EngineerPage
