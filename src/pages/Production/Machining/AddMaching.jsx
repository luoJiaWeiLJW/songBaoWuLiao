import React, {Component} from 'react';
import {Modal, Form, Input, Select, message, Row, Col,Button} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const children = [];
class AddMaching extends Component {
    constructor(props){
        super(props);
        props.addshow(this.addshow);
        props.exitshow(this.exitshow);
        const recordID='';
        const save=true;
        this.state=({
            visible: false,
            deviceid:'',
            recordID,
            save
        })

    }
    addshow = () =>{
        console.log('addshow');
        this.props.form.resetFields()
    }
    exitshow = (record) => {
        console.log('exitshow',record);
        this.setState({
            recordID:record.id
        }
        );
        this.props.form.setFields({
            name: {
                value:record.name,
            },
            num: {
                value:record.num
            },
            stationDeviceNum: {
                value:record.stationDeviceNum
            },
            deviceTypeId: {
                value:record.deviceType.name
            },
            classId: {
                value:record.classId
            },
            groupId: {
                value:record.groupId
            },
            maxPers: {
                value:record.maxPers
            },
            minPers: {
                value:record.minPers
            }
        })
    }

    handleCancel = (e) => {
        this.props.handleCancel();
    }
    //新增 工位
    submit = (e) =>{
      e.preventDefault();
      this.props.form.validateFields((err) => {//获取输入控件的内容
        if (err) {
          return;
        }
        axios({
          url:'/station',
          method:'post',
          data:{
            minPers:this.props.form.getFieldsValue().minPers,
            maxPers:this.props.form.getFieldsValue().maxPers,
            groupId:this.props.form.getFieldsValue().groupId,
            classId:this.props.form.getFieldsValue().classId,
            deviceTypeId:this.state.deviceid,//设备类型
            stationDeviceNum:this.props.form.getFieldsValue().stationDeviceNum,//工位机编号
            name:this.props.form.getFieldsValue().name,
            num:this.props.form.getFieldsValue().num,
          }
        }).then(res=>{
          //console.log(res);
          message.success('插入成功');
          this.props.axios();
          this.addshow();
          this.handleCancel()
        })
        })
    }
    // 编辑  
    putSubmit = (e) =>{
        const {recordID,deviceid} = this.state;
        e.preventDefault();
        this.props.form.validateFields((err) => {//获取输入控件的内容
            if (err) {
              return;
            }
          axios({
            url:'/station/'+recordID,
            method:'put',
            data:{
              minPers:this.props.form.getFieldsValue().minPers,
              maxPers:this.props.form.getFieldsValue().maxPers,
              groupId:this.props.form.getFieldsValue().groupId,
              classId:this.props.form.getFieldsValue().classId,
              deviceTypeId:this.state.deviceid,//设备类型
              stationDeviceNum:this.props.form.getFieldsValue().stationDeviceNum,//工位机编号
              name:this.props.form.getFieldsValue().name,
              num:this.props.form.getFieldsValue().num,
            }
          }).then(res =>{
            //console.log('res',res);
            message.success("修改成功");
            this.props.axios();
            this.addshow();
            this.handleCancel();
            this.props.changesave()
          })
          })
        console.log('putSubmit');
    }
    //页面初始化 填充设备类型
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
            method:'get'
        }).then(res =>{
            //console.log('设备类型',res)
            for (let i = 0; i < res.data.data.length; i++) {
                children.push(<Option key={i.toString(res.data.data.length) + res.data.data[i].name}>{res.data.data[i].name}</Option >);
                //console.log(i.toString(res.data.data.length) + res.data.data[i].name)
            }
        })
    };
    componentDidMount(){
        this.axios();
     }

    //获取 设备类型 id 
    handleselect = (value) =>{
        console.log(value);
        let aa = value.slice(1);
        console.log('设备',aa)
         axios({
             url:'/deviceTypeExpand?name='+aa,
             method:'get'
         }).then(res=>{
             console.log('设备ID',res)
             //this.state.procedureid.push(res.data.data[0].id)
             //console.log('this.state.procedureid',this.state.procedureid);
             //this.state.deviceid.push(res.data.data[0].id)
             //this.setState({deviceid:res.data.data[0].id})
             for(let i in res.data.data){ //防止设备名区别不大
                 if(res.data.data[i].name === aa){
                    this.setState({deviceid:res.data.data[0].id})
                 }
                 break;
             }
         })
     }
    render() {
        const {getFieldDecorator } = this.props.form;
        const FormItems = [];
        const formItemLayout = {
            labelCol: {
                xs: {span: 30},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 30},
                sm: {span: 16},
            },
        };
        const formItemLayoutReset = {
            labelCol: {
                xs: {span: 30},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 30},
                sm: {span: 16},
            },
        };
        let config = {
            rules: [{
                required: true,
                message: "请输入值!",
                whitespace: true
            }, {max: 32, message: "请不要超过最大长度32位"}]
        };
        let input = <Input autoComplete="off" style={{width: '100%'}} />;
        {
            FormItems.push(
            <Col xs={30} key="1" >
                <FormItem hasFeedback key="num" {...formItemLayout} label="工位编号">
                    {getFieldDecorator("num", config)(
                        input
                    )}
                </FormItem>
            </Col>)
            FormItems.push(
                <Col xs={30} key="2" >
                    <FormItem hasFeedback key="name" {...formItemLayout} label="工位名称">
                        {getFieldDecorator("name",config)(
                            input
                        )}
                    </FormItem>
                </Col>)
            FormItems.push(
                <Col xs={30} key="3" >
                    <FormItem hasFeedback key="stationDeviceNum" {...formItemLayout} label="工位机编号">
                        {getFieldDecorator("stationDeviceNum", config)(
                            input
                        )}
                    </FormItem>
                </Col>)
            FormItems.push(
                <Col xs={30} key="4" >
                    <FormItem hasFeedback key="deviceTypeId" {...formItemLayout} label="设备类型">
                        {getFieldDecorator("deviceTypeId", config)(
                            <Select
                                style={{ width: 325 }}
                                onSelect={this.handleselect}
                            >
                                {children}
                            </Select>
                            
                        )}
                    </FormItem>
                </Col>)
            FormItems.push(
                <Col xs={30} key="5" >
                    <FormItem hasFeedback key="minPers" {...formItemLayoutReset} label="最小人数">
                        {getFieldDecorator("minPers",config)(
                            input
                        )}
                    </FormItem>
                </Col>)
            FormItems.push(
                <Col xs={30} key="6" >
                    <FormItem hasFeedback key="maxPers" {...formItemLayoutReset} label="最大人数">
                        {getFieldDecorator("maxPers",config)(
                            input
                        )}
                    </FormItem>
                </Col>)
            FormItems.push(
                <Col xs={30} key="7" >
                    <FormItem hasFeedback key="groupId" {...formItemLayoutReset} label="所属部门">
                        {getFieldDecorator("groupId",config)(
                            <Select
                            style={{ width: 325 }}
                        >
                            <OptGroup label="Manager">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </OptGroup>
                            <OptGroup label="Engineer">
                                <Option value="Yiminghe">yiminghe</Option>
                            </OptGroup>
                        </Select>
                        )}
                    </FormItem>
                </Col>)
            FormItems.push(
                <Col xs={30} key="8" >
                    <FormItem hasFeedback key="classId" {...formItemLayout} label="所属班组">
                        {getFieldDecorator("classId", config)(
                            <Select
                                style={{ width: 325 }}
                            >
                                <OptGroup label="Manager">
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                </OptGroup>
                                <OptGroup label="Engineer">
                                    <Option value="Yiminghe">yiminghe</Option>
                                </OptGroup>
                            </Select>
                        )}
                    </FormItem>
                </Col>)
            FormItems.push(
                <Col xs={24} key={'add'} style={{textAlign: 'center'}}>
                    <Button type="primary" onClick={this.props.save?this.submit:this.putSubmit}>保存提交</Button>
                </Col>
            )

        }
        return (
            <Modal
                title={<span className="AddManagement">新增工位</span>}
                visible={this.props.visible}
                onCancel={this.handleCancel}
                footer=''
            >
                <Form>
                    <Row gutter={40}>
                        {FormItems}
                    </Row>
                </Form>
            </Modal>
        )
    }
}

const ModalForm1 = Form.create(

)(AddMaching);
export default ModalForm1;