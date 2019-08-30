import React from 'react'
import {
    Form,
    Input,
    Select,
    Button,
    message,
    DatePicker
} from 'antd';
import { auth, db } from '../firabaseConfig';

// import { thisTypeAnnotation } from '@babel/types';

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
const { Option } = Select

class PostingForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            date: "",
            CompanyName: "",
            CompanyWebsite: "",
            CompanyEmail: "",
            jobType: '',
            jobCategroy: "",
            Description: "",
            number: "",
            firstname: "",
            lastname: "",
            qualification: "",
            birthdate: "",
            skils: "",
            email: "",
            value: "",
            Address: "",
            City: "",
            child: ""
        }
    }
    change = (ev, val) => {
        if (val === "companyname") {

            this.setState({
                CompanyName: ev.target.value
            })
        } else if (val === "companywebsite") {

            this.setState({
                CompanyWebsite: ev.target.value
            })
        } else if (val === "companyemail") {

            this.setState({
                CompanyEmail: ev.target.value
            })
        } else if (val === "jon type") {

            this.setState({
                jobType: ev
            })
        } else if (val === "categry") {

            this.setState({
                jobCategroy: ev
            })
        } else if (val === "description") {

            this.setState({
                Description: ev.target.value
            })
        } else if (val === "number") {

            this.setState({
                number: ev.target.value
            })
        }
    }
    change2 = (ev, val) => {
        if (val === "firstname") {

            this.setState({
                firstname: ev.target.value
            })
        } else if (val === "lastname") {

            this.setState({
                lastname: ev.target.value
            })
        } else if (val === "email") {

            this.setState({
                email: ev.target.value
            })
        } else if (val === "qualification") {

            this.setState({
                qualification: ev.target.value
            })
        } else if (val === "number") {

            this.setState({
                number: ev.target.value
            })
        } else if (val === "birthdate") {
            console.log()
            this.setState({
                birthday: `${ev._d.getFullYear()}/${ev._d.getMonth() + 1}/${ev._d.getDate()}`
            })
        } else if (val === "skils") {

            this.setState({
                skils: ev.target.value
            })
        } else if (val === "Address") {

            this.setState({
                Address: ev.target.value
            })
        } else if (val === "City") {

            this.setState({
                City: ev.target.value
            })
        }
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
                            companyname: this.state.CompanyName,
                            companyemail: this.state.CompanyEmail,
                            companywebsite: this.state.CompanyWebsite,
                            jobType: this.state.jobType,
                            jobCategroy: this.state.jobCategroy,
                            Description: this.state.Description,
                            number: this.state.number,
                            date: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`,
                            name: this.state.value.name
                        }
                        console.log(this.state.value.name)
                        db.ref().child('Company').child(user.uid).child('posts').child(submitDate).set(obj).then(() => {
                            message.success('your data is send')
                            this.setState({
                                job: "",
                                CompanyName: "",
                                CompanyEmail: "",
                                CompanyWebsite: "",
                                jobType: "",
                                jobCategroy: "",
                                number: "",
                                Description: "",
                            })
                        })
                    })
                })
            }
        })
    }
    update = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var obj = {
                    companyname: this.state.CompanyName,
                    companyemail: this.state.CompanyEmail,
                    companywebsite: this.state.CompanyWebsite,
                    jobType: this.state.jobType,
                    jobCategroy: this.state.jobCategroy,
                    Description: this.state.Description,
                    number: this.state.number,
                    date: this.state.date,
                    name: this.state.name
                }
                console.log(this.state.value.name)
                db.ref().child('Company').child(user.uid).child('posts').child(this.state.child).update(obj).then(() => {
                    message.success('your data is update')
                    this.setState({
                        job: "",
                        CompanyName: "",
                        CompanyEmail: "",
                        CompanyWebsite: "",
                        jobType: "",
                        jobCategroy: "",
                        number: "",
                        Description: "",
                    })
                })


            }
        })
    }


    post2 = () => {
        var newDate = new Date()
        var submitDate = `${newDate.getFullYear()}${newDate.getMonth() + 1}${newDate.getDate()}${newDate.getHours()}${newDate.getMinutes()}${newDate.getMilliseconds()}`
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('student').child(user.uid).child('personal Information').on('value', (snap) => {
                    var data = snap.val()

                    this.setState({
                        value: data
                    }, () => {
                        var obj = {
                            firstName: this.state.firstname,
                            lastname: this.state.lastname,
                            qualification: this.state.qualification,
                            skils: this.state.skils,
                            email: this.state.email,
                            birthdate: this.state.birthdate,
                            number: this.state.number,
                            addres: this.state.Address,
                            city: this.state.City,
                            date: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`,
                            name: this.state.value.name
                        }
                        console.log(this.state.value.name)
                        db.ref().child('student').child(user.uid).child('data').child(submitDate).set(obj).then(() => {
                            message.success('your data is send')
                            this.setState({
                                job: "",
                                firstname: "",
                                lastname: "",
                                qualification: "",
                                skils: "",
                                email: "",
                                number: "",
                                Address: "",
                                City: "",
                                birthdate: "",
                            })
                        })
                    })
                })
            }
        })
    }
    update2 = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {

                var obj = {
                    firstName: this.state.firstname,
                    lastname: this.state.lastname,
                    qualification: this.state.qualification,
                    skils: this.state.skils,
                    email: this.state.email,
                    birthdate: this.state.birthdate,
                    number: this.state.number,
                    addres: this.state.Address,
                    city: this.state.City,
                    date: this.state.date,
                    name: this.state.name
                }
                console.log(this.state.value.name)
                db.ref().child('student').child(user.uid).child('data').child(this.state.child).update(obj).then(() => {
                    message.success('your data is update')
                    this.setState({
                        job: "",
                        firstname: "",
                        lastname: "",
                        qualification: "",
                        skils: "",
                        email: "",
                        number: "",
                        Address: "",
                        City: "",
                        birthdate: "",
                    })
                })

            }
        })
    }

    changeValue2 = () => {
        if (this.props.data) {
            var data = this.props.data
            this.setState({
                firstname: data.firstName,
                lastname: data.lastname,
                date: data.date,
                qualification: data.qualification,
                name: data.name,
                skils: data.skils,

                email: data.email,

                birthdate: data.birthdate,

                Address: data.addres,

                number: data.number,
                City: data.city,
                child: this.props.index
            })
        }
    }
    changeValue = () => {
        if (this.props.data) {
            var data = this.props.data
            this.setState({
                CompanyName: data.companyname,
                name: data.name,
                date: data.date,
                CompanyWebsite: data.companywebsite,

                CompanyEmail: data.companyemail,

                jobType: data.jobType,

                jobCategroy: data.jobCategroy,

                Description: data.Description,

                number: data.number,
                child: this.props.index,
            })
        }
    }
    componentWillMount() {
        if (this.props.edit) {
            this.changeValue()
        }
        if (this.props.edit2) {
            this.changeValue2()
        }
    }
    render() {
        const arr = ["Accounting", "Executive	", "Manufacturing"
            , "Admin & Clerical", "Franchise", "Nonprofit"
            , " Banking & Finance", "Government", "Part Time"
            , " Business Opportunities", "Health Care", "Retail"
            , "Contract & Freelance", "Hospitality", 'Sales & Marketing'
            , "Customer Service", 'Human Resources', "Science & Biotech"
            , "Diversity Opportunities", "Information Technology", "Transportation"
            , " Engineering", "Internships & College"
        ]
        console.log(this.props.category)
        const dateFormat = 'YYYY/MM/DD';
        return (
            <div className="postingform">
                {this.props.edit ?
                    <h1>Edit form</h1>
                    :
                    <h1>positng form</h1>
                }
                {this.props.category === "Company" ?
                    <Form {...formItemLayout} onSubmit={this.submit}>
                        <h1>Comapny Information</h1><hr />
                        <Form.Item label="Company Name">
                            <Input onChange={(ev) => { this.change(ev, "companyname") }} value={this.state.CompanyName} />
                        </Form.Item>
                        <Form.Item label="Company Website">
                            <Input onChange={(ev) => { this.change(ev, "companywebsite") }} value={this.state.CompanyWebsite} />
                        </Form.Item>
                        <Form.Item label="Company Email">
                            <Input onChange={(ev) => { this.change(ev, "companyemail") }} value={this.state.CompanyEmail} />
                        </Form.Item>
                        <h1>Job Information</h1><hr />
                        <Form.Item label="job type">
                            <Select allowClear onChange={(ev) => this.change(ev, "jon type")} required defaultValue={this.state.jobType}>
                                <Option value="Half Time">Half Time</Option>
                                <Option value="Full Time">Full Time</Option>
                                <Option value="Part Time">frelancer</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="job categry">
                            <Select allowClear showSearch onChange={(ev) => this.change(ev, "categry")} required defaultValue={this.state.jobCategroy}>
                                {arr.map((value, index) => {
                                    return <Option key={index} value={value}>{value}</Option>
                                })}

                            </Select>
                        </Form.Item>
                        <Form.Item label="Contact Number">
                            <Input onChange={(ev) => { this.change(ev, "number") }} value={this.state.number} />
                        </Form.Item>
                        <Form.Item label="Description">
                            <TextArea onChange={(ev) => { this.change(ev, "description") }} value={this.state.Description} placeholder="Autosize height based on content lines" autosize />
                        </Form.Item>
                        {this.props.edit ?
                            <Form.Item style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.update} style={{ width: "20%" }} className="login-form-button" htmlType="submit">
                                    update
                                </Button>
                            </Form.Item>
                            :
                            <Form.Item style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.post} style={{ width: "20%" }} className="login-form-button" htmlType="submit">
                                    post
                                </Button>
                            </Form.Item>}
                    </Form>
                    :
                    <Form {...formItemLayout} >
                        {this.props.edit2 ?
                            <h1>Edit Form</h1>
                            :
                            <h1>Student Information</h1>
                        }
                        <Form.Item label="first Name">
                            <Input onChange={(ev) => { this.change2(ev, "firstname") }} value={this.state.firstname} />
                        </Form.Item>
                        <Form.Item label="last Name">
                            <Input onChange={(ev) => { this.change2(ev, "lastname") }} value={this.state.lastname} />
                        </Form.Item>
                        <Form.Item label="Qualification">
                            <Input onChange={(ev) => { this.change2(ev, "qualification") }} value={this.state.qualification} />
                        </Form.Item>
                        <Form.Item label="Birth date">
                            <DatePicker onChange={(ev) => { this.change2(ev, "birthdate") }} format={dateFormat} />
                        </Form.Item>
                        <Form.Item label="Address">
                            <TextArea onChange={(ev) => { this.change2(ev, "Address") }} value={this.state.Address} autosize />
                        </Form.Item>
                        <Form.Item label="City">
                            <TextArea onChange={(ev) => { this.change2(ev, "City") }} value={this.state.City} autosize />
                        </Form.Item>
                        <Form.Item label="skils">
                            <TextArea onChange={(ev) => { this.change2(ev, "skils") }} value={this.state.skils} autosize />
                        </Form.Item>

                        <Form.Item label="Contact Number">
                            <Input onChange={(ev) => { this.change2(ev, "number") }} value={this.state.number} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input onChange={(ev) => { this.change2(ev, "email") }} value={this.state.email} />
                        </Form.Item>
                        {this.props.edit2 ?
                            <Form.Item style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.update2} style={{ width: "20%" }} className="login-form-button" htmlType="submit">
                                    update
                                </Button>
                            </Form.Item>
                            :
                            <Form.Item style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.post2} style={{ width: "20%" }} className="login-form-button" htmlType="submit">
                                    post
                            </Button>
                            </Form.Item>}

                    </Form>}

            </div>
        )
    }
}
export default PostingForm