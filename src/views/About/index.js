import React, { Component } from 'react'
import './index.scss'
import { Row, Col, Divider } from 'antd';

const style = {
    background: '#DCDCDC',
    padding: '4px 0',
    height:45,
    textAlign:"center",
    borderRadius:10,
    marginBottom:10,
    fontSize:20
};
export default class index extends Component {
    constructor(){
        super()
        this.state={
            type:document.getElementById('type-item')
        }
    }
    componentDidMount(){
        console.log(this.state.type)
    }
    render() {
        return (
            <div className="type-content">
                <p>分类</p>
                <div className="center">
                <div className="Alltype">
                    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                        <p>一日三餐</p>
                    </Divider>
                    <Row gutter={20} align='middle' justify='center'>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>早餐</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>午餐</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>晚餐</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>宵夜</div>
                    </Col>
                    </Row>
                    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                        <p>家常菜谱</p>
                    </Divider>
                    <Row gutter={20} align='middle' justify='center'>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>凉菜</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>热菜</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>川菜</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>汤羹</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>家常菜</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>下饭菜</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>粤菜</div>
                    </Col>
                    </Row>
                    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                        <p>时令美食</p>
                    </Divider>
                    <Row gutter={20} align='middle' justify='center'>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>春季食谱</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>夏季食谱</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>秋季食谱</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>冬季食谱</div>
                    </Col>
                    </Row>
                    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                    <p>其他分类</p>
                    </Divider>
                    <Row gutter={20} align='middle' justify='center'>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>老人</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>朋友聚餐</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>快餐</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div id='type-item' style={style}>其他</div>
                    </Col>
                    </Row>
                    </div>
                </div>
            </div>
        )
    }
}
