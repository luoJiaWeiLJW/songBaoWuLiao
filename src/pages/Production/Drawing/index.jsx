import React, {Component} from 'react';
import { Link } from 'react-router';
import { Breadcrumb,Table, Button, Input} from 'antd';

import './style.css'

class Drawing extends Component {
    constructor(props){
        super(props);
        this.state=({
            visible: false
        })


    }

    render() {
        
        const columns = [
            {title:<span className="id">序号</span>,key:"order",render:(text,record,index) => index+1},
            {title:<span className="id">物料编码</span>,dataIndex:"approvalTime",key:"approvalTime"},
            {title:<span className="id">设备类型</span>,dataIndex:"opinion",key:"opinion"},
            {title:<span className="id">物料名称</span>,dataIndex:"opinion1",key:"opinion1"},
            {title:<span className="id">图纸数目</span>,dataIndex:"opinion2",key:"opinion2"},
            {title:<span className="id">操作</span>,dataIndex:"approvalUserId",key:"approvalUserId"}
        ];
        return (<div>
            <Breadcrumb className="Title">
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>生产配置</Breadcrumb.Item>
                <Breadcrumb.Item>图纸管理</Breadcrumb.Item>
            </Breadcrumb>
            <div className="Table-title">
                <Button  className="Add-1" onClick={this.showModal}><Link to={'/Production/AddDrawing'}>新增</Link></Button>
                <Button  className="Add-1" style={{marginLeft:"20px"}}>导入</Button>

                <span className="ClassGroup3">设备类型:</span>
                <Input size="large"  style={{width:220,marginLeft:"20px"}}/>
                <Button  type="primary" className="Add-1" style={{marginLeft:"120px",}}>搜索</Button>
                <Table size="middle" columns={columns} />
            </div>

        </div>)
    }
}


export default Drawing;