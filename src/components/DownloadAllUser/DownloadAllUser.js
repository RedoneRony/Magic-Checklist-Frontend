import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import './DownloadAllUser.css'
const DownloadAllUser = () => {
  const [allUserEmail, setAllUserEmail] = useState([])

  const convertArrayOfObjectsToCSV = array => {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(allUserEmail[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]
        // eslint-disable-next-line no-plusplus
        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  const downloadCSV = array => {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv == null) return

    const filename = 'allUserEmail.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  const ExportCSV = ({ onExport }) => (
    <>
      <h4 className='mt-4 brand-color'>Download User List</h4>
      <Button onClick={e => onExport(e.target.value)} className='rt-btn mt-4'>
        Export CSV
      </Button>
    </>
  )

  useEffect(() => {
    const getAllEmails = async () => {
      // get data
      await axios
        .get(
          `${process.env.REACT_APP_SITE_API}/api/userOtherInformation/getAll`
        )
        .then(response => {
          const userData = response?.data?.map(i => i)
          setAllUserEmail(userData)
        })
        .catch(error => {
          console.log(error)
        })
    }
    getAllEmails()
  }, [])

  return (
    <div className='mt-4 rt-showing-data'>
      <ExportCSV onExport={() => downloadCSV(allUserEmail)} />
      {/* <div>PageLoad</div> */}
    </div>
  )
}

export default DownloadAllUser
