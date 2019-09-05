import React, { Component } from 'react'
import { auth, db } from '../firabaseConfig';
import { Card, Row, Col, Button, Popconfirm, message } from 'antd'
class AppliedJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            keys: []
        }
    }
    data = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    data: [],
                    keys: []
                })
                db.ref().child('student').child(user.uid).child('AppliedJobs').on('value', (snap) => {
                    if (snap.val()) {

                        var data = Object.values(snap.val())
                        var key = Object.keys(snap.val())
                        var stt = this.state.data
                        var keys = this.state.keys
                        for (var i = 0; i < data.length; i++) {
                            stt.push(data[i])
                            keys.push(key[i])
                        }
                        this.setState({
                            data: stt,
                            keys
                        })
                    } else {
                        message.warning('no data yet')
                    }
                })
            }
        })
    }
    componentWillMount() {
        this.data()
    }
    render() {
        return (
            // <div>
            <Row gutter={48} style={{ overflowY: "scroll", height: "90vh" }}>
                {this.state.data.length ?
                    this.state.data.map((value, index) => {
                        return (
                            <Col key={index} span={12}>
                                <div style={{ background: '#ECECEC', padding: '30px', marginTop: "10px" }}>
                                    <Card bordered={false} style={{ width: "90%" }}>
                                        <div>
                                            <h3>Company information</h3><hr />
                                            <p><b>Company Name</b> : {value.companyname}</p>
                                            <p><b>Company Email</b> : {value.companyemail}</p>
                                            <p><b>Company website</b> : {value.companywebsite}</p>
                                            <h3>Job requirement</h3><hr />
                                            <p><b>job Categroy</b> : {value.jobCategroy}</p>
                                            <p><b>Timing</b> : {value.jobType}</p>
                                            <hr />
                                            Contact us : {value.number}
                                        </div>
                                    </Card>
                                </div>
                            </Col>

                        )

                    })
                    : null}
            </Row>
            // </div>
        )
    }
}
export default AppliedJobs