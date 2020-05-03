import React from 'react';
import { MDBLink, MDBBtn, MDBInput, MDBTypography, MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';
import { Redirect } from 'react-router-dom'

class LoginFormSection extends React.Component {
    constructor() {
        super()
        this.state = {
            style: { display: "None" }
        }
        this.handleClickNext = this.handleClickNext.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleClickNext(event) {

        var phoneno = /^\d{10}$/;
        if (!document.getElementById("phone").value.match(phoneno)) {

            document.getElementById("phone").setAttribute("style", "border-bottom: 1px solid #ff0000")
            document.getElementById("invalid1").removeAttribute("style")

        }
        else {
            fetch('https://sahayak-manhattan-project.herokuapp.com/doctor/auth/send-otp', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "phone": "+91 " + document.getElementById("phone").value }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById("input1").setAttribute("style", "display:None")
                        document.getElementById("input2").removeAttribute("style")
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }



    }
    handleLogin() {
        fetch('https://sahayak-manhattan-project.herokuapp.com/doctor/auth/verify-otp', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "phone": "+91 " + document.getElementById("phone").value, "otp": document.getElementById("otp").value }),
        })
            .then(response => response.json())
            .then(data => {

                if (data.success) {
                    localStorage.setItem('token', data.data.token)
                    fetch('https://sahayak-manhattan-project.herokuapp.com/doctor/get-profile', {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "token": localStorage.getItem('token') }),
                    })
                        .then(response => response.json())
                        .then(data => {

                            if (data.success) {
                                return <Redirect to='/dashboard' />
                                

                            }
                            else {
                                console.log("cndajn")
                                window.location.href = '/path'
                                
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
                else {
                    console.log("dasca")
                    document.getElementById("otp").setAttribute("style", "border-bottom: 1px solid #ff0000")
                    document.getElementById("invalid2").removeAttribute("style")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }

    render() {

        return (<MDBContainer>
            <MDBRow id="input1" >
                <MDBCol>

                    <MDBTypography tag='h4' variant="h4-responsive">Enter Mobile Number</MDBTypography>

                    <div className="text-left py-3 px-md-5 " >
                        <MDBInput className="isInvalid" validate id="phone" label="Mobile Number" icon="phone-alt" />
                        <p id="invalid1" style={{ display: "None" }} className="text-center red-text">Please Provide A Valid Number</p>
                    </div >

                    <MDBRow className=" py-3 px-md-5" >
                        <MDBCol className="text-left py-3 ">
                            <MDBLink to='#' link>
                                <MDBTypography tag='h6'>Create An Account</MDBTypography>
                            </MDBLink>
                        </MDBCol>
                        <MDBCol className="text-right"><MDBBtn onClick={this.handleClickNext} color="light-blue">Next</MDBBtn></MDBCol>


                    </MDBRow>



                </MDBCol>

            </MDBRow>
            <MDBRow style={this.state.style} id="input2" >
                <MDBCol>
                    <MDBTypography tag='h4' variant="h4-responsive">Enter OTP </MDBTypography>

                    <div className=" py-3 p-3 px-md-5" >
                        <MDBInput id="otp" label="OTP" />
                        <p id="invalid2" style={{ display: "None" }} className="text-center red-text">Incorrect OTP</p>
                    </div>


                    <MDBRow className=" py-3 px-md-5" >
                        <MDBCol className="text-left py-3 ">
                            <MDBLink to='#' link>
                                <MDBTypography tag='h6'>Create An Account</MDBTypography>
                            </MDBLink>
                        </MDBCol>
                        <MDBCol className="text-right"><MDBBtn onClick={this.handleLogin} color="light-blue">Log in</MDBBtn></MDBCol>

                    </MDBRow>



                </MDBCol>

            </MDBRow>

        </MDBContainer>)

    }
}

export default LoginFormSection;

