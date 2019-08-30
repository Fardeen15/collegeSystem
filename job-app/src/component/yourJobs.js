import React, { Component } from 'react'
import { auth, db } from '../firabaseConfig';
import { Card, Row, Col, Button } from 'antd'
class PostingJobs extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            keys: []
        }
    }
    data = () => {
        this.setState({
            data: [],
            keys: []
        })
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('Company').child(user.uid).child('posts').on('value', (snap) => {
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
                })
            }
        })
    }
    delete = (index) => {
        var keys = this.state.keys
        // var stt = this.state.data

        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('Company').child(user.uid).child('posts').child(keys[index]).remove().then(() => {
                    this.data()
                    // stt.splice(index,1)
                    // keys.splice(index,1)
                    // this.setState({
                    //     keys,
                    //     data : stt
                    // })
                })

            }
        })
    }
    componentWillMount() {
        this.data()
    }
    render() {
        console.log(this.state.data)
        return (
            // <div>
            <Row gutter={48} style={{ overflowY: "scroll", height: "90vh" }}>
                {this.state.data.length ?
                    this.state.data.map((value, index) => {
                        return (
                            <Col key={index} span="12">
                                <div style={{ background: '#ECECEC', padding: '30px', marginTop: "10px" }}>
                                    <Card title={<span>
                                        <Button onClick={() => {
                                        this.props.edit(value, this.state.keys[index])
                                    }}>Edit</Button> 
                                    <Button type="danger" onClick={() => {
                                        this.delete(index)
                                    }}>delete</Button>
                                    </span>} bordered={false} style={{ width: "90%" }}>
                                        <div>
                                            <h1>Ali</h1>
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
export default PostingJobs