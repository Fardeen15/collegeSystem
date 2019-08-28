import React from 'react'
import {
    Form,
    Input,
    Select,
    Button,
    message
} from 'antd';
import { auth, db } from '../firabaseConfig';
import { thisTypeAnnotation } from '@babel/types';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
// const { Option } = Select
const { TextArea } = Input

class PostingForm extends React.Component {
    constructor() {
        super()
        this.state = {
            job: '',
            value: ""
        }
    }
    change = (ev) => {
        this.setState({
            job: ev.target.value
        })
    }
    post = () => {
        var newDate = new Date()
        var submitDate = `${newDate.getFullYear()}${newDate.getMonth() + 1}${newDate.getDate()}${newDate.getHours()}${newDate.getMinutes()}${newDate.getMilliseconds()}`
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('Company').child(user.uid).child('personal Information').on('value', (snap) => {
                    var data = snap.val()

                    this.setState({
                        value: data
                    }, () => {
                        var obj = {
                            job: this.state.job,
                            date: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`,
                            name: this.state.value.name
                        }
                        console.log(this.state.value.name)
                        db.ref().child('Company').child(user.uid).child('posts').child(submitDate).set(obj).then(() => {
                            message.success('your data is send')
                            this.setState({
                                job: ""
                            })
                        })
                    })
                })
            }
        })
    }
    render() {
        return (
            <div className="postingform">
                <h1>job positng form</h1>
                <Form {...formItemLayout} onSubmit={this.submit}>

                    <Form.Item label="enter job">
                        <TextArea onChange={(ev) => { this.change(ev) }} value={this.state.job} placeholder="Autosize height based on content lines" autosize />                    </Form.Item>

                    <Form.Item style={{ textAlign: "right" }}>
                        <Button type="primary" onClick={this.post} style={{ width: "20%" }} className="login-form-button" htmlType="submit">
                            post
                      </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default PostingForm