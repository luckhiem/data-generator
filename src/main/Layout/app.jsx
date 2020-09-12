import React, { createContext, useState } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import 'antd/dist/antd.css';
import './style.css';
import { Layout, Menu, Row, Col } from 'antd';
import SettingProfile from '../Component/Header/index';
import TableProfile from '../Component/TableProfile/TableProfile';
import Operation from '../Component/Operation/Operation';
import Status from '../Component/Status/Status';
import Profile from '../Component/Profile/Profile';


const { Header, Content, Footer } = Layout;

const ProfileContext = createContext({
  profiles: [],
  setProfiles: () => {
    // Default setProfiles function for ProfileContext
  }
});
let initProfiles = [];
const storageProfile = window.localStorage.getItem('profiles');

if (storageProfile !== null) {
  initProfiles = JSON.parse(storageProfile);
}

console.log('storageProfile', JSON.parse(storageProfile))

const App = () => {
  const [profileList, setProfileList] = useState(initProfiles);
  const hash = window.location.hash.toString();

  return (
      <Router>
        <ProfileContext.Provider value={{ profiles: profileList, setProfiles: setProfileList }} >
          <Layout className="layout">
            <Header>
              <Row>
                <Col span={20}>
                  <div className="logo" />
                  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[hash]}>
                    <Menu.Item key="#/">
                      Profile
                    <Link to={"/"} />
                    </Menu.Item>
                    <Menu.Item key="#/Operation/">
                      Operation
                    <Link to={"/Operation/"} />
                    </Menu.Item>
                    <Menu.Item key="#/Status/">
                      Status
                    <Link to={"/Status/"} />
                    </Menu.Item>
                  </Menu>
                </Col>
                <Col span={4}>
                  <SettingProfile />
                </Col>
              </Row>
            </Header>
            <Content style={{ padding: '40px', paddingTop: '100px' }}>
              <div className="site-layout-content" style={{ minHeight: '100vh' }}>
                <Switch>
                  <Route exact path="/" component={TableProfile}></Route>
                  <Route path="/Operation/" component={Operation}></Route>
                  <Route path="/Status/" component={Status}></Route>
                  <Route path="/Profile/" component={Profile}></Route>
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Design By Khiem Luc</Footer>
          </Layout>
        </ProfileContext.Provider>
      </Router>
  )
}
export { ProfileContext };
export default hot(App);
