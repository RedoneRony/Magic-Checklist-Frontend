/* eslint-disable eqeqeq */
import React, { createRef, useContext } from "react";
import axios from "axios";
import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

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
  const navigate = useNavigate();
  const resGoal = goals[0]?.text;
  const resGoal1 = goals1[0]?.text;
  const { user } = useContext(AuthContext);
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

  const handleSaveToDb = async () => {
    console.log("first");
    const response1 = await axios.post(
      `${process.env.REACT_APP_SITE_API}/api/bd/createBdList`,
      {
        email: user?.email,
        bdCheckList: formatedBdData,
        salesActivity: formatedBdData1,
        marketPlace: formatedBdData2,
      }
    );

    const response2 = await axios.post(
      `${process.env.REACT_APP_SITE_API}/api/marketing/createList`,
      {
        email: user?.email,
        marketingCheckList: formatedMarktingData,
        webDirectories: formatedMarktingData1,
        contentPlan: formatedMarktingData2,
      }
    );
    const response3 = await axios.post(
      `${process.env.REACT_APP_SITE_API}/api/okr/createList`,
      {
        email: user?.email,
        okrQ1: resGoal,
        okrYear: resGoal1,
      }
    );
    // if (
    //   response1.status === 201 &&
    //   response2.status === 201 &&
    //   response3.status === 201
    // ) {
    //   navigate("/db/result");
    // }
  };
  return (
    <>
      <Row className="justify-content-md-center">
        <Col>
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
          {/* {resGoal &&
            resGoal1 &&
            formatedBdData &&
            formatedBdData1 &&
            formatedBdData2 &&
            formatedMarktingData &&
            formatedMarktingData1 &&
            formatedMarktingData2 && (
              <Button onClick={handleSaveToDb}>Save</Button>
            )}
          <Button onClick={() => navigate(0)}>Regenerate</Button> */}
        </Col>
      </Row>
    </>
  );
};

export default Result;
