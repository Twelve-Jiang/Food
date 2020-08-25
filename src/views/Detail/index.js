import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { appRouter } from '../../routers';
import './index.scss';
import Axios from 'axios';
import { CaretRightOutlined } from '@ant-design/icons';
import Qs from 'qs'

const { Header, Content, Footer } = Layout;
const imgStyle = {
    height: '500px',
    width:'350px',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#90c322',
    float: 'left',
    margin: '20px 30px 20px 70px'
}
export default class index extends Component {
    constructor() {
        super()
        this.state = {
            foods: [],
            title: ''
        }
    }
    componentDidMount() {
        console.log('state', this.state)
        console.log(Route);
        this.setState({
            title: this.props.history.location.state.title
            // console.log(title)
        })
        this.getFoods()
    }
    getFoods = () => {
        Axios.get("http://localhost:8888/food").then(res => {
            console.log('res', res.data)
            this.setState({
                foods: res.data
            })
            console.log('foods', this.state.foods)
        })
    }
    renderChild() {
        let food = this.state.foods.find(v => v.title === this.state.title);
        console.log(food)
        if (!food) {
            return null;
        } else {

            return (
                <div>
                    <div className="foos-title">{food.title}</div>
                    <div className="food-detail">
                        <img src={food.image} style={imgStyle}></img>
                    </div>
                    <div className="information">
                        <div className="introduce">
                            <p><CaretRightOutlined />简介</p>
                            {food.notice + '\t' + food.level + '\t' + food.craft + '\t' + food.tags}
                        </div>
                        <div className="introduce">
                            <p><CaretRightOutlined />配料</p>
                            {/* {Qs.stringify(food.ingredients)} */}
                            <ul>
                                {
                                    Object.keys(food.ingredients).map((foodKey,index) =>{
                                    return <li key={index}>{foodKey} {food.ingredients[foodKey]}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className="introduce">
                            <p><CaretRightOutlined />做法</p>
                            {/* {food.steps} */}
                            <ul>
                                {
                                    food.steps.map((data,index) =>{
                                        return  <div>
                                                <img src={data.image}></img>
                                                <li key={index}>{data.content}</li>
                                                </div>
                                    })
                                }
                            </ul>
                        </div>
                        <div className="introduce">
                            <p><CaretRightOutlined />注意事项</p>
                            {food.notice}
                        </div>
                    </div>
                </div>
            )
        }

        // return this.state.foods.map(food=>{
        //     if(food.title===this.state.title){
        //         return(
        //             <div>
        //             <div className="foos-title">{food.title}</div>
        //             <div className="food-detail">
        //                 <img src={food.image} style={imgStyle}></img>
        //             </div>
        //             <div className="information">
        //                 <div className="introduce">
        //                     <p><CaretRightOutlined />简介</p>
        //                     {food.notice+'\t'+food.level+'\t'+food.craft+'\t'+food.tags}
        //                 </div>
        //                 <div className="introduce">
        //                     <p><CaretRightOutlined />配料</p>
        //                     {food.ingredients}
        //                 </div>
        //                 <div className="introduce">
        //                     <p><CaretRightOutlined />做法</p>
        //                     {food.steps}
        //                 </div>
        //                 <div className="introduce">
        //                     <p><CaretRightOutlined />注意事项</p>
        //                     {food.notice}
        //                 </div>
        //             </div>
        //             </div>
        //         )
        //     }
        //     return null;
        // })
    }
    render() {
        return (
            <div>
                <Layout className="layout">
                    <Content className="detail-content">
                        <div className='content-center'>
                            {
                                this.renderChild()
                            }
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}
