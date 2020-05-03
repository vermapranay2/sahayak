import React from 'react'
import { MDBCard, MDBCol, MDBRow, MDBView, MDBMask, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBIcon } from 'mdbreact';
import src1 from '../../assets/img-1.jpg';
import LoginFromSection from './sections/LoginFormSection'
import login from '../../assets/login.svg'

class LoginPage extends React.Component {
    constructor(){
        super()

    }

    render(){
        return (
            <React.Fragment>
                <MDBRow className="justify-content-center">
                
                <MDBCol md="6" lg="9">
                <section className="text-center pb-3">
                  <MDBRow className="d-flex justify-content-center">
                    <MDBCol lg="6" xl="5" className="mb-3">
                      <MDBCard className="d-flex mb-5">
                        <MDBView>
                        <MDBCardImage cascade className="img-fluid" src={login} />
                          {/* <img src={login} alt="Project" className="img-fluid"/> */}
                          <MDBMask overlay="white-slight"/>
                        </MDBView>
                        <MDBCardBody>
                          <LoginFromSection/>
                        </MDBCardBody>
                        
                      </MDBCard>
                    </MDBCol>
                    
                  </MDBRow>
                  
                </section>
              </MDBCol>
            </MDBRow>
            </React.Fragment>
          )

    }
  
}

export default LoginPage;