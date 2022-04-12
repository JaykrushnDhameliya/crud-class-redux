import React, {Component} from "react";
import {Menu} from 'antd';
import {Link} from 'react-router-dom'
import {HomeOutlined, UnorderedListOutlined} from '@ant-design/icons';
import Two from "./Two";

class Navbar extends Component {

    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({current: e.key});
    };

    render() {
        const {current} = this.state;
        return (<>
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="Home" icon={<HomeOutlined/>}>
                        Form <Link className="navbar-brand" to="/"></Link>
                    </Menu.Item>
                    <Menu.Item key="List" icon={<UnorderedListOutlined/>}>
                        <Link className="navbar-brand" to="/Two/0">Table</Link>
                    </Menu.Item>
                </Menu>
            </>
        );
    }
}

export default Navbar;