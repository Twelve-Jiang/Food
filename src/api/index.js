import axios from 'axios'
import {message} from "antd";

//配置axios访问的根路径
axios.defaults.baseURL = "http://localhost:8888"

//分页的接口
export const grtFoodsByPage=(currentPage,pageSize)=>{
    return axios.get('/food?_limit='+pageSize+'&_page='+currentPage+'')
}

//请求数据的方法
export const getFoods = (params)=>{
    return axios.get('/food',params)
}

//请求用户信息
export const getUser = (params)=>{
    return axios.get('/user',params)
}

//注册用户信息
export const addUser = (params)=>{
    return axios.post('/user',params).then(()=>{
        message.success("注册成功",2,()=>{
            this.props.history.push('/login');
        });
    }).catch(err=>{
        console.log(err);
    })
}


