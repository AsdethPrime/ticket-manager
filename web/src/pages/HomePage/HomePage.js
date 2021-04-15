import MainLayout from 'src/layouts/MainLayout'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { navigate, routes } from '@redwoodjs/router'

const HomePage = () => {
  return (
    <MainLayout>
      <PageComponent
        title="Engineer"
        imgSrc="EngineerSVG.svg"
        imageFirst={true}
        callback={() => navigate(routes.engineer())}
        description={
          'You can add Engineers as well as manage tickets from this page'
        }
      />
      <PageComponent
        title="User"
        imgSrc="UserSVG.svg"
        callback={() => navigate(routes.user())}
        description="You can add Users and create new tickets from this page"
      />
      <PageComponent
        title="Ticket"
        imgSrc="TicketSVG.svg"
        imageFirst={true}
        callback={() => navigate(routes.ticket())}
        description="You can add ticket and see ticket by an engineer or the user"
      />
    </MainLayout>
  )
}

export default HomePage

function PageComponent({ title, imgSrc, imageFirst, callback, description }) {
  if (imageFirst) {
    return (
      <Jumbotron className="my-0">
        <Row>
          <Col md={6}>
            <Card style={{ height: 200, width: '100%', minHeight: 200, minWidth: 200 }}>
              <Card.Body>
                <Card.Img
                  src={imgSrc}
                  style={{ height: '100%', width: '100%'}}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ height: 200, width: '100%' }}>
              <Card.Body>
                <Card.Title className="text-center text-primary">
                  {title} Page
                </Card.Title>
                <Card.Text className="lead text-center">
                  {description}
                </Card.Text>
                <Button block variant="primary" onClick={callback}>
                  Go to {title} page
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Jumbotron>
    )
  } else {
    return (
      <Jumbotron className="my-0">
        <Row>
          <Col md={6}>
            <Card style={{ height: 200, width: '100%', minHeight: 200, minWidth: 200 }}>
              <Card.Body>
                <Card.Title className="text-center text-primary">
                  {title} Page
                </Card.Title>
                <Card.Text className="lead text-center">
                  {description}
                </Card.Text>
                <Button block variant="primary" onClick={callback}>
                  Go to {title} page
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ height: 200, width: '100%' }}>
              <Card.Body>
                <Card.Img
                  src={imgSrc}
                  style={{ height: '100%', width: '100%'}}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Jumbotron>
    )
  }
}
