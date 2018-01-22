import React, {Component} from 'react';
import { Breadcrumb,Table,  Modal, Button,Form, Input, Select,message} from 'antd';
import axios from 'axios';
import './style.css'
const FormItem = Form.Item;
const Option = Select.Option;
class Management extends Component {
    constructor(props){
        super(props);
        const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
        const loading = false;
        const save=true;
        const record="";
        const sorter = {order: ""};
        this.state=({
            record,
            save,
            visible: false,
            dataSource:[],
            pagination,
            loading,
            sorter,
        })


    }
    
    showModal = (type,record) => {
        if(type==="add"){
            this.props.form.setFields({
                note: {
                    value:"",
                },
                gender:{
                    value:"",
                }
            })
        }else if(type==="exit"){
            this.setState({
                save:false,
                record:record,
            })
            this.props.form.setFields({
                note: {
                    value:record.code,
                },
                gender:{
                    value:record.name,
                }
            })
        }

        this.setState({
            visible: true,
        });
    }
    showModal1 = () => {
        this.setState({
            visible: false,
        });
        this.props.form.setFields({
            note: {
                value:"",
            },
            gender:{
                value:"",
            }
        })
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    //查看数据
    submit1=()=>{
        axios({
            url:"production_process/"+this.state.record.id,
            method:"put",
            data:{
                code:this.props.form.getFieldsValue().note,
                name:this.props.form.getFieldsValue().gender,
            }
        }).then(res=>{
            message.success("修改成功");

            this.axios();
            this.showModal1();
            
        }).catch(e => {
            message.error("系统出错,请重新尝试");

        })
    }
    //提交数据
    submit=()=>{
        axios({
            url:"production_process",
            method:"post",
            data:{
                code:this.props.form.getFieldsValue().note,
                name:this.props.form.getFieldsValue().gender,
            }
        }).then(res=>{
           message.success("插入成功");
            this.axios();
            this.showModal1();
        }).catch(e => {
            message.error("系统出错,请重新尝试");
            
        })
    }
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
            url: "/production_process",
            method: "get",
            params: {
                pagesize: 10,
                ...params
            }
        }).then(res => {
                       
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
    };
    //查询数据
    Search=()=>{
        this.setState({loading: true});
        axios({
            url: "/production_process?name="+this.refs.content.refs.input.value,
            method: "get",
        }).then(res=>{
            this.setState({
                dataSource:res.data.data,
                loading: false,
            })
        }).catch(e=>{
            message.error("系统出错,请重新尝试");
            this.setState({loading: false});
        })
    }
    //删除数据
    delete=(record)=>{
        this.setState({loading: true});
        axios({
            url:"production_process/"+record.id,
            method:"delete",

        }).then(res=>{
            message.success("删除成功");
            this.axios();
            this.showModal1();

        }).catch(e => {
            message.error("删除失败!");
            this.setState({loading: false});
        })
    }
    componentDidMount(){
       this.axios();
    }
    render() {
       const {getFieldDecorator} = this.props.form;
       const  {dataSource}=this.state;
        const columns = [
            {title:<span className="id">序号</span>,key:"order",render:(text,record,index) => index+1},
            {title:<span className="id">工序编码</span>,dataIndex:"code",key:"code"},
            {title:<span className="id">工序名称</span>,dataIndex:"name",key:"name"},
            {title:<span className="id">操作</span>,dataIndex:"approvalUserId",key:"approvalUserId",render:(text,record)=>{
                return(
                    <div>
                    <span>
                        <Button size="small" type="primary" className="table-edit-btn" onClick={()=>this.showModal("exit",record)} >编辑</Button>

                            <Button size="small" type="danger" className="table-del-btn" onClick={()=>this.delete(record)}>删除</Button>
                       
                    </span>
                    </div>
                )
            }}
        ];
        return (<div>
            <Breadcrumb className="Title">
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>生产配置</Breadcrumb.Item>
                <Breadcrumb.Item>工序设置</Breadcrumb.Item>
            </Breadcrumb>

            <div className="Table-title">
                <div style={{width:"100%",height:"5px"}}></div>
                <div className="Table-1">
                <Button  className="Add-1" onClick={()=>this.showModal("add")}>新增</Button>
                <Button  className="Add-1" style={{marginLeft:"20px"}}>导入</Button>
                <span className="ClassGroup">按所属班组:</span>
                <Select defaultValue="lucy" style={{ width: 120,marginLeft:"20px"  }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <span className="ClassGroup1">按工序名称:</span>
                <Input size="large"  style={{width:120,marginLeft:"20px"}} ref="content"/>
                <Button  type="primary" className="Add-1" style={{marginLeft:"120px",}} onClick={this.Search}>搜索</Button>
                </div>
                <Modal
                    title={<span className="AddManagement">新增工序</span>}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer=""
                >
                    <Form >
                        <FormItem
                            label="工序编号"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('note', {
                                rules: [{ required: true, message: '请输入工序编号!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="工序名称"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: '请输入工序名称!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ span: 16, offset: 10 }}
                        >
                            <Button type="primary" onClick={this.state.save?this.submit:this.submit1} >
                                保存提交
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
                <Table size="middle"
                       className="components-table-nested"
                       
                       columns={columns}
                       dataSource={dataSource}
                       rowKey={record=>record.id}
                       loading={this.state.loading}
                       pagination={this.state.pagination}
                />
            </div>

        </div>)
    }
}

const WrappedApp = Form.create()(Management);
export default WrappedApp;