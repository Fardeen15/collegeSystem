import React from 'react'
import { auth, db } from '../firabaseConfig';
import { Comment, Avatar, Tooltip,BackTop } from 'antd';

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
    render() {
        return (
            <div style={{ overflowY: "scroll", height: "90vh" }}>
                <h1>Company Jobs</h1>
                {this.state.data ?
                    this.state.data.map((value, index) => {
                        return (
                            <Comment
                                key={index}
                                // actions={actions}
                                author={value.name}
                                avatar={
                                    <Avatar
                                        alt={value.name}
                                    >{value.name[0]}</Avatar>
                                }
                                content={
                                    <p>{value.job}</p>
                                }
                                datetime={
                                    <Tooltip >
                                        <span>{value.date}</span>
                                    </Tooltip>
                                }
                            />

                        )
                    })
                    : null}
                    
                    <BackTop>
                        <div className="ant-back-top-inner">UP</div>
                    </BackTop>
                    
                    
            </div>
        )
    }
}
export default CompanyJobs