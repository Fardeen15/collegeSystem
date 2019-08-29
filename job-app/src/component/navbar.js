
import React from 'react';
import { db, auth } from '../firabaseConfig'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import StudentsData from './studentsData';
import CompanyJobs from './companyjobs';
import PostingForm from './postingForm';
import { withRouter } from 'react-router-dom'

import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
      </p>
        {content}
    </div>
);

class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            value: "",
            visible: false,
            student: true,
            company: false,
            form: false
        }
    }
    navcheck = (value) => {
        if (value === "student") {
            //   console.log(this.state.student)
            this.setState({
                student: true,
                company: false,
                form: false
            })
        } else if (value === "company") {
            this.setState({
                student: false,
                company: true,
                form: false
            })
        } else if (value === "form") {
            this.setState({
                student: false,
                company: false,
                form: true
            })
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('user').child(user.uid).child('personal Information').on('value', (snap) => {
                    var data = snap.val()
                    // console.log(data)
                    this.setState({
                        value: data
                    })
                })
            }
        })
    }
    signout = () => {
        auth.signOut().then(() => this.props.history.push('/'))
    }
    render() {
        const { Header, Content, Footer } = Layout;
        // console.log(this.state.value)
        return (
            <div>

                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" ><Avatar  onClick={this.showDrawer} size="large">{this.state.value ? this.state.value.name[0] : null}</Avatar></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        {this.state.value.category === "Company" ?
                            <Menu.Item onClick={() => { this.navcheck('student') }} key="1">Students Data</Menu.Item>
                            :
                            <Menu.Item onClick={() => { this.navcheck('company') }} key="2">Jobs</Menu.Item>
                        }
                        <Menu.Item onClick={() => { this.navcheck('form') }} key="3">Posting Form</Menu.Item>
                        {/* <Menu.Item key="3">nav 3</Menu.Item> */}

                    </Menu>
                    <Content>
                        {this.state.student && this.state.value.category === "Company"  ?
                            // console.log(true)
                            <StudentsData />
                            : null}
                        {this.state.company && this.state.value.category === "student"?
                            <CompanyJobs />
                            : null}
                        {this.state.form ?
                            <PostingForm category = {this.state.value ? this.state.value.category : null} />
                            : null}
                    </Content>
                </Header>
                <Drawer
                
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p style={{ ...pStyle, marginBottom: 24 }}> <Avatar>{this.state.value ? this.state.value.name[0] : null}</Avatar> User Profile</p>
                    <p style={pStyle}>Personal</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Full Name" content={this.state.value.name} />{' '}
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Account" content={this.state.value.email} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="catergory" content={this.state.value.category} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Birthday" content="February 2,1900" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Website" content="-" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Message"
                                content="Make things as simple as possible but no simpler."
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button onClick={this.signout}>Sign out</Button>
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>Company</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Position" content="Programmer" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Responsibilities" content="Coding" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Department" content="AFX" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Skills"
                                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>Contacts</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Email" content={this.state.value.email} />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Phone Number" content={this.state.value.number} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Github"
                                content={
                                    <a href="http://github.com/ant-design/ant-design/">
                                        github.com/ant-design/ant-design/
                    </a>
                                }
                            />
                        </Col>
                    </Row>
                </Drawer>
            </div>
        );
    }
}
export default withRouter(Navbar)