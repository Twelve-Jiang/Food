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
            phone:''


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
    changeComfirm=e=>{
        this.setState({
            confirm:e.target.value
        })
    }

    //绑定手机号
    changePhone=e=>{
        this.setState({
            phone:e.target.value
        })
    }

    //检验
    validate=(username,phone,password,confirm)=>{

        if(!(username && password && phone &&confirm)){
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
        return true

    }


    //修改密码
     modify=async()=>{
        let username=this.state.username;
        let password=this.state.password;
        let phone=this.state.phone;
        let confirm=this.state.confirm;
        let correctPhone='';
        let user={}
        let isExist=false;

        if(!(this.validate(username,phone,password,confirm))){
            return false;
        }


         axios.get('/user').then(res=>{
             for(let j=0;j<res.data.length;j++){
                 if(res.data[j].username==username){
                     user=res.data[j];
                     correctPhone=res.data[j].phone;
                     isExist=true
                     break;
                 }
             }
             if(isExist){
                 if(phone==user.phone){
                     user.password=password;
                     axios.put('/user/'+String(user.id),user).then(
                         ()=>{
                             message.success("修改成功",2,this.props.history.push('/login'));
                         }
                     )
                 }
                 else{
                     message.error("电话错误",2);
                 }
             }
             else{
                 message.error("用户不存在",2);
             }

         })
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
                                   name="phone"
                                   label="电话号码"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your phone number!',
                                       },
                                   ]}
                        >
                            <Input
                                className='input-text' value={this.state.phone} onChange={this.changePhone} />
                        </Form.Item>

                        <Form.Item className='register-form-item'
                            name="password"
                            label="新密码"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
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
                                message: '请确认你的密码!',
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
                            <Input.Password className='input-text' value={this.state.confirm} onChange={this.changeComfirm} />
                        </Form.Item>

                        <Form.Item className='register-form-button'>
                            <Button type="primary" onClick={this.modify}>
                            修改
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };
}

