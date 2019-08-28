import React from 'react'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Button,
    message
} from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { db, auth } from '../firabaseConfig'

class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            confopass: "",
            number: "",
            category: "select",
        }
    }
    change = (ev, val) => {
        if (val === "name") {
            this.setState({
                name: ev.target.value
            })
        } else if (val === "email") {
            this.setState({
                email: ev.target.value
            })
        } else if (val === "pass") {
            this.setState({
                password: ev.target.value
            })
        } else if (val === "confopass") {
            this.setState({
                confopass: ev.target.value
            })
        } else if (val === "number") {
            this.setState({
                number: ev.target.value
            })
        } else if (val === "categry") {
            console.log(ev)
            this.setState({
                category: ev
            })
        }

    }
    submit = (event) => {
        event.preventDefault()
        const obj = {
            name: this.state.name,
            email: this.state.email,
            number: this.state.number,
            category: this.state.category
        }
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                db.ref().child(this.state.category).child(res.user.uid).child('personal Information').set(obj)
                auth.signOut().then(() => {
                    this.props.history.push('/')
                })
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                message.error(errorMessage)
                // ...
            });
    }
    render() {
        const { Option } = Select

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



        return (
            <div className="signup">
                <h1>Sign Up</h1>
                <Form {...formItemLayout} onSubmit={this.submit}>
                    <Form.Item
                        label={
                            <span>
                                Nickname&nbsp;
                          <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        <Input onChange={(ev) => this.change(ev, "name")} required />
                    </Form.Item>
                    <Form.Item label="E-mail">
                        <Input onChange={(ev) => this.change(ev, "email")} required type="email" />
                    </Form.Item>
                    <Form.Item label="Password" >
                        <Input.Password onChange={(ev) => this.change(ev, "pass")} required type="password" />
                    </Form.Item>
                    <Form.Item label="Confirm Password">
                        <Input.Password onChange={(ev) => this.change(ev, "confopass")} required type="password" />
                    </Form.Item>


                    <Form.Item label="Phone Number">
                        <Input onChange={(ev) => this.change(ev, "number")} type="number" required />
                    </Form.Item>
                    <Form.Item label="select category">
                        <Select onChange={(ev) => this.change(ev, "categry")} required defaultValue={this.state.category}>
                            <Option value="student">student</Option>
                            <Option value="Company">Company</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{ width: "170%" }} className="login-form-button" htmlType="submit">
                            Register
                      </Button>
                    </Form.Item>
                </Form>
            </div>

        )
    }
}
export default withRouter(Signup)