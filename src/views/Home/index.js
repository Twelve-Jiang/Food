/* eslint-disable jsx-a11y/alt-text */
import { Layout, Menu, message} from 'antd';
import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './index.scss'
import { Carousel } from 'antd';
import { Divider } from 'antd';
import { List, Card } from 'antd';
import {SmileOutlined,CoffeeOutlined,CrownOutlined} from '@ant-design/icons';
import Axios from 'axios';


window.global = {}
const data = [
    {
        index:0,
        id: "16",
        src:"http://i3.meishichina.com/attachment/recipe/200910/200910130342224.jpg@!p800",
        title:'韭菜炒鸭肠'

    },
    {
        index:1,
        id: "17",
        src:"http://i3.meishichina.com/attachment/recipe/200910/200910130353228.jpg@!p800",
        title:'洋葱尖椒炒鸭血'
    },
    {
        index:2,
        id: "18",
        src:'http://i3.meishichina.com/attachment/recipe/200910/200910130400198.jpg@!p800',
        title:'辣味木耳炒腐竹'
    },
    {
        index:3,
        id: "19",
        src:'http://i3.meishichina.com/attachment/recipe/200910/200910130515026.jpg@!p800',
        title:'肉末蕃茄豆腐'
    },
];
const { Meta } = Card;
const cardStyle = {
    width: 300,
    float:'left',
    marginLeft:28,
    marginTop:20
}
const contentStyle = {
    height: '480px',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#90c322',
    float: 'left',
    margin: '20px 27px'
};
const {Content,Sider } = Layout;

export default class index extends Component {
    constructor(){
        super();
        this.state ={
            foods:[],
            title:[],
            notice:[],
            nowTitle:'',
            nowNotice:''
        }
    }
    async componentDidMount(){
        await this.getFoods();
        this.getMessage();
    }
    getFoods = async() => {
        await Axios.get("http://localhost:8888/food").then(res=>{
            // console.log(res.data)
            this.setState({
                foods: res.data
            })
            // console.log(this.state.foods)
        })
    }
    getMessage(){
        // console.log(this.state.foods[0].id);
        for(let i = 0; i<this.state.foods.length;i++){
            for(let j=0;j<4;j++){
                if(data[j].id===this.state.foods[i].id){
                    this.setState({
                        title:[...this.state.title,this.state.foods[i].title],
                        notice:[...this.state.notice,this.state.foods[i].notice]
                    })
                }
            }
        }
        console.log(this.state.title[0])
    }

    returnMessage=async(item)=>{
        console.log(item.id)
        for(let i=0;i<4;i++){
            if(item.id===16){
                this.setState({
                    nowTitle: this.state.title[0],
                    nowNotice: this.state.notice[0]
                })
            }
            if(item.id===16){
                this.setState({
                    nowTitle: this.state.title[1],
                    nowNotice: this.state.notice[1]
                })
            }
            if(item.id===16){
                this.setState({
                    nowTitle: this.state.title[2],
                    nowNotice: this.state.notice[2]
                })
            }
            if(item.id===16){
                this.setState({
                    nowTitle: this.state.title[3],
                    nowNotice: this.state.notice[3]
                })
            }
            console.log(this.state.title)
        }
    }
    render() {
        return (
            <Content style={{ padding: '0 50px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="side" width={230}>
                        <div className="part1">
                        <br></br>
                            <span className="title"> &nbsp;
                                <SmileOutlined /> 今天你吃饭了吗
                            </span>
                            <p style={{fontSize:15,color:"white"}}>食为天性，静静地咀嚼，轻轻地回味，非比寻常的韵致</p>
                        </div>
                        <div className="part2">
                        <br></br>
                        <span className="title"> &nbsp;
                            <CrownOutlined /> 八珍玉食
                            </span>
                            <p style={{fontSize:15,color:"white"}}>品味美食，而不是品味菜单，烧一锅好菜，也绝不是烧钱</p>
                        </div>
                        <div className="part3">
                        <br></br>
                        <span className="title"> &nbsp;
                        <CoffeeOutlined /> 酸甜苦辣味道全
                            </span>
                            <p style={{fontSize:15,color:"white"}}>初游唐安饭薏米，炊成不减雕胡美</p>
                        </div>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 480}}>
                        <Carousel autoplay style={{borderBlockEnd: '1px solid #90c322'}}>
                            <div>
                                <img className='home-image' src='http://i8.meishichina.com/attachment/recipe/200910/200910120907019.jpg@!p800' style={contentStyle} title='红烧鸡翅' id='image1'  onClick={this.toDetail}/>
                                <img className='home-image' src='http://i8.meishichina.com/attachment/recipe/200910/200910120922340.jpg@!p800' style={contentStyle} title='萝卜丝鲫鱼汤' id='image2' onClick={this.toDetail}/>
                                <img className='home-image' src='http://i8.meishichina.com/attachment/recipe/200910/200910130146134.jpg@!p800' style={contentStyle} title='沙茶牛肉' id='image3' onClick={this.toDetail}/>
                            </div>
                            <div>
                                <img className='home-image' src='http://i3.meishichina.com/attachment/recipe/200910/200910130207580.jpg@!p800' style={contentStyle} title='五彩鳝丝' id='image4' onClick={this.toDetail}/>
                                <img className='home-image' src='http://i8.meishichina.com/attachment/recipe/200910/200910130221548.jpg@!p800' style={contentStyle} title='香菇鲜肉盏' id='image5' onClick={this.toDetail}/>
                                <img className='home-image' src='http://i3.meishichina.com/attachment/recipe/200910/200910130230340.jpg@!p800' style={contentStyle} title='碧绿虾仁' id='image6' onClick={this.toDetail}/>
                            </div>
                            <div>
                                <img className='home-image' src='http://i3.meishichina.com/attachment/recipe/200910/200910130237153.jpg@!p800' style={contentStyle} title='剁椒蒸鱼头' id='image7' onClick={this.toDetail}/>
                                <img className='home-image' src='http://i8.meishichina.com/attachment/recipe/200910/200910130247074.jpg@!p800' style={contentStyle} title='黑椒牛柳' id='image8' onClick={this.toDetail}/>
                                <img className='home-image' src='http://i3.meishichina.com/attachment/recipe/200910/200910130304493.jpg@!p800' style={contentStyle} title='蜜橘鸡丁' id='image9' onClick={this.toDetail}/>
                            </div>
                            <div>
                                <img className='home-image' src='http://i3.meishichina.com/attachment/recipe/200910/200910130312310.jpg@!p800' style={contentStyle} title='土家一罐香' id='image10' onClick={this.toDetail}/>
                                <img className='home-image' src='http://i3.meishichina.com/attachment/recipe/200910/200910130319260.jpg@!p800' style={contentStyle} title='冰糖红枣炖银耳' id='image11' onClick={this.toDetail}/>
                                <img className='home-image' src='http://i3.meishichina.com/attachment/recipe/200910/200910130323581.jpg@!p800' style={contentStyle} title='开胃拌鳝丝' id='image12' onClick={this.toDetail}/>
                            </div>
                            </Carousel>
                    </Content>
                </Layout>
                <Divider><h1 style={{fontSize:'30px', fontWeight:'700'}}>热门菜谱</h1></Divider>
                <div className='hot'>
                <List
                    grid={{ column: 4 }}
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <Card
                        hoverable
                        style={cardStyle}
                        cover={<img alt="example"  src={item.src} title={item.title} style={{height:380}} onClick={this.toDetail}/> }
                >
                    <div className='content-wrapper'>
                    <p className='content-title'>{this.state.title[item.index]}</p>
                    <p className='content-notice'>{this.state.notice[item.index]}</p>
                        </div>

                </Card>
                    </List.Item>
                )}
                />
                </div>
            </Content>
        )
    }
    toDetail=(e)=>{
        // var Img = document.getElementById("image").title
        //     console.log(Img)
        //     // console.log(this.props)
        //     // console.log('11111111111111111111111111')
        //     this.props.history.push('/app/detail',{title:Img})
        var title =e.target.title
        window.global.detail = {title: title}
        this.props.history.push('/app/detail',{title:title})
    }
}
