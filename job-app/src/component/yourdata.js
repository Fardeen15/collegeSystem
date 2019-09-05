import React, { Component } from 'react'
import { auth, db } from '../firabaseConfig';
import { Card, Row, Col, Button, Popconfirm, message } from 'antd'
class PostingData extends Component {
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
                db.ref().child('student').child(user.uid).child('data').on('value', (snap) => {
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
    delete = (index) => {
        var keys = this.state.keys
        // var stt = this.state.data
        console.log("run")
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('student').child(user.uid).child('data').child(keys[index]).remove().then(() => {
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
    del = (index) => {
        this.delete(index)
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
                                    <Card title={<div>
                                        <Button onClick={() => {
                                            this.props.edit(value, this.state.keys[index])
                                        }}>Edit</Button> <Popconfirm
                                            title="Are you sure delete this data?"
                                            onConfirm={() => {
                                                this.del(index)
                                                console.log(true)
                                            }}
                                            // onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button type="danger">delete</Button>
                                        </Popconfirm>
                                    </div>} bordered={false} style={{ width: "90%" }}>
                                        <div>
                                            <p><b>First Name</b> : {value.firstName}</p>
                                            <p><b>Last Name</b> : {value.lastname}</p>
                                            <p><b>Qualification</b> : {value.qualification}</p>
                                            <p><b>Skills</b> : {value.skils}</p>
                                            <p><b>Email</b> : {value.email}</p>
                                            <p><b>Birth Date</b> : {value.birthdate}</p>
                                            <p><b>Number</b> : {value.number}</p>
                                            <p><b>Address</b> : {value.addres}</p>
                                            <p><b>City</b> : {value.city}</p>

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
export default PostingData