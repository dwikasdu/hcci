import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">HC-UM</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">&copy; 2021 Created by </span>
        <a href="/">cloudmicrosystem.com</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
