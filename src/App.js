import React from 'react';
import './App.scss';
import { Layout, Menu} from 'antd';
import {Route,Link,Redirect,Switch}from 'react-router-dom'
import { appRouter,subRouter } from './routers';
import { isLogin } from './views/Utils/token';


const { Header, Content, Footer } = Layout;
function App() {
  return (
    <div className="App">
      {
        isLogin()
        ?
        <Layout className="layout">
          <Header>
            <div className="logo" onClick={()=>{window.location.href="/app/home"}}>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[appRouter[0].path]}>
              {
                appRouter.map(route=>{
                  return (<Menu.Item key={route.path} {...route}>
                    <Link to={route.path}>{route.title}</Link>
                  </Menu.Item>)
                })
              }
            </Menu>
          </Header>
          <Content >
            {/* 主体内容 */}
            <Switch>
              {
                appRouter.map(route=>{
                  return <Route key={route.path} {...route}/>
                })
              }
              {
                subRouter.map(route=>{
                  return <Route key={route.path} {...route}/>
                })
              }
              <Redirect to='/404'></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>菜谱网站 2020 Create by 冲冲冲</Footer>
        </Layout>
        :
        <Redirect to='/login'></Redirect>
            }
    </div>
  )
          }
export default App;
