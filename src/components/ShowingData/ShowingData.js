import React from "react";
import { Tab, Tabs, Col, Row, Nav } from "react-bootstrap";
import { FaHandshake, FaRegDotCircle, FaRocket } from "react-icons/fa";

const ShowingData = () => {
  return (
    <div className="">
      <Tab.Container  defaultActiveKey="businessDevelopment">
        <Row>
          <Col sm={12}>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="businessDevelopment"><FaHandshake/> Business Development</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="marketing"><FaRocket/> Marketing</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="okr"><FaRegDotCircle/> OKR</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="businessDevelopment">
              A1
              </Tab.Pane>
              <Tab.Pane eventKey="marketing">
              A2
              </Tab.Pane>
              <Tab.Pane eventKey="okr">
              A3
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default ShowingData