import React, { createContext, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import 'antd/dist/antd.css';
import './style.css';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import SettingProfile from '../Component/Header/index';
import TableProfile from '../Component/TableProfile/TableProfile'

const { Header, Content, Footer } = Layout;

const ProfileContext = createContext({
  profiles: [2],
  setProfiles: (_) => {
    // Default setProfiles function for ProfileContext
  }
});
let initProfiles = [];
  const storageProfile = window.localStorage.getItem('profiles');

  if (storageProfile !== null) {
    initProfiles = JSON.parse(storageProfile);
  }

const App = () => {
  
  const [profileList, setProfileList] = useState([1]);
  return (
    <ProfileContext.Provider value={{ profiles: profileList, setProfiles: setProfileList }} >
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Row>
            <Col span={20}>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">Profile</Menu.Item>
                <Menu.Item key="2">Operation</Menu.Item>
                <Menu.Item key="3">Status</Menu.Item>
              </Menu>
            </Col>
            <Col span={4}>
              <SettingProfile />
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content" style={{ minHeight: '100vh' }}>
            <TableProfile />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Design By Khiem Luc</Footer>
      </Layout>
    </ProfileContext.Provider>
  )
}
export { ProfileContext };
export default hot(App);
