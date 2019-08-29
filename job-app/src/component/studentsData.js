import React from 'react'
import { auth, db } from '../firabaseConfig';
import { Modal, Button, List, Avatar } from 'antd'

class StudentsData extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            modal: false,
            value: []
        }
    }
    get = () => {
        this.setState({
            value: []
        })
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('student').on('value', (snap) => {
                    if (snap.val()) {
                        var data = Object.keys(snap.val())
                        console.log(data)
                        for (var i = 0; i < data.length; i++) {
                            db.ref().child('student').child(data[i]).child('personal Information').on('value', (snap) => {
                                if (snap.val()) {
                                    var value = snap.val()
                                    var data = this.state.value
                                    // for (var j = 0; j < value.length; j++)
                                    data.push(value)
                                    this.setState({
                                        value: data
                                    }, () => {
                                        console.log(this.state.value)
                                    })
                                }
                            })
                        }
                    }

                })
            }
        })
    }
    componentWillMount() {
        this.get()
        this.setState({
            data: []
        })
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('student').on('value', (snap) => {
                    if (snap.val()) {
                        var data = Object.keys(snap.val())
                        console.log(data)
                        for (var i = 0; i < data.length; i++) {
                            db.ref().child('student').child(data[i]).child("data").on('value', (snap) => {
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

    name = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    info = (value) => {
        console.log(value)
        Modal.info({
            title: <h1>student data</h1>,
            content: (
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
            ),
            onOk() { },
        });
    }

    render() {
        return (
            <div>
                <h1>Students name</h1>
                {this.state.data.length ?
                    // <div>
                    this.state.data.map((value, index) => {
                        return (
                            <List
                                key={index}
                                dataSource={[value]}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar>{item.name[0]}</Avatar>
                                            }
                                            title={item.name}
                                            description={item.email}
                                        />
                                        <Button type="danger" key={index} onClick={() => this.info(value)}>show data</Button>
                                    </List.Item>
                                )}
                            ></List>
                        )
                    })

                    : <p>no data yet</p>}
            </div>
        )
    }
}



export default StudentsData