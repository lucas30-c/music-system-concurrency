import React, { Component, Fragment } from 'react';
import './Aside.css'
import { Link } from 'react-router-dom';
import { Menu  } from 'antd';
// const { SubMenu } = Menu;
class Aside extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

      componentDidMount() {
        // 找到第一个 Link 元素并触发点击
        const firstLink = document.getElementById('link1');
        if (firstLink) {
          firstLink.click();
        }
      }

  render() {
    return (
        <Fragment className="fragment">
            <h1 class="logo"><span class="logo-span">Admin</span></h1>
            <Menu
                theme='dark'
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["1"]}
                style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1">
                        <Link id="link1" to="/admin/UserManagement"><span>User Management</span></Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/admin/EventManagement"><span>Event Management</span></Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/admin/BookingManagement"><span>Booking Management</span></Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                    <Link to="/admin/VenueManagement"><span>Venue Management</span></Link>
                    </Menu.Item>
                
            </Menu>
        </Fragment>
    )
  }
  
}

export default Aside
