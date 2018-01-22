/**
 * Created by lijianye on 2017/12/14.
 */
import React, { Component } from 'react';
import {  Menu, Icon } from 'antd';
import { Link } from 'react-router';
import './style.less'
const SubMenu = Menu.SubMenu;
class SiderCustom extends Component {


    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        openKeys: ['sub1'],
        theme: 'dark',
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }


    render() {
        return (

            <div >
                <div style={{width:'256px',height:'100%',overflow:'auto',backgroundColor:'rgba(0, 0, 0, 0.65)'}}>
                    <div style={{width:"256px",height:"65px",backgroundColor:"#108fe9"}}>
                        <img src={require('./img/logo.png')} style={{width:"40px",height:"40px",marginLeft:"20px",marginTop:"10px"}} />
                        <img src={require('./img/text_logo.png')} style={{width:"100px",height:"25px",marginTop:"10px",marginLeft:"10px"}} />
                    </div>
                    <Menu
                        mode="inline"
                        style={{ width: 256}}
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        theme={this.state.theme}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>物料管理</span></span>}>
                            <Menu.Item key="1"><Link to={'/BomManage/CreateMaterial/MaterialList'}>物料列表</Link></Menu.Item>
                            <Menu.Item key="2"><Link to={'/BomManage/MaterialChange'}>物料操作</Link></Menu.Item>
                            <Menu.Item key="3"><a href="http://60.191.78.148:9110/bom" rel="noopener noreferrer">bom列
                                表</a></Menu.Item>
                            <Menu.Item key="4"><a href="http://60.191.78.148:9110/bomrecords" rel="noopenernoreferrer">bom操作</a></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>生产配置</span></span>}>
                            <Menu.Item key="5"><Link to={'/Production/Management'}>工序管理</Link></Menu.Item>
                            <Menu.Item key="6"><Link to={'/Production/Station'}>设备类型管理</Link></Menu.Item>
                            <Menu.Item key="7"><Link to={'/Production/Maching'}>工位管理</Link></Menu.Item>
                            <Menu.Item key="8"><Link to={'/Production/Drawing'}>图纸管理</Link></Menu.Item>
                            <Menu.Item key="9"><Link to={'/Production/Device'}>加工说明</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                            <Menu.Item key="14">Option 9</Menu.Item>
                            <Menu.Item key="15">Option 10</Menu.Item>
                            <Menu.Item key="16">Option 11</Menu.Item>
                            <Menu.Item key="17">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
              
                </div>
            </div>
            
        )
    }
}

export default SiderCustom;