import React from 'react';
import { Menu } from 'antd';
import { LockOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Avatar from './Avatar.js';
import "../App.css";
import Typography from '@material-ui/core/Typography';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
const { SubMenu } = Menu;
class Nav extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <div>
        <Router>
          <Menu theme="dark" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">          
            <Menu.Item key="logo" icon={<LockOutlined />}>
             <b>Smart LLock</b> 
            </Menu.Item>
            <Menu.Item key="addUser">
            הוספת משתמש
            </Menu.Item>
            <Link to="/manageUser">
              <Menu.Item key="setting">
                ניהול משתמשים מורשים
            </Menu.Item>
            </Link>
            <Menu.Item key="history">
              הסטורית כניסות
          </Menu.Item>
            <SubMenu key="control" title="שליטה מרחוק">
              <Menu.Item key="setting:1">נעילה</Menu.Item>
              <Menu.Item key="setting:2">פתיחה</Menu.Item>
            </SubMenu>
            <SubMenu key="profile" title="פרופיל">
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Router>
      </div>
    );
  }
}


export default Nav;