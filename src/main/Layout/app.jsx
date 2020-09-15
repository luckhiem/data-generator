import React, { createContext, useState } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import 'antd/dist/antd.css';
import './style.css';
import { Layout, Menu, Row, Col } from 'antd';
import SettingProfile from '../Component/Header/ProfileAdd';
import Dashboard from '../Component/Profile/Dashboard/Dashboard';
import Operation from '../Component/Operation/Operation';
import Status from '../Component/Status/Status';
import Profile from '../Component/Profile/ProfileDetail/Profile';


const { Header, Content, Footer } = Layout;

const HistoryContext = createContext({
  history: [],
  setHistory: () => {
    // Default setProfiles function for ProfileContext
  }
});

const ProfileContext = createContext({
  profiles: [],
  setProfiles: () => {
    // Default setProfiles function for ProfileContext
  }
});
let initProfiles = [];
let initHistory = []
const storageHistory = window.localStorage.getItem('history');
const storageProfile = window.localStorage.getItem('profiles');

if (storageProfile !== null) {
  initProfiles = JSON.parse(storageProfile);
}
if (storageHistory !== null) {
  initHistory = JSON.parse(storageHistory);
}

console.log('storageHistory', JSON.parse(storageHistory))

const App = () => {
  const [profileList, setProfileList] = useState(initProfiles);
  const [historyList, setHistoryList] = useState(initHistory);
  const hash = window.location.hash.toString();

  return (
    <Router>
      <ProfileContext.Provider value={{ profiles: profileList, setProfiles: setProfileList }} >
        <HistoryContext.Provider value={{ history: historyList, setHistory: setHistoryList }} >
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
                  <Route exact path="/" component={Dashboard}></Route>
                  <Route path="/Operation/" component={Operation}></Route>
                  <Route path="/Status/" component={Status}></Route>
                  <Route path="/Profile/" component={Profile}></Route>
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Design By Khiem Luc</Footer>
          </Layout>
        </HistoryContext.Provider>
      </ProfileContext.Provider>
    </Router>
  )
}
export { ProfileContext, HistoryContext };
export default hot(App);
