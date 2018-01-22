import React, {Component} from 'react';
import { Breadcrumb,Table,  Modal, Button,Form, Input, Select,message} from 'antd';
import axios from 'axios';
import './style.css'
const FormItem = Form.Item;
const Option = Select.Option;
const children = [];

class Station extends Component {
    constructor(props){
        super(props);
        const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
        const loading = false;
        const visible = false;
        const addProcessID = [];
        const procedureid = [];
        const sorter = {order: ""};
        const record = '';
        const save = true;
        this.state=({
            dataSource:[],
            record,
            save,
            visible,
            addProcessID,
            pagination,
            loading,
            sorter,
            procedureid
        })
    }

    //新增 和 编辑 的 弹出框 设置
    showModal = (type,record) =>{
        if(type === 'exit'){
            console.log(record)
        this.setState({
            save:false,
            record:record
        })
        this.props.form.setFields({
            code:{
                value:record.code
            },
            name:{
                value:record.name
            },
            // processName:{
            //     //value:for(let i in record.productionProcess){re}
            //     value: record.productionProcess[0].name  //暂时默认选取第一个
            // }
            processName:{
                //()=>this.showprocessName()
                value:this.showprocessName(record)
            }
        })
        } else if(type === 'add'){
            this.props.form.resetFields()
            // this.state.procedureid =[]
        }
        this.setState({
            visible:true
        })
    }
    showprocessName = (record) =>{
        let productionProcessName = [];
        for(let i in record.productionProcess){
            productionProcessName.push(record.productionProcess[i].name)
        }
        return productionProcessName
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
    showModal1 = () => {
        this.setState({
            visible: false,
        });
        this.props.form.resetFields()
    }
    //编辑 设备
    putSubmit = () =>{
        const {record,procedureid}=this.state;
        let pid = this.state.procedureid.join(",");
        console.log("pid",pid)

        // console.log('record.id',record.id);//设备ID
        // let PPessId = [];
        // let pid = '';
        // let oldId = this.props.form.getFieldsValue().processName;
        // console.log("oldId",oldId);
        // for(let i in oldId){
        //     axios({
        //        url:'/production_process?name='+oldId[i],
        //       method:'get'
        //     }).then(res =>{
        //         console.log(res);
        //         for(let j in res.data.data) {
        //           if (res.data.data[j].name === oldId[i]) {
        //               PPessId.push(res.data.data[j].id);
        //           }
        //         }
        //     })
        // }
        // pid = PPessId.join(",");
        // console.log("pid",pid)
        // this.hsdgfoh() // 提交事件
          axios({
            url:'/deviceTypeExpand/deviceTypeId/'+record.id+'/'+pid,
            method:'put',
            data:{
              code:this.props.form.getFieldsValue().code,
              name:this.props.form.getFieldsValue().name,
              productionProcessoId:pid,
            }
          }).then(res=>{
            console.log('res',res);
            message.success("修改成功");
            this.axios();
            this.showModal1();
          })
    }
    //新增 设备
    submit = (e) =>{
      const {procedureid}=this.state;
      let productionProcessId = procedureid.join(',');
      e.preventDefault();
      this.props.form.validateFields((err) => {
        if (err) {
          return;
        }
        axios({
          url:'/deviceTypeExpand/productionId/'+productionProcessId,
          method:'post',
          data:{
            code:this.props.form.getFieldsValue().code,
            name:this.props.form.getFieldsValue().name,
            productionProcessoId:productionProcessId,
          }
        }).then(res=>{
          console.log('res',res);
          message.success("插入成功");
          this.axios();
          this.showModal1();
        })
      })

        console.log('procedureid',procedureid);

        //console.log('code',this.props.form.getFieldsValue().code);
        //console.log('name',this.props.form.getFieldsValue().name);
        console.log(productionProcessId);

    }
    //获取 可加工工序 id
    handleselect = (value) =>{
       console.log(value);
       //let i=0;
      this.setState({
        procedureid:[]
      })
       for(let i in value){
         axios({
                 //url:'/production_process?name='+aa,
              url:'/production_process?name='+value[i],
              method:'get'
             }).then(res=>{
                console.log('工序id',res);
                for(let j in res.data.data){
                  if(res.data.data[j].name === value[i]){
                    this.state.procedureid.push(res.data.data[j].id);
                    console.log("获取procedureid",this.state.procedureid)
                  }
                }
             })
       }
       //i++
      //   axios({
      //     url:'/production_process?name='+value,
      //       method:'get'
      //   }).then(res=>{
      //       console.log('工序id',res)
      //       for(let i in res.data.data){
      //           if(res.data.data[i].name === value[i]){
      //               this.state.procedureid.push(res.data.data[i].id);
      //           }
      //           break;
      //       }
      //       console.log("获取procedureid",this.state.procedureid)
      //   })
    }
    //查询 
    Search=()=>{
        this.setState({loading:true});
        console.log(this.refs.content.refs.input.value);
        let searchUrl = (this.refs.content.refs.input.value === '' || this.refs.content.refs.input.value === undefined || this.refs.content.refs.input.value === null ? '' : '?name='+this.refs.content.refs.input.value);
        console.log('searchUrl',searchUrl);
        axios({
            url:'/deviceTypeExpand'+searchUrl,
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
        console.log('删除id',record.id);
        axios({
            url:'/deviceTypeExpand/deviceTypeId/'+record.id,
            method:'delete'
        }).then(res => {
            console.log('删除结果',res)
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
            url:'/deviceTypeExpand',
            method: "get",
        }).then(res => {
            console.log('页面初始化',res)          
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
        //填充 新增Model 的 可加工工序  
        axios({
            url:'/production_process',
            method:'get'
        }).then(res =>{
            console.log('可加工工序的数据',res)
            for (let i = 0; i < res.data.data.length; i++) {
                children.push(<Option value={ res.data.data[i].name} key={i.toString(res.data.data.length)}>{res.data.data[i].name}</Option >);
                //console.log("key",i.toString(res.data.data.length) + res.data.data[i].name)  i.toString(res.data.data.length) +
            }
        })
    };
    componentDidMount(){
        //this.select();
        this.axios();
     }
     fiexd = (type,record) =>{
         if(type === "ppcode"){
             let producode = [];
             for(let i in record.productionProcess){
                producode.push(record.productionProcess[i].code);
             }
             return (producode.join(", "));
         }else if(type === "ppname"){
             let produname = [];
            for(let i in record.productionProcess){
                produname.push(record.productionProcess[i].name);
            }
            return(produname.join(", "));
         }
     }
     hanc =(value) =>{
      console.log("value",value)
     }
    render() {
        const {getFieldDecorator} = this.props.form;
        const columns = [
            {title:<span className="id">序号</span>,key:"order",render:(text,record,index) => index+1},
            {title:<span className="id">设备类型编码</span>,dataIndex:"code",key:"code"},
            {title:<span className="id">设备类型</span>,dataIndex:"name",key:"name"},
            {title:<span className="id">可加工工序编码</span>,dataIndex:"ProductionProcess.code",key:"ProductionProcess.code",render:(text,record) => this.fiexd('ppcode',record)},
            {title:<span className="id">可加工工序名称</span>,dataIndex:"productionProcess.name",key:"productionProcess.name",render:(text,record) => this.fiexd('ppname',record)},
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
                <Breadcrumb.Item>设备管理</Breadcrumb.Item>
            </Breadcrumb>
            <div className="Table-title">
                <Button  className="Add-1" onClick={()=>this.showModal("add")}>新增</Button>
                <Button  className="Add-1" style={{marginLeft:"20px"}}>导入</Button>
               
                <span className="ClassGroup3">设备类型:</span>
                <Input size="large"  style={{width:220,marginLeft:"20px"}} ref="content"/>
                <Button  type="primary" className="Add-1" style={{marginLeft:"120px",}} onClick={this.Search}>搜索</Button>
                <Modal
                    title={<span className="AddManagement">新增设备</span>}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer=""
                >
                    <Form>
                        <FormItem
                            label="设备类型编号"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: '请输入设备类型编号!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="设备类型"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入设备类型!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="可加工工序名称"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('processName', {
                                rules: [{ required: true, message: '请输入可加工工序名称!' }],
                            })(
                                <Select
                                    mode="tags"
                                    style={{ width: '350px' }}
                                    tokenSeparators={[',']}
                                    // onChange={this.handleselect}
                                    // onSelect={this.handleselect}
                                    onChange={this.handleselect}
                                >
                                    {children}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ span: 16, offset: 10 }}
                        >
                            <Button type="primary" onClick={this.state.save?this.submit:this.putSubmit}>
                                保存提交
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
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

const WrappedApp = Form.create()(Station);
export default WrappedApp;