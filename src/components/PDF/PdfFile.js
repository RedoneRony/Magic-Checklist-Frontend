/* eslint-disable react/jsx-no-target-blank */
import React, { useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider'
import { Col, Row, Spinner, Container, Navbar } from 'react-bootstrap'
import ReactToPrint from 'react-to-print';
import '../ShowingData/ShowingData.css';

function PdfFile() {
    const { user } = useContext(AuthContext);
    const inputRef = useRef();
    const [salesActivity, setSalesActivity] = useState([])
    const [marketPlace, setMarketPlace] = useState([])
    const [webDirectories, setWebDirectories] = useState([])
    const [contentPlan, setContentPlan] = useState([])

    const [bdData, setBdData] = useState([])
    const [bdFullData, setBdFullData] = useState([])

    const [bdDataId, setBdDataId] = useState('')

    const [mData, setMData] = useState([])
    const [mDataFull, setMDataFull] = useState([])
    const [mDataId, setMDataId] = useState('')

    const [okrData, setOkrData] = useState([])
    const [okrDataFull, setOkrDataFull] = useState([])
    const [okrQ1, setOkrQ1] = useState([])
    const [okrYear, setOkrYear] = useState([])
    const [okrDataId, setOkrDataBd] = useState('')
    const navigate = useNavigate()
    const currentYear = new Date().getFullYear();



    function formatData(data) {
        // const res1 = data[0];
        // const res2 = res1?.replace("\n\n", "\n");
        const formatedIdeas = data[0]?.split('\n')
        const array = []
        const test = formatedIdeas?.map(item => {
            if (item !== '') {
                array.push(item)
            }
        })
        return array
    }



    useEffect(() => {
        const getEmployeeEmails = async () => {
            // business data
            await axios
                .get(`${process.env.REACT_APP_SITE_API}/api/bd/getAll`, {
                    headers: {
                        'Content-Type': 'application/json',
                        email: `${user?.email}`
                    }
                })
                .then(response => {
                    setBdFullData(response.data[0])
                    const bdData = formatData(response?.data[0]?.bdCheckList)
                    const salesData = formatData(response?.data[0]?.salesActivity)
                    const marketPlaceData = formatData(response?.data[0]?.marketPlace)
                    if (bdData) {
                        setBdData(bdData)
                        setSalesActivity(salesData)
                        setMarketPlace(response?.data[0]?.marketPlace)
                        setBdDataId(response?.data[0]?._id)
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            // marketing data
            await axios
                .get(`${process.env.REACT_APP_SITE_API}/api/marketing/getAll`, {
                    headers: {
                        'Content-Type': 'application/json',
                        email: `${user?.email}`
                    }
                })
                .then(response => {
                    const salesData = formatData(response?.data[0]?.marketingCheckList)
                    const webDirectories = formatData(response?.data[0]?.webDirectories)
                    const formatedContent = formatData(response?.data[0]?.contentPlan)
                    setMDataFull(response.data[0])
                    setMData(salesData)
                    setContentPlan(formatedContent)
                    setWebDirectories(webDirectories)
                    setMDataId(response?.data[0]?._id)
                })
                .catch(error => {
                    console.log(error)
                })

            // okr data
            await axios
                .get(`${process.env.REACT_APP_SITE_API}/api/okr/getAll`, {
                    headers: {
                        'Content-Type': 'application/json',
                        email: `${user?.email}`
                    }
                })
                .then(response => {
                    setOkrDataFull(response.data[0])
                    const formatedOkrQ1 = formatData(response.data[0].okrQ1)
                    const formatedOkrYear = formatData(response.data[0].okrYear)
                    setOkrQ1(formatedOkrQ1)
                    setOkrYear(formatedOkrYear)
                    setOkrData(response?.data[0])
                    setOkrDataBd(response?.data[0]?._id)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        getEmployeeEmails()
    }, [!bdData, !mData, !okrData])

    return (
        <div ref={inputRef}>
            <Navbar className="rt-nav pdf-header">
                <Container>
                    <Navbar.Brand>
                        <Link>
                            <img src="/logo.png" alt="logo" className="brand-logo-pdf" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <span className="header-text brand-color">Scale Up Your Agency with ManagedCoder Magic Checklist!</span>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <div className='m-4 p-3 rt-showing-data'>

                    <Row>
                        <div className="showButton">
                            <Col md={12} className="d-flex justify-content-between mb-4">
                                <ReactToPrint
                                    trigger={() => <button className="rt-btn-on">Print PDF</button>}
                                    content={() => inputRef.current}
                                // onBeforePrint={()=>showPrint=false}

                                />
                                <button onClick={() => navigate('/db/result')} className="rt-btn">Back</button>

                            </Col>
                        </div>

                        <Col sm={12}>

                            {bdData && mData && okrData ? (
                                <>
                                    <h4 className='rt-result-hading brand-color p-4'>
                                        {bdFullData?.bdCheckListTitle}
                                    </h4>
                                    <div className='mb-4 p-4'>
                                        {bdData ? (
                                            bdData?.slice(0, 20).map((item, index) => (
                                                <>
                                                    <p key={index}>{item}</p>
                                                </>
                                            ))
                                        ) : (
                                            <h4>
                                                Calculating...
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </h4>
                                        )}
                                    </div>
                                    <h4 className='rt-result-hading brand-color p-4'>
                                        {bdFullData?.salesActivityTitle}
                                    </h4>
                                    <div className='mb-4 p-4'>
                                        {salesActivity ? (
                                            salesActivity?.slice(0, 5).map((item, index) => (
                                                <>
                                                    <p key={index}>{item}</p>
                                                </>
                                            ))
                                        ) : (
                                            <h4>
                                                Calculating...
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </h4>
                                        )}
                                    </div>
                                    <h4 className='rt-result-hading brand-color p-4'>
                                        {bdFullData?.marketPlaceTitle}
                                    </h4>
                                    <div className='mb-4 p-4'>
                                        {marketPlace ? (
                                            marketPlace?.map((item, index) => (
                                                <>
                                                    <p key={index}>{item}</p>
                                                </>
                                            ))
                                        ) : (
                                            <h4>
                                                Calculating...
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </h4>
                                        )}
                                    </div>
                                    <h4 className='rt-result-hading brand-color p-4'>
                                        {mDataFull?.marketingCheckListTitle}
                                    </h4>
                                    <div className='mb-4 p-4'>
                                        {mData ? (
                                            mData?.map((item, index) => (
                                                <>
                                                    <p key={index}>{item}</p>
                                                </>
                                            ))
                                        ) : (
                                            <h4>
                                                Calculating...
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </h4>
                                        )}
                                    </div>
                                    <h4 className='rt-result-hading brand-color p-4'>
                                        {mDataFull.webDirectoriesTitle}
                                    </h4>
                                    <div className='mb-4 p-4'>
                                        {webDirectories ? (
                                            webDirectories?.map((item, index) => (
                                                <>
                                                    <p key={index}>{item}</p>
                                                </>
                                            ))
                                        ) : (
                                            <h4>
                                                Calculating...
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </h4>
                                        )}
                                    </div>
                                    <h4 className='rt-result-hading brand-color p-4'>
                                        {mDataFull.contentPlanTitle}
                                    </h4>
                                    <div className='mb-4 p-4'>
                                        {contentPlan ? (
                                            contentPlan?.map((item, index) => (
                                                <>
                                                    <p key={index}>{item}</p>
                                                </>
                                            ))
                                        ) : (
                                            <h4>
                                                Calculating...
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </h4>
                                        )}
                                    </div>
                                     
                                    <h4 className="rt-result-hading brand-color p-4">
                                        {mDataFull?.seoTitle1}
                                    </h4>
                                    <pre>{mDataFull?.basicChecklist}</pre>

                                    <h4 className="rt-result-hading brand-color p-4">
                                        {mDataFull?.seoTitle2}
                                    </h4>
                                    <pre>{mDataFull?.keywordResearch}</pre>

                                    <h4 className="rt-result-hading brand-color p-4">
                                        {mDataFull?.seoTitle3}
                                    </h4>
                                    <pre>{mDataFull?.technicalSEO}</pre>

                                    <h4 className="rt-result-hading brand-color p-4">
                                        {mDataFull?.seoTitle4}
                                    </h4>
                                    <pre>{mDataFull?.onPage}</pre>

                                    <h4 className="rt-result-hading brand-color p-4">
                                        {mDataFull?.seoTitle5}
                                    </h4>
                                    <pre>{mDataFull?.offPage}</pre>

                                    <h4 className='rt-result-hading brand-color p-4'>
                                        {okrDataFull.okr1Title}
                                    </h4>
                                    <div className='mb-4 p-4'>
                                        {okrQ1 ? (
                                            okrQ1?.map((item, index) => (
                                                <>
                                                    <p key={index}>{item}</p>
                                                </>
                                            ))
                                        ) : (
                                            <h4>
                                                Calculating...
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </h4>
                                        )}
                                    </div>

                                  
                                    <h4 className='rt-result-hading brand-color p-4'>
                                      {okrDataFull.okrYearTitle}
                                    </h4>

                                    <div className='mb-4 p-4'>
                                        {okrYear ? (
                                            okrYear?.map((item, index) => (
                                                <>
                                                    <p key={index}>{item}</p>
                                                </>
                                            ))
                                        ) : (
                                            <h4>
                                                Calculating...
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </h4>
                                        )}
                                    </div>

                                </>
                            ) : (
                                <h5>
                                    Please <Link to='/db/home'>Generate</Link> your Magic
                                    Checklist First
                                </h5>
                            )}
                        </Col>
                    </Row>
                </div>
            </Container>
            <footer className="pdf-footer text-center text-lg-start">
                <div className="text-center p-3">
                    ©{currentYear}
                    <a href="https://managedcoder.com/" className='brand-color' target="_blank"> ManagedCoder</a>
                    . All Rights Reserved.
                </div>
            </footer>
        </div>

    )
}

export default PdfFile;
