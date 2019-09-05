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
          user: "",
          drawer: false
    
        }
      }
      componentWillMount(){
        auth.onAuthStateChanged((user)=>{
          if(user){
            this.props.history.push('/darwer')
          }
        })
      }
      signIn = (event) => {
        event.preventDefault()
        console.log(this.props)
    
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            //    var data = [this.state.category];
            //    for(var i = 0; i < data.length; i++){
            //        db.ref().child(data[i]).on((snap)=>{
            //             var info = Object.keys(snap.val())
            //             for(var j = 0 ; j < info.length; j++){
            //                 if(res.user.uid === info[j]){
            //                     console.log(info[j])
            //                 }
            //             }
            //        })
            //    }
    
            db.ref().child('user').child(res.user.uid).child('personal Information').on('value', (snap) => {
              var data = snap.val();
              this.setState({
                user: data.category,
                drawer: true
              }, () => {
                console.log(this.state.user)
                this.props.history.push('/darwer')
    
              })
              // db.ref().child(data.category).child(res.user.uid).on
              // if (this.state.category === data.category) {
              // }
              // else {
              //   message.error('please select correct category')
              // }
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
        // console.log(this.props)
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
                  <h2>Collage Recuipment LogIn</h2>
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
                    <Form.Item>
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