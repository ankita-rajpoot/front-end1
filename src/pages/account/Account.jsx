import React from 'react'
import Cover from '../../components/cover/Cover'
import Footer from '../../components/footer/Footer'
import NewAccountPost from '../../components/newAccountPost/NewAccountPost'
import Top from '../../components/top/Top'
import './account.css'
import Rightbar from '../../components/rightbar/Rightbar'

const Account = () => {
  return (
    <>
      <Top />
      <div className="mainContainer d-flex">
        <Cover />
        <div className="nADiv">
          <NewAccountPost />
          <Rightbar />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Account