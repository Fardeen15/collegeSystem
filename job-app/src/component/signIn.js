import React from 'react'
import { Form, Icon, Input, Button, message, Select } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { db, auth } from '../firabaseConfig'


class SignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            category: "select",
            user: false
        }
    }
    signIn = (event) => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                console.log("hi");
                db.ref().child(this.state.category).child(res.user.uid).child('personal Information').on('value', (snap) => {
                    var data = snap.val();
                    if (this.state.category === data.category) {
                        this.props.history.push('/darwer')
                    } else {
                        message.error('please select correct category')
                    }
                })

            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                message.error(errorMessage)
            })
    }
    data = (ev, val) => {
        // ev.preventDefault()
        if (val === "email") {
            this.setState({
                email: ev.target.value
            })
        } else if (val === "pass") {
            this.setState({
                password: ev.target.value
            })
        } else if (val === "categry") {
            this.setState({
                category: ev
            })
        }
    }

    render() {
        console.log(this.props)
        const { Option } = Select
        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 8 },
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 16 },
        //     },
        // };

        return (
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: "50vh"

            }}>
                <Form className="login-form" onSubmit={this.signIn}>
                    <Form.Item label="E-mail">
                        <Input
                            value={this.state.email}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={(ev) => this.data(ev, "email")} required type="email" />
                    </Form.Item>
                    <Form.Item label="Password" >
                        <Input.Password
                            value={this.state.password}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={(ev) => this.data(ev, "pass")} required type="password" />
                    </Form.Item>
                    <Form.Item label="select category">
                        <Select onChange={(ev) => this.data(ev, "categry")} required defaultValue={this.state.category}>
                            <Option value="student">student</Option>
                            <Option value="Company">Company</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/signUp">register now!</Link>
                    </Form.Item>
                </Form>
            </div >
        )
    }
}
export default withRouter(SignIn)