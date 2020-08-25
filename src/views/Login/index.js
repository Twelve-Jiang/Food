import React, { Component } from 'react'
import {Form, Input, Button, Checkbox, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.scss'
import axios from 'axios'
import {setToken} from '../Utils/token'

axios.defaults.baseURL='http://localhost:8888'
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    //绑定用户名
    changeUserName=e=>{
        this.setState({
            username:e.target.value
        })
    }

    //绑定密码
    changePassWord=e=>{
        this.setState({
            password:e.target.value
        })
    }

    //登录
    login=()=>{
        let username=this.state.username;
        let password=this.state.password;
        let correctPassWord='';
        if(username&&password) {
            axios.get('/user').then(res => {
                for (let j = 0; j < res.data.length; j++) {
                    if (res.data[j].username == username) {
                        correctPassWord = res.data[j].password;
                        break;
                    }
                }
                if(correctPassWord==''){
                    message.error("用户名不存在",2);
                }
                else if(password == correctPassWord) {
                    setToken(username);
                    this.props.history.push('/app/home');
                } else {
                    message.error("密码错误", 2);
                }
            })
        }
        else{
            message.error("用户名或密码不能为空",2);
        }

    }
    render() {
        return (
            <div className='LoginPage'>
                <div className='LoginBox'>
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: '请输入你的用户名!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" value={this.state.username} onChange={this.changeUserName}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: '请输入你的密码!',
                            },
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            value={this.state.password} onChange={this.changePassWord}
                            />
                        </Form.Item>
                        <div className='choose-box1'>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className='login-form-remember'>记住我</Checkbox>
                                </Form.Item>
                                <a className="login-form-forgot" href="/forget">
                                忘记密码
                                </a>
                            </Form.Item>
                        </div>
                        <div className='choose-box2'>
                            <Form.Item>
                                <Button className='login-form-login' type="primary" htmlType="submit" className="login-form-button"  onClick={this.login}>
                                登录
                                </Button>
                                <a className='login-form-register' href="/register">注册</a>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
