import React from 'react'
import EachAntivirus from './EachAntivirus'

const ScanResult = ({data}) => {
  return (
    <div>
      <EachAntivirus data={data.data.attributes.last_analysis_results} />
    </div>
  )
}

export default ScanResult
