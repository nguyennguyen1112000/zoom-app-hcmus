import React, { useState } from 'react'
import axios from 'axios'

function ServerError() {
 
  return (
    <>
    <div> 
      <div className="wrapper error-page pa-0">
          <header className="sp-header"                               
          >
            <div className="sp-logo-wrap pull-left">
              <a href="index.html">
                <img className="brand-img mr-10" src="../img/logo.png" alt="brand" />
                <span className="brand-text">Protoring Zoom</span>
              </a>
            </div>
            <div className="form-group mb-0 pull-right">
              <a className="inline-block btn btn-success btn-rounded btn-outline nonecase-font" href="index.html">Back to Home</a>
            </div>
            <div className="clearfix" />
          </header>
          {/* Main Content */}
          <div className="page-wrapper pa-0 ma-0 error-bg-img">
            <div className="container-fluid">
              {/* Row */}
              <div className="table-struct full-width full-height">
                <div className="table-cell vertical-align-middle auth-form-wrap">
                  <div className="auth-form  ml-auto mr-auto no-float">
                    <div className="row">
                      <div className="col-sm-12 col-xs-12">
                        <div className="mb-30">
                          <span className="block error-head text-center txt-success mb-10">500</span>
                          <span className="text-center nonecase-font mb-20 block error-comment">Oops! Internal Server Error</span>
                          <p className="text-center">There was an Error. Please try again later. That's all we know.</p>
                        </div>	
                      </div>	
                    </div>
                  </div>
                </div>
              </div>
              {/* /Row */}	
            </div>
          </div>
          {/* /Main Content */}
        </div>
        </div>
    </>
  )
}

export default ServerError
