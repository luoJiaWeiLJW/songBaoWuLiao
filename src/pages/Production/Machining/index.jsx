import React, {Component} from 'react';
import AddMaching from "./AddMaching"
import { Breadcrumb,Table,Button,Form, Input, message} from 'antd';
import axios from 'axios';
import './style.css'

class Maching extends Component {
    constructor(props){
        super(props);
        const  dataSource=[];
        const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
        this.state=({
            loading:false,
            visible: false,
            save:true,
            dataSource,
            pagination,
            record:''
        })

    }
    changesave = () =>{
        this.setState({
            save:true
        })
    }
    showModal = (type,record) => {
        if(type === "add"){
            console.log('add.save',this.state.save)
            this.addshow()
        }else if(type === "exit"){
            this.setState({save:false});
            this.exitshow(record);
            console.log('exit.save',this.state.save);
            //this.setState({save:true})
        }
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        // this.setState({
        //     visible: false,
        // });
      //const self = this;
      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          console.log(errors);
          return;
        };

        this.setState({
          visible: false,//关闭modal

        });
        //提交调的接口
      })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    //页面初始化
    axios = (params = {}) => {
        this.setState({loading: true});
        if (params.sortOrder) {
            if (params.sortOrder instanceof Array) {
                params.sortOrder = params.sortOrder.map(item => {
                    return item === "ascend" ? "A" : "D";
                })
            } else {
                params.sortOrder = params.sortOrder === "ascend" ? "A" : "D";
            }
        }
        axios({
            url:'/station',
            method: "get",
        }).then(res => {
            //console.log('页面初始化',res)          
            const pagination = {...this.state.pagination};
            pagination.total = parseInt(res.data.total,0) || 0;
            let dataSource = [];
            if (res.data.data instanceof Array) {
                dataSource = res.data.data;
            }
            this.setState({
                pagination,
                loading: false,
                dataSource
            })
        }).catch(e => {
            message.error("系统出错,请重新尝试");
            this.setState({loading: false})
        })
    }
    componentDidMount(){
        this.axios();
     }
     //搜索
     Search=()=>{
        this.setState({loading:true});
        console.log(this.refs.content.refs.input.value);
        let searchUrl = (this.refs.content.refs.input.value === '' || this.refs.content.refs.input.value === undefined || this.refs.content.refs.input.value === null ? '' : '?name='+this.refs.content.refs.input.value);
        console.log('searchUrl',searchUrl);
        axios({
            url:'/station'+searchUrl,
            method:'get'
        }).then(res =>{
            console.log('查询结果',res);
            this.setState({
                dataSource:res.data.data,
                loading:false
            })
        }).catch(e => {
                message.error("系统出错,请重新尝试");
                this.setState({loading: false})
            })
    }
    //删除 
    delete = (record) =>{
        this.setState({loading:true});
        //console.log('删除id',record.id);
        axios({
            url:'/station/'+record.id,
            method:'delete'
        }).then(res => {
            //console.log('删除结果',res)
            message.success('删除成功');
            this.axios();
            this.setState({
                loading:false
            })
        }).catch(e => {
            message.error("系统出错,请重新尝试");
            this.setState({loading: false})
        })
    }
    render() {
        //const {getFieldDecorator} = this.props.form;
        const columns = [
            {title:<span className="id">序号</span>,key:"order",render:(text,record,index) => index+1},
            {title:<span className="id">工位编号</span>,dataIndex:"num",key:"num"},
            {title:<span className="id">工位名称</span>,dataIndex:"name",key:"name"},
            {title:<span className="id">工位机编号</span>,dataIndex:"stationDeviceNum",key:"stationDeviceNum"},
            {title:<span className="id">设备类型</span>,dataIndex:"deviceType.name",key:"deviceTypeId"},
            {title:<span className="id">最小人数</span>,dataIndex:"minPers",key:"minPers"},
            {title:<span className="id">最大人数</span>,dataIndex:"maxPers",key:"maxPers"},
            {title:<span className="id">所属部门</span>,dataIndex:"groupId",key:"groupId"},
            {title:<span className="id">所属班组</span>,dataIndex:"classId",key:"classId"},
            {title:<span className="id">操作</span>,dataIndex:"approvalUserId",key:"approvalUserId",render:(text,record)=>{
                return(
                    <div>
                    <span>
                        <Button size="small" type="primary" className="table-edit-btn" onClick={()=>this.showModal("exit",record)} style={{height:30,marginRight:8}}>编辑</Button>

                            <Button size="small" type="danger" className="table-del-btn" onClick={()=>this.delete(record)} style={{height:30}}>删除</Button>
                       
                    </span>
                    </div>
                )
            }}
        ];
        return (<div>
            <Breadcrumb className="Title">
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>生产配置</Breadcrumb.Item>
                <Breadcrumb.Item>工位设置</Breadcrumb.Item>
            </Breadcrumb>
            <div className="Table-title">
                <Button  className="Add-1" onClick={()=>this.showModal("add")}>新增</Button>
                <Button  className="Add-1" style={{marginLeft:"20px"}}>导入</Button>

                <span className="ClassGroup3">设备类型:</span>
                <Input size="large"  style={{width:220,marginLeft:"20px"}} ref="content"/>
                <Button  type="primary" className="Add-1" style={{marginLeft:"120px",}} onClick={this.Search}>搜索</Button>
                <AddMaching
                    visible={this.state.visible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    axios={this.axios}
                    changesave={this.changesave}
                    save={this.state.save}
                    addshow={fn=> { this.addshow = fn; }}
                    exitshow={fn=>{this.exitshow = fn;}}
                />

                <Table 
                    className="components-table-nested"
                    size="middle" 
                    columns={columns} 
                    dataSource={this.state.dataSource}
                    rowKey={record=>record.id}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                />
            </div>

        </div>)
    }
}

const WrappedApp = Form.create()(Maching);
export default WrappedApp;