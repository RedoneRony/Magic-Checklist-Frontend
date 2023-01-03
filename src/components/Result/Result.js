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
  // const res1 = data[0]?.text;
  // const res2 = res1?.replace("\n\n", "\n");
  // const res3 = res2?.replace(/(\r\n|\n|\r)/gm, "");
  // const res4 = res3?.replace(/[0-9]/g, "");
  // const res5 = res4?.split(".");
  // const resultData = res5?.filter(function (el) {
  //   return el != "";
  // });
  const formatedIdeas = data[0]?.text.split(/\d+\./);
  return formatedIdeas;
  }

  const formatMarketingData2 = (data) => {
    const res1 = data[0]?.text;
    // const res2 = res1?.replace("\n\n", "\n");
    const formatedIdeas = res1?.split("\n");
    const array = []
    const test = formatedIdeas?.map((item) => {
        if(item !== ''){
          array.push(item)
        }
});
    return array;
  };

  const formatedBdData = bdData[0]?.text.split(/\d+\./);
  const formatedBdData1 = bdData1[0]?.text.split(/\d+\./);
  const formatedMarketing = formatData(marketing);
  const formatedMarketing1 = marketing1[0]?.text.split(/\d+\./);
  const formatedBdData2 = formatMarketingData2(bdData2);
  // const formatedMarktingData = formatData(marketing);
  // const formatedMarktingData1 = formatData(marketing1);
  // const formatedMarktingData2 = formatData(marketing2);


  const handleSaveToDb = async () => {
    const response1 = await axios.post(
      `${process.env.REACT_APP_SITE_API}/api/bd/createBdList`,
      {
        email: user?.email,
        bdCheckList: bdData[0].text,
        salesActivity: bdData1[0].text,
        marketPlace: formatedBdData2,
      }
    );

    const response2 = await axios.post(
      `${process.env.REACT_APP_SITE_API}/api/marketing/createList`,
      {
        email: user?.email,
        marketingCheckList: marketing[0].text,
        webDirectories: marketing1[0].text,
        contentPlan: marketing2[0].text,
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

    if (
      response1.status === 201 &&
      response2.status === 201 &&
      response3.status === 201
    ) {
      navigate("/db/result");
    }
  };

  
  return (
    <>
      <Row className="justify-content-md-center">
        <div className="my-4 bg-white rounded-4 shadow p-4">
          <Row>
            <Col>
              <Form >
                <div ref={ref} style={{ height: "auto" }}>
                  <div className="mb-4 p-4">
                    <Form.Label>
                      Business development Checklist For {userData?.agencyName} in
                      2023:
                    </Form.Label>
                    {formatedBdData ? (
                      formatedBdData?.slice(1,21).map((item, index) => (
                        <>
                          <p key={index}>{index+1}.{item}</p>
                        </>
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
                      5 Type of Sales Activity{userData?.agencyName} to do to
                      get more Business in 2023:
                    </Form.Label>
                    {formatedBdData1 ? (
                      formatedBdData1?.slice(1,6).map((item, index) => (
                        <>
                          <p key={index}>{index+1}.{item}</p>
                        </>
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
                    Here are five marketplaces where  {service} agency can find work:
                    </Form.Label>
                    {formatedBdData2.length ? (
                      formatedBdData2?.map((item, index) => (
                        <>
                          <p key={index}>{item}</p>
                        </>
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
                      Marketing Checklist For For {userData?.agencyName} in 2023 :
                    </Form.Label>
                    {formatedMarketing ? (
                      formatedMarketing?.slice(1,11).map((item, index) => (
                        <p key={index}> {index+1}.{item}</p>
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
                    {formatedMarketing1 ? (
                      formatedMarketing1?.slice(1,6)?.map((item, index) => (
                        <p key={index}>{index +1}.{item}</p>
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
                    {marketing2.length ? (
                      marketing2?.map((item, index) => (
                        <pre key={index}>{item.text}</pre>
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
          <Row>
            <Col>
              {resGoal &&
                resGoal1 &&
                bdData &&
                bdData1 &&
                formatedBdData2 &&
                marketing &&
                marketing1 &&
                marketing2 && <Button onClick={handleSaveToDb}  className="rt-btn-on mr-3">Save</Button>}
              <Button onClick={() => navigate(0)}  className="rt-btn">Regenerate</Button>
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );
};

export default Result;
