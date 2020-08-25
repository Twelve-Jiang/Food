import React, { Component } from 'react'
import './index.scss'
import { message } from 'antd';
import {getToken} from '../Utils/token'
import Axios from 'axios'

export default class user extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:[],
            username:'',
            password:'',
            src:'',
            phone:'',
            email:'',
            id:0


        }
    }
    async componentDidMount(){
        await this.getUser();
        this.getUserMessage();
        console.log(this.state.id)
    }
    getUser = async() => {
        await Axios.get("http://localhost:8888/user").then(res=>{
            // console.log(res.data)
            this.setState({
                users: res.data
            })
            // console.log(this.state.users)
        })
    }
    getUserMessage(){
        // console.log(this.state.users);
        let name = getToken();
        for(let i =0;i<this.state.users.length;i++){
            if(name === this.state.users[i].username){
                this.setState({
                    username: this.state.users[i].username,
                    phone:this.state.users[i].phone,
                    email:this.state.users[i].email,
                    id:this.state.users[i].id,
                    password:this.state.users[i].password
                })
                if(this.state.users[i].src==''){
                    this.setState({
                        src:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1589498574,2111616812&fm=26&gp=0.jpg'
                    })
                }else{
                    this.setState({
                        src:this.state.users[i].src
                    })
                }
            }
            // console.log(this.state.src)
        }
    }
    changeAvatar=async()=>{
        const changeSrc = prompt('请输入你的头像的url地址')
        // console.log(changeSrc)
        if(changeSrc!=null && changeSrc!=""){
            await this.setState({
                src:changeSrc
            })
            // console.log(this.state.src)
            Axios.put("http://localhost:8888/user/"+this.state.id,{
                "username": this.state.username,
                "password": this.state.password,
                "email": this.state.email,
                "phone": this.state.phone,
                "src":this.state.src,
                "id": this.state.id,

            }).then(
                ()=>{
                    message.success("修改成功",2,this.props.history.push('/app/user'));
                }
            )
        }

        this.getUser()
    }

    changeEmail=async()=>{
        const changeemail = prompt('请输入你的邮箱')
        if(changeemail!=null && changeemail!=""){
            // console.log(changeSrc)
            await this.setState({
                email:changeemail
            })
            // console.log(this.state.src)

            Axios.put("http://localhost:8888/user/"+this.state.id,{
                "username": this.state.username,
                "password": this.state.password,
                "email": this.state.email,
                "phone": this.state.phone,
                "src":this.state.src,
                "id": this.state.id,

            }).then(
                ()=>{
                    message.success("修改成功",2,this.props.history.push('/app/user'));
                }
            )

        }

        this.getUser()
    }
    changePhone=async()=>{
        const changephone = prompt('请输入你的电话')
        // console.log(changeSrc)
        if(changephone!=null && changephone!=""){
            await this.setState({
                phone:changephone
            })
            // console.log(this.state.src)
            Axios.put("http://localhost:8888/user/"+this.state.id,{
                "username": this.state.username,
                "password": this.state.password,
                "email": this.state.email,
                "phone": this.state.phone,
                "src":this.state.src,
                "id": this.state.id,

            }).then(
                ()=>{
                    message.success("修改成功",2,this.props.history.push('/app/user'));
                }
            )

        }
        this.getUser()
    }
    render(){
        return (
            <div className='user-page'>
                <div className='user-box'>
                    <p className='user-information'>用户信息</p>
                    <div className='user-avatar'>
                        <img className='avatar' src={this.state.src} onClick={this.changeAvatar}></img>
                    </div>
                    <div className='user-text user-name'><p className='text'>用户名：</p>
                    <div className='show name-show'></div>&nbsp;&nbsp;{this.state.username}</div>
                    <div className='user-text user-email'><p className='text'>&nbsp;&nbsp;&nbsp;邮箱：</p>
                    <button className='change change-email' onClick={this.changeEmail}>修改</button>
                    <div className='show email-show'>{this.state.email}</div>
                    </div>
                    <div className='user-text user-phone'><p className='text'>&nbsp;&nbsp;&nbsp;电话：</p>
                    <button className='change change-phone' onClick={this.changePhone}>修改</button>
                    <div className='show phone-show'>{this.state.phone}</div></div>
                </div>
            </div>
        )
    }
}
