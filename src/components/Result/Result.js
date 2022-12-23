/* eslint-disable eqeqeq */
import React, { createRef } from "react";
import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa";

import Pdf from "react-to-pdf";
const ref = createRef();

const Result = ({ bdData, userData, marketing, goals }) => {

  const resGoal = goals[0]?.text

  function formatData(data) {

    const res1 = data[0]?.text
    const res2 = res1?.replace('\n\n', '\n')
    const res3 = res2?.replace(/(\r\n|\n|\r)/gm, "")
    const res4 = res3?.replace(/[0-9]/g, '')
    const res5 = res4?.split(".");
    const resultData = res5?.filter(function (el) {
      return el != "";
    });

    return resultData;
  }


  const formatedBdData = formatData(bdData);
  const formatedMarktingData = formatData(marketing);

  console.log(formatedBdData.length, formatedMarktingData)
  // const formatedGoalsData = formatData(goals);

  return (
    <>
      <Row className="justify-content-md-center"  >
        <Col md={7} >

          <Form
            className="my-3 bg-light pb-3 shadow mb-3 rounded"

          >

            <div ref={ref} style={{ height: 'auto' }}>

              <div className="mb-4 p-4"
              >
                <img src="/logo.png" alt="logo" className="img-fluid mb-5" />

                <Form.Label>Business development Checklist For {userData?.agencyName} in 2023 :</Form.Label>
                {
                  formatedBdData?.map((item, index) => (
                    <Form.Check
                      key={index}
                      id={item}
                      label={item}
                      value={item}

                    />
                  ))
                }
              </div>

              <div className="mb-4 p-4">
                <Form.Label>Marketing Checklist For For {userData?.agencyName} in 2023 :</Form.Label>
                {formatedMarktingData?.map((item, index) => (
                  <Form.Check
                    key={index}
                    id={item}
                    label={item}
                    value={item}

                  />
                ))
                }
              </div>

              <div className="mb-4 p-4">
                <Form.Label>Goals and Objective for your Team in 2023 :</Form.Label>
                <pre>{
                  resGoal
                    ?
                    resGoal
                    :
                    <h4>Calculating...
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </h4>
                }</pre>
              </div>

            </div>

            <Pdf targetRef={ref} filename="Guideline.pdf">
              {({ toPdf }) => <Button variant="primary" className="ms-5" onClick={toPdf}><FaFilePdf /> Download Pdf</Button>}
            </Pdf>

          </Form>
        </Col>
      </Row>

    </>
  );
};

export default Result;
