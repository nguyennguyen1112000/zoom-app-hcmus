import React from 'react'

function Document() {
  return (
    <div className='page-wrapper' style={{ minHeight: '722px' }}>
      <div className='container-fluid'>
        {/* Title */}
        <div className='row heading-bg'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
            <h5 className='txt-dark'>FAQ</h5>
          </div>
          {/* Breadcrumb */}
          <div className='col-lg-9 col-sm-8 col-md-8 col-xs-12'>
            <ol className='breadcrumb'>
              <li>
                <a href='index.html'>Dashboard</a>
              </li>
              <li>
                <a href='#'>
                  <span>Special pages</span>
                </a>
              </li>
              <li className='active'>
                <span>faq</span>
              </li>
            </ol>
          </div>
          {/* /Breadcrumb */}
        </div>
        {/* /Title */}
        {/* Row */}
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-default card-view'>
              <div className='panel-wrapper collapse in'>
                <div className='panel-body pa-15'>
                  <div
                    className='panel-group accordion-struct'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading activestate'
                        role='tab'
                        id='headingFive'
                      >
                        <a
                          role='button'
                          data-toggle='collapse'
                          href='#collapseFive'
                          aria-expanded='true'
                          aria-controls='collapseFive'
                        >
                          how to install this template ?
                        </a>
                      </div>
                      <div
                        id='collapseFive'
                        className='panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingFive'
                      >
                        <div className='panel-body pa-15'>
                          {' '}
                          Anim pariatur cliche reprehenderit, enim eiusmod high
                          life accusamus terry richardson ad squid. 3 wolf moon
                          officia aute, non cupidatat skateboard dolor brunch.
                          Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                          wolf moon tempor, sunt aliqua put a bird on it squid
                          single-origin coffee nulla assumenda shoreditch et.
                          Nihil anim keffiyeh helvetica, craft beer la.{' '}
                        </div>
                      </div>
                    </div>
                    <div className='panel panel-default'>
                      <div className='panel-heading' role='tab' id='headingSix'>
                        <a
                          className='collapsed'
                          role='button'
                          data-toggle='collapse'
                          data-parent='#accordion'
                          href='#collapseSix'
                          aria-expanded='false'
                          aria-controls='collapseSix'
                        >
                          how to change the CSS ?
                        </a>
                      </div>
                      <div
                        id='collapseSix'
                        className='panel-collapse collapse'
                        role='tabpanel'
                        aria-labelledby='headingSix'
                      >
                        <div className='panel-body pa-15'>
                          {' '}
                          Anim pariatur cliche reprehenderit, enim eiusmod high
                          life accusamus terry richardson ad squid. 3 wolf moon
                          officia aute, non cupidatat skateboard dolor brunch.
                          Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                          wolf moon tempor, sunt aliqua put a bird on it squid
                          single-origin coffee nulla assumenda shoreditch et.
                          Nihil anim keffiyeh helvetica,{' '}
                        </div>
                      </div>
                    </div>
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='headingSeven'
                      >
                        <a
                          className='collapsed'
                          role='button'
                          data-toggle='collapse'
                          href='#collapseSeven'
                          aria-expanded='false'
                          aria-controls='collapseSeven'
                        >
                          How to import CSS ?
                        </a>
                      </div>
                      <div
                        id='collapseSeven'
                        className='panel-collapse collapse'
                        role='tabpanel'
                        aria-labelledby='headingSeven'
                      >
                        <div className='panel-body pa-15'>
                          {' '}
                          Anim pariatur cliche reprehenderit, enim eiusmod high
                          life accusamus terry richardson ad squid. 3 wolf moon
                          officia aute, non cupidatat skateboard dolor brunch.
                          Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                          wolf moon tempor, sunt aliqua put a bird on it squid
                          single-origin coffee nulla assumenda shoreditch et.
                          Nihil anim keffiyeh helvetica, inable VHS.{' '}
                        </div>
                      </div>
                    </div>
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='headingEight'
                      >
                        <a
                          className='collapsed'
                          role='button'
                          data-toggle='collapse'
                          data-parent='#accordion'
                          href='#collapseEight'
                          aria-expanded='false'
                          aria-controls='collapseEight'
                        >
                          {' '}
                          How to include JS file ?
                        </a>
                      </div>
                      <div
                        id='collapseEight'
                        className='panel-collapse collapse'
                        role='tabpanel'
                        aria-labelledby='headingEight'
                      >
                        <div className='panel-body pa-15'>
                          {' '}
                          Anim pariatur cliche reprehenderit, enim eiusmod high
                          life accusamus terry richardson ad squid. 3 wolf moon
                          officia aute, non cupidatat skateboard dolor brunch.
                          Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                          wolf moon tempor, sunt aliqua put a bird on it squid
                          single-origin coffee nulla assumenda shoreditch et.
                          Nihil anim keffiyeh helvetica, inable VHS.{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Row */}
      </div>
      {/* Footer */}
      <footer className='footer container-fluid pl-30 pr-30'>
        <div className='row'>
          <div className='col-sm-12'>
            <p>2017 © Philbert. Pampered by Hencework</p>
          </div>
        </div>
      </footer>
      {/* /Footer */}
    </div>
  )
}

export default Document
