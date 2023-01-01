import React from 'react'
import Footer from '../../components/footer/Footer'
import OCover from '../../components/oCover/OCover'
import ONewAccountPost from '../../components/oNewAccountPost/ONewAccountPost'
import ORightBar from '../../components/oRightBar/ORightBar'
import OTop from '../../components/oTop/OTop'
import './oUserProfile.css'

const OUserProfile = () => {
  return (
    <>
      <OTop />
      <div className="mainContainer d-flex">
        <OCover />
        <div className="nADiv">
            <ONewAccountPost />
            <ORightBar />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default OUserProfile