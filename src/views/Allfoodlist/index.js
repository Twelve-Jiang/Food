import React, { Component } from 'react'
import { List, Avatar, Space } from 'antd';
import './index.scss';
import Axios from 'axios';
import { Pagination } from 'antd';

// const listData = [];
// for (let i = 0; i < 23; i++) {
// listData.push({
//     href: 'https://ant.design',
//     title: `ant design part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// });
// }

export default class index extends Component {
    constructor(){
        super()
        this.state={
            foods:[],
            // pageItem: [],
            defaultPageSize: 10,
            // pages: 0
            currentPage:1,
            pageSize:10,
            total:0
        }
    }
    componentDidMount(){
        this.getTotal()
        this.setState({
        })
        this.getFoods(this.state.currentPage,this.state.pageSize)
    }
    getTotal=()=>{
        Axios.get("http://localhost:8888/food").then(res=>{
            this.setState({
                total: res.data.length
            })
        })
    }
    getFoods=(pageNo,pageSize)=>{
        Axios.get(`http://localhost:8888/food?_limit=${pageSize}&_page=${pageNo}`).then(res=>{
            // console.log(res.data)
            this.setState({
                foods: res.data
            })
            // console.log(this.state.foods)
        })
    }
    onChange=(pageNo,pageSize)=>{
        this.state.currentPage = pageNo
        this.state.pageSize = pageSize
        this.getFoods(pageNo,pageSize)
        console.log()
    }
    render() {
        return (
            <div className="list-content">
                <p className='alltitle'>所有菜品</p>
                <div className="all-center">
                    <div className="Allfood">
                            <div className="list">
                                {
                                    this.state.foods.map(food=>{
                                        return(
                                            <div className="list-item" title={food.title} onClick={this.toDetail}>
                                                <div className='food-text'>
                                                <p>{food.title}</p>
                                                    {food.notice}
                                                </div>
                                                <img height="200" width="150" src={food.image}></img>
                                            </div>
                                        )
                                    })
                                }
                                <Pagination current={this.state.currentPage} pageSize={this.state.defaultPageSize} onChange={this.onChange} className="page" data={this.state.foods}  total={this.state.total}/>
                            </div>
                    </div>
                </div>
                {/* <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 10,
                    }}
                    dataSource={this.state.foods}
                    renderItem={item => (
                        <div className="haha">
                            {
                                this.state.foods.map(food=>{
                                    return(
                                        <List.Item
                                            key={food.id}
                                            extra={
                                            <img
                                                width={200}
                                                height={300}
                                                alt="food"
                                                src={food.image}
                                                />
                                            }
                                            >
                                            <List.Item.Meta
                                            title={food.title}
                                            description={food.notice}
                                            />
                                        </List.Item>
                                    )
                                })
                            }
                        </div>
                    )}
            /> */}
            </div>
        )
    }
    toDetail=(e)=>{
        var title =e.target.title
        if(title === ""){
            title = e.target.parentElement.title
        }
        if(title === ""){
            title = e.target.parentElement.parentElement.title
        }
        console.log(title)
        this.props.history.push('/app/detail',{title:title})
    }

}
