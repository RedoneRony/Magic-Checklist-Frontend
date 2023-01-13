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
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  seo1,
  seo2,
  seo3,
  seo4,
  seo5,
  agencySize,
}) => {
  console.log("Framework", question6);
  const navigate = useNavigate();
  const resGoal = goals[0]?.text;
  const resGoal1 = goals1[0]?.text;
  const { user } = useContext(AuthContext);
  function formatData(data) {
    const formatedIdeas = data[0]?.text.split(/\d+\./);
    return formatedIdeas;
  }

  const formatMarketingData2 = (data) => {
    const res1 = data[0]?.text;
    const formatedIdeas = res1?.split("\n");
    const array = [];
    const test = formatedIdeas?.map((item) => {
      if (item !== "") {
        array.push(item);
      }
    });
    return array;
  };

  const formatedBdData = bdData[0]?.text.split(/\d+\./);
  const formatedBdData1 = bdData1[0]?.text.split(/\d+\./);
  const formatedMarketing = formatData(marketing);
  const formatedMarketing1 = formatData(marketing1);
  const formatedBdData2 = formatMarketingData2(bdData2);

  const bdCheckListTitle = `Business development Checklist For ${userData?.agencyName} in 2023:`;
  const salesActivityTitle = `5 Types of Sales Activity ${userData?.agencyName} to do to get more Business in 2023:`;
  const marketPlaceTitle = `Here are marketplaces where  ${service} agency can find work:`;
  const marketingCheckListTitle = `Marketing Checklist For ${userData?.agencyName} in 2023:`;
  const webDirectoriesTitle = `Here are five web directories where a software agency can list their website, and get client review done:`;
  const contentPlanTitle = `Here is a suggested 6-month content plan for a ${service} agency writing about ${
    framework === "Others" ? "Web application framework" : framework
  }:`;
  const okr1Title = `Goals and Objective for ${userData?.agencyName} in Q1 2023:`;
  const okrYearTitle = `Goals and Objective for ${userData?.agencyName} in 2023:`;

  const seoTitle1 = `SEO Basic Checklist For ${userData?.agencyName}:`;
  const seoTitle2 = `Keyword Research Checklist For SEO For ${userData?.agencyName}:`;
  const seoTitle3 = `Technical SEO Checklist For ${userData?.agencyName}:`;
  const seoTitle4 = `On-page SEO and content Checklist For ${userData?.agencyName}:`;
  const seoTitle5 = `Off-page SEO Checklist For ${userData?.agencyName}:`;
  const handleSaveToDb = async () => {
    const response1 = await axios.post(
      `${process.env.REACT_APP_SITE_API}/api/bd/createBdList`,
      {
        email: user?.email,
        bdCheckListTitle,
        bdCheckList: bdData[0].text,
        salesActivityTitle,
        salesActivity: bdData1[0].text,
        marketPlaceTitle,
        marketPlace: formatedBdData2,
      }
    );

    const response2 = await axios.post(
      `${process.env.REACT_APP_SITE_API}/api/marketing/createList`,
      {
        email: user?.email,

        marketingCheckListTitle,
        marketingCheckList: marketing[0].text,

        webDirectoriesTitle,
        webDirectories: marketing1[0].text,

        contentPlanTitle,
        contentPlan: marketing2[0].text,

        seoTitle1,
        basicChecklist: seo1[0].text,

        seoTitle2,
        keywordResearch: seo2[0].text,

        seoTitle3,
        technicalSEO: seo3[0].text,

        seoTitle4,
        onPage: seo4[0].text,

        seoTitle5,
        offPage: seo5[0].text,
      }
    );
    const response3 = await axios.post(
      `${process.env.REACT_APP_SITE_API}/api/okr/createList`,
      {
        email: user?.email,
        okr1Title,
        okrQ1: resGoal,
        okrYearTitle,
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
      <Row className="justify-content-md-center rt-result">
        <div className="my-4 bg-white rounded-4 shadow p-4">
          <Row>
            <Col>
              <Form>
                <div ref={ref} style={{ height: "auto" }}>
                  <div className="mb-2 p-2">
                    <h6 className="rtn-question-title">{question1}</h6>
                    <Form.Label>{bdCheckListTitle}</Form.Label>
                    {formatedBdData ? (
                      formatedBdData?.slice(1, 21).map((item, index) => (
                        <>
                          <p key={index}>
                            {index + 1}.{item}
                          </p>
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
                  <div className="mb-2 p-2">
                    <h6 className="rtn-question-title">{question2}</h6>
                    <Form.Label>{salesActivityTitle}</Form.Label>
                    {formatedBdData1 ? (
                      formatedBdData1?.slice(1, 6).map((item, index) => (
                        <>
                          <p key={index}>
                            {index + 1}.{item}
                          </p>
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

                  <div className="mb-2 p-2">
                    <h6 className="rtn-question-title">{question3}</h6>
                    <Form.Label>{marketPlaceTitle}</Form.Label>
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

                  <div className="mb-2 p-2">
                    <h6 className="rtn-question-title">{question4}</h6>
                    <Form.Label>{marketingCheckListTitle}</Form.Label>
                    {formatedMarketing ? (
                      formatedMarketing?.slice(1, 11).map((item, index) => (
                        <pre key={index}>
                          {index + 1}.{item}
                        </pre>
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

                  <div className="mb-2 p-2">
                    <h6 className="rtn-question-title">{question5}</h6>
                    <Form.Label>{webDirectoriesTitle}</Form.Label>
                    {formatedMarketing1 ? (
                      formatedMarketing1?.map((item, index) => (
                        <pre key={index}>{item}</pre>
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

                  <div className="mb-2 p-2">
                    <h6 className="rtn-question-title">{question6}</h6>
                    <Form.Label>{contentPlanTitle}</Form.Label>
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

                  <div className="mb-2 p-2">
                    <h6 className="rtn-question-title">{question7}</h6>
                    <Form.Label>{okr1Title}</Form.Label>
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

                  <div className="mb-2 p-2">
                    <h6 className="rtn-question-title">{question8}</h6>
                    <Form.Label>{okrYearTitle}</Form.Label>
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
                marketing2 && (
                  <Button onClick={handleSaveToDb} className="rt-btn mr-3">
                    Save
                  </Button>
                )}
              <Button onClick={() => navigate(0)} className="rt-btn">
                Regenerate
              </Button>
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );
};

export default Result;
