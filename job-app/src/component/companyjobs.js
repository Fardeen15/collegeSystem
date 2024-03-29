import React from 'react'
import { auth, db } from '../firabaseConfig';
import { Comment, Avatar, Tooltip, BackTop, Button, Modal, message } from 'antd';

class CompanyJobs extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        this.setState({
            data: []
        })
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('Company').on('value', (snap) => {
                    if (snap.val()) {
                        var data = Object.keys(snap.val())
                        console.log(data)
                        for (var i = 0; i < data.length; i++) {
                            db.ref().child('Company').child(data[i]).child("posts").on('value', (snap) => {
                                if (snap.val()) {
                                    var value = Object.values(snap.val())
                                    var data = this.state.data
                                    for (var j = 0; j < value.length; j++)
                                        data.push(value[j])
                                    this.setState({
                                        data: data
                                    }, () => {
                                        console.log(this.state.data)
                                    })
                                }
                            })
                        }
                    }

                })
            }
        })
    }
    info = (value) => {
        var prop = this.props.val
        Modal.confirm({
            title: ' Job information',
            content: (

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
            ),
            okText: "apply",
            cancelText: 'cancel',
            onOk() {
                var applied = false;
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        db.ref().child('student').child(user.uid).on('value', (snap) => {
                            var data = Object.keys(snap.val());
                            for (var i = 0; i < data.length; i++) {
                                if (data[i] === 'AppliedJobs') {
                                    applied = true
                                } else {

                                    if (applied === true) {
                                        message.error('you are already job applied')

                                    } else {

                                        var newDate = new Date()
                                        var submitDate = `${newDate.getFullYear()}${newDate.getMonth() + 1}${newDate.getDate()}${newDate.getHours()}${newDate.getMinutes()}${newDate.getMilliseconds()}`
                                        var obj = {
                                            category: prop.category,
                                            email: prop.email,
                                            name: prop.name,
                                            number: prop.number,
                                            applyJOb: 'Applied'

                                        }
                                        auth.onAuthStateChanged((user) => {
                                            if (user) {
                                                db.ref().child('student').child(user.uid).child('personal Information').update(obj)
                                                db.ref().child('user').child(user.uid).child('personal Information').update(obj)
                                                db.ref().child('student').child(user.uid).child('AppliedJobs').child(submitDate).set(value)

                                            }
                                        })
                                    }
                                }
                            }
                        })

                    }

                })
            },
            onCancel() {
                console.log(false)
            }

        });
    }

    render() {
        return (
            <div style={{ overflowY: "scroll", height: "90vh" }}>
                <h1>Company Jobs</h1>
                {this.state.data.length ?
                    this.state.data.map((value, index) => {
                        return (
                            <Comment

                                key={index}
                                actions={<Button onClick={this.info}>Show Detail</Button>}
                                author={value.name}
                                avatar={
                                    <Avatar
                                        alt={value.name}
                                    >{value.name[0]}</Avatar>
                                }
                                content={
                                    <div>
                                        <p>{value.Description}  <Button type="danger" onClick={() => this.info(value)}>Show Detail</Button></p>
                                    </div>
                                }
                                datetime={
                                    <Tooltip >
                                        <span>{value.date}</span>
                                    </Tooltip>
                                }
                            />

                        )
                    })
                    : <p>
                        no job yet
                    </p>}

                <BackTop>
                    <div className="ant-back-top-inner">UP</div>
                </BackTop>


            </div>
        )
    }
}
export default CompanyJobs