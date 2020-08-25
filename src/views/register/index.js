import React, { Component,useState,createRef } from 'react'
import {
    Form,
    Input,
    Tooltip,
    Checkbox,
    Button, message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './index.scss'
import axios from "axios";

axios.defaults.baseURL='http://localhost:8888';

export default class register extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            confirm:'',
            email:'',
            phone:'',
            agreement:false

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

    //绑定确认密码
    changeConfirm=e=>{
        this.setState({
            confirm:e.target.value
        })
    }


    //绑定邮箱
    changeEmail=e=>{
        this.setState({
            email:e.target.value
        })
    }

    //绑定电话
    changePhone=e=>{
        this.setState({
            phone:e.target.value
        })
    }

    //绑定勾选协议
    changeAgreement=e=>{
        this.setState({
            agreement:e.target.checked
        })
    }

    //检验
    validate=(username,password,confirm,email,phone,agreement)=>{
        if(!(username && password &&confirm&& email &&phone)){
            message.error("输入的信息不能为空",2);
            return false;
        }

        if(password!=confirm){
            message.error("两次密码不一致",2);
            return false;
        }

        if(!(/^1[3456789]\d{9}$/.test(phone))){
            message.error("手机号码格式有误",2);
            return false;
        }

        if(!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(email))){
            message.error("电子邮箱格式有误",2);
            return false;
        }

        if(!agreement){
            message.error("请勾选用户协议",2);
            return false;
        }

        return true



    }


    //注册用户
    addUser=async()=>{
        let username=this.state.username;
        let password=this.state.password;
        let confirm=this.state.confirm;
        let email=this.state.email;
        let phone=this.state.phone;
        let agreement=this.state.agreement;
        let nameArray=[];
        let isRepeat=false;

        if(!(this.validate(username,password,confirm,email,phone,agreement))){
            return false;
        }

        //判断用户名是否重复
        await axios.get('/user').then(res=>{
            for(let j=0;j<res.data.length;j++){
                nameArray.push(res.data[j].username);
            }
            if(nameArray.includes(username)){
                message.error("用户名已被注册",2);
                isRepeat=true

            }

        })

        //不重复则发送注册请求
        if(!isRepeat){
            axios.post('/user',{
                username: username,
                password:password,
                email:email,
                phone:phone,
                src:''}).then(()=>{
                message.success("注册成功",2,()=>{
                    this.props.history.push('/login');
                });
            }).catch(err=>{
                console.log(err);
            })
        }

    }


    render() {
        return (
            <div className='register-page'>
                <div className='register-box'>
                    <Form
                    className='register-form'
                    name="register"
                    scrollToFirstError
                    >
                        <Form.Item className='register-form-item'
                            name="nickname"
                            label={
                            <span>
                                用户名&nbsp;
                            </span>
                            }
                            rules={[
                            {
                                required: true,
                                message: '请输入你的用户名!',
                                whitespace: true,
                            },
                            ]}
                        >
                            <Input className='input-text' value={this.state.username} onChange={this.changeUserName} />
                        </Form.Item>

                        <Form.Item className='register-form-item'
                            name="password"
                            label="密码"
                            rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            ]}
                        >
                            <Input.Password className='input-text' value={this.state.password} onChange={this.changePassWord} />
                        </Form.Item>

                        <Form.Item className='register-form-item'
                            name="confirm"
                            label="确认你的密码"
                            dependencies={['password']}
                            rules={[
                            {
                                required: true,
                                message: '请确认密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('两次密码不相同!');
                                },
                            }),
                            ]}
                        >
                            <Input.Password className='input-text' value={this.state.confirm} onChange={this.changeConfirm}/>
                        </Form.Item>

                        <Form.Item className='register-form-item'
                            name="email"
                            label="E-mail"
                            rules={[
                            {
                                type: 'email',
                                message: '非法的电子邮箱格式!',
                            },
                            {
                                required: true,
                                message: '请输入电子邮箱!',
                            },
                            ]}
                        >
                            <Input className='input-text' value={this.state.email} onChange={this.changeEmail} />
                        </Form.Item>

                        <Form.Item className='register-form-item'
                            name="phone"
                            label="电话号码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入电话号码!',
                                },

                            ]}
                        >
                            <Input
                            className='input-text' value={this.state.phone} onChange={this.changePhone} />
                        </Form.Item>

                        <Form.Item className='register-form-agreement'
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                            {
                                validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                            },
                            ]}
                        >
                            <Checkbox onChange={this.changeAgreement}>
                            我已经阅读 <a href="">用户使用协议</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item className='register-form-button'>
                            <Button type="primary" onClick={this.addUser}>
                            注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };
}

