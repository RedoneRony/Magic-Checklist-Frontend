/* eslint-disable eqeqeq */
import React, { createRef } from "react";
import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
const ref = createRef();

const Result = ({
  bdData,
  bdData1,
  bdData2,
  userData,
  marketing,
  marketing1,
  marketing2,
  goals,
  goals1,
  service,
  framework,
}) => {
  const resGoal = goals[0]?.text;
  const resGoal1 = goals1[0]?.text;

  function formatData(data) {
    const res1 = data[0]?.text;
    const res2 = res1?.replace("\n\n", "\n");
    const res3 = res2?.replace(/(\r\n|\n|\r)/gm, "");
    const res4 = res3?.replace(/[0-9]/g, "");
    const res5 = res4?.split(".");
    const resultData = res5?.filter(function (el) {
      return el != "";
    });

    return resultData;
  }

  const formatMarketingData2 = (data) => {
    const res1 = data[0]?.text;
    const res2 = res1?.replace("\n\n", "\n");
    return res2;
  };

  const formatedBdData = formatData(bdData);
  const formatedBdData1 = formatData(bdData1);
  const formatedBdData2 = formatMarketingData2(bdData2);
  const formatedMarktingData = formatData(marketing);
  const formatedMarktingData1 = formatData(marketing1);
  const formatedMarktingData2 = formatData(marketing2);
  console.log(formatedMarktingData2);
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Form className="my-3 bg-light pb-3 shadow mb-3 rounded">
            <div ref={ref} style={{ height: "auto" }}>
              <div className="mb-4 p-4">
                <Form.Label>
                  Business development Checklist For {userData?.agencyName} in
                  2023 (As a CEO or Management, I want you to go over this and
                  make sure each are done or have plan for this):
                </Form.Label>
                {formatedBdData ? (
                  formatedBdData?.map((item, index) => (
                    <Form.Check
                      key={index}
                      id={item}
                      label={item}
                      value={item}
                    />
                  ))
                ) : (
                  <h4>
                    Calculating...
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </h4>
                )}
              </div>
              <div className="mb-4 p-4">
                <Form.Label>
                  5 Type of Sales Activity your {userData?.agencyName} to do to
                  get more Business in 2023:
                </Form.Label>
                {formatedBdData1 ? (
                  formatedBdData1?.map((item, index) => (
                    <Form.Check
                      key={index}
                      id={item}
                      label={item}
                      value={item}
                    />
                  ))
                ) : (
                  <h4>
                    Calculating...
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </h4>
                )}
              </div>

              <div className="mb-4 p-4">
                <Form.Label>
                  Here are five marketplaces where a {service} agency can find
                  work:
                </Form.Label>
                <pre>
                  {formatedBdData2 ? (
                    formatedBdData2
                  ) : (
                    <h4>
                      Calculating...
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </h4>
                  )}
                </pre>
              </div>

              <div className="mb-4 p-4">
                <Form.Label>
                  Marketing Checklist For For {userData?.agencyName} in 2023 :
                </Form.Label>
                {formatedMarktingData ? (
                  formatedMarktingData?.map((item, index) => (
                    <Form.Check
                      key={index}
                      id={item}
                      label={item}
                      value={item}
                    />
                  ))
                ) : (
                  <h4>
                    Calculating...
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </h4>
                )}
              </div>

              <div className="mb-4 p-4">
                <Form.Label>
                  Here are five web directories where a software agency can list
                  their website, and get client review done:
                </Form.Label>
                {formatedMarktingData1 ? (
                  formatedMarktingData1?.map((item, index) => (
                    <Form.Check
                      key={index}
                      id={item}
                      label={item}
                      value={item}
                    />
                  ))
                ) : (
                  <h4>
                    Calculating...
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </h4>
                )}
              </div>

              <div className="mb-4 p-4">
                <Form.Label>
                  Here is a suggested 6-month content plan for a {service}
                  agency writing about {framework}:
                </Form.Label>
                {formatedMarktingData2 ? (
                  formatedMarktingData2?.map((item, index) => (
                    <Form.Check
                      key={index}
                      id={item}
                      label={item}
                      value={item}
                    />
                  ))
                ) : (
                  <h4>
                    Calculating...
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </h4>
                )}
              </div>

              <div className="mb-4 p-4">
                <Form.Label>
                  Goals and Objective for your Team in Q1 2023:
                </Form.Label>
                <pre>
                  {resGoal ? (
                    resGoal
                  ) : (
                    <h4>
                      Calculating...
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </h4>
                  )}
                </pre>
              </div>

              <div className="mb-4 p-4">
                <Form.Label>
                  Goals and Objective for your Team in 2023:
                </Form.Label>
                <pre>
                  {resGoal1 ? (
                    resGoal1
                  ) : (
                    <h4>
                      Calculating...
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </h4>
                  )}
                </pre>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Result;
