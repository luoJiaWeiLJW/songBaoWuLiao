import React, {Component} from 'react';
import {Modal, Form, Input, Select, message, Row, Col,TreeSelect,Button} from 'antd';
import axios from "axios";

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

class ModalForm extends Component {
    handleSubmit2 = () => {

        axios({
            url: '/change/material/'+this.state.changeCode,
            method: 'post',
            data:
                {
                    categoryId:this.state.categoryId2,
                    code:this.refs.code.refs.input.value,
                    name: this.refs.name.refs.input.value,
                    model:this.refs.model.refs.input.value,
                    unit:this.refs.unit.refs.input.value,
                    common:this.state.common2,
                    source:this.state.source2,
                    processing:this.state.processing2,
                    seriesId:this.state.seriesId2,
                    color:this.state.color2,
                    expirationType:this.state.expirationType2,
                    storage:this.refs.storage.refs.input.value,
                    origin:this.state.origin2,
                    level:this.state.level2,
                    semiType:this.state.semiType2,
                    oilPaint:this.refs.oilPaint.refs.input.value,
                    note:this.refs.note.refs.input.value
                }

        }).then(res=>{
            message.success("变更成功")
            this.props.onCancel();
            this.props.axios({pageindex: 1});

        })
    };
    handleSubmit = (option, e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsvalue) => {
            if (err) {
                return false;
            }
            const data = {};
            Object.keys(fieldsvalue).forEach(key => {
                data[key] = fieldsvalue[key]
            });

            this.props.onOk1(data, option)
        })

    };

    handleChange=(value)=> {
        this.setState({
            changeCode:value,
        })

    }
    handleSubmit3=()=>{
        axios({
            url:"/material/"+this.props.record.id,
            method:"put",
            data:{
                code:this.refs.code.refs.input.value,
                name: this.refs.name.refs.input.value,
                model:this.refs.model.refs.input.value,
                unit:this.refs.unit.refs.input.value,
                common:this.state.common2,
                source:this.state.source2,
                processing:this.state.processing2,
                seriesId:this.state.seriesId2,
                color:this.state.color2,
                expirationType:this.state.expirationType2,
                storage:this.refs.storage.refs.input.value,
                origin:this.state.origin2,
                level:this.state.level2,
                semiType:this.state.semiType2,
                oilPaint:this.refs.oilPaint.refs.input.value,
                note:this.refs.note.refs.input.value
            }
        }).then(res=>{
            message.success("保存成功")
            this.props.onCancel();
            this.props.axios({pageindex: 1});
        })
    }

    handleSubmit1=()=>{
        axios({
            url:"/material/"+this.props.record.id+"/approval/"+this.props.record.approvalId+"/restart",
            method:"put",
            data:{
                code:this.refs.code.refs.input.value,
                name: this.refs.name.refs.input.value,
                model:this.refs.model.refs.input.value,
                unit:this.refs.unit.refs.input.value,
                common:this.state.common2,
                source:this.state.source2,
                processing:this.state.processing2,
                seriesId:this.state.seriesId2,
                color:this.state.color2,
                expirationType:this.state.expirationType2,
                storage:this.refs.storage.refs.input.value,
                origin:this.state.origin2,
                level:this.state.level2,
                semiType:this.state.semiType2,
                oilPaint:this.refs.oilPaint.refs.input.value,
                note:this.refs.note.refs.input.value
            }
        }).then(res=>{
            message.success("保存成功")
            this.props.axiosChange;
            this.props.onCancel();
            this.props.axios({pageindex: 1});
        }).catch(e=>{
            message.warning('网络异常,请稍后重试');
        })
    }

    state = { //以下几个数据都是需要用到的下拉框选项
        treeData: [],
        groups: [],
        users: [],
        csgUsers: [],
        disabled1:false,
        judge:true,
        saves:false,
        saves1:true,
        codeData:[],
        changeCode:[],
        assignment:[],

        //变更内容
        categoryId2:"",
        common2:"",
        source2:"",
        processing:"",
        seriesId2:"",
        color2:"",
        expirationType2:"",
        origin2:"",
        level2:"",
        semiType2:"",

    };
    search=(e)=>{
        console.log(e)
        this.setState({
            codeData:[],
        })
        if(e.length>0){
            axios({
                url: '/keyword/'+e+'/materials',
                method: 'get',
                params: {
                    keyword:e,
                }
            }).then(res=>{
                this.setState({
                    codeData:res.data.data,
                })
                console.log(res.data.data)
            })
        }

    }
    assignment3=()=>{
      console.log("132132")
    }
    componentWillUnmount(){
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
            return;
        };
    }
    componentDidMount = () => {
        
        this.setState({
            disabled1:this.props.disabled,
        })
        axios({
            url: '/tree/material_category/pid/0/children',
            method: 'get'
        }).then(res => {
            if (res.data.code !== "200") {
                message.success('网络异常,请稍后重试');
                return
            }
            const treeData = (res.data.data ? res.data.data : []);
            this.setState({
                treeData,
            })
        }).catch(e => {
            message.warning('网络异常,请稍后重试');
        })

    };
    onLoadData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            axios({
                url: '/tree/material_category/pid/'+ treeNode.props.value +'/children',
                method: 'get'
            }).then(res => {

                if (res.data.code !== "200") {
                    message.success('网络异常,请稍后重试');
                    return
                }
                treeNode.props.dataRef.children = (res.data.data ? res.data.data : []);

                this.setState({
                    treeData: [...this.state.treeData],
                })

                resolve();
            }).catch(e => {
                message.warning('网络异常,请稍后重试');
                this.setState({
                })
            })
        });
    }
    disabledChange=()=>{
        this.setState({
            judge:false,
            disabled1:false,
            saves:true,
            saves1:false,
        })

    }

    handleCancel = () => {
        this.props.onCancel();

    };
    changeCode1=()=>{
        const {modalData} = this.props ;
        if(this.state.changeCode.length>0){
            axios({
                url: '/material/code/'+this.state.changeCode,
                method: 'get',
            }).then(res=>{
                this.setState({
                    assignment:res.data.data,
                })


                console.log(modalData.name,modalData.code,"8888888888888")
                // this.props.form.setFieldsValue().code="132"
            })

        }


    }
    //改变值的方法
    onSelect=(value)=>{
        this.setState({
            categoryId2:value,
        })
    }
    common2=(value)=>{
        this.setState({
            common2:value,
        })
    }
    source2=(value)=>{
        this.setState({
            source2:value,
        })
    }
    processing2=(value)=>{
        this.setState({
            processing2:value,
        })
    }
    seriesId2=(value)=>{
        this.setState({
            seriesId2:value,
        })
    }
    color2=(value)=>{
        this.setState({
            color2:value,
        })
    }
    expirationType2=(value)=>{
        this.setState({
            expirationType2:value,
        })
    }
    origin2=(value)=>{
        this.setState({
            origin2:value,
        })
    }
    level2=(value)=>{
        this.setState({
            level2:value,
        })
    }
    semiType2=(value)=>{
        this.setState({
            semiType2:value,
        })
    }

    render() {
        const {treeData,codeData}=this.state;
        const {modalData, modalType} = this.props;
        const {getFieldDecorator } = this.props.form;
        const FormItems = [];
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const formItemLayoutReset = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 3},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        const repeat = data => data.map((item) => {
            let child = [];
            if (!item.children) {
                return <TreeNode title={item.name} key={item.id} value={item.id} dataRef={item} />;
            }
            return <TreeNode title={item.name} key={item.id} value={item.id} dataRef={item} disabled>{repeat(item.children, child)}</TreeNode>;
        });


        Object.keys(modalData).forEach((key) => {

            let config = {
                rules: [{
                    required: true,
                    message: "请输入" + this.props.modalData[key].title,
                    whitespace: true
                }, {max: 32, message: "请不要超过最大长度32位"}]
            };
            let input = <Input autoComplete="off" style={{width: '100%'}} disabled/>;

            switch (key) {
                case "code":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key, config)(input)}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"24"}>
                            <FormItem hasFeedback key={key+"24"} {...formItemLayoutReset} >
                              <Input ref="code"/>
                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "categoryId":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    <TreeSelect
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        loadData={this.onLoadData}
                                        onChange={this.onSelect}
                                        treeDefaultExpandAll
                                        disabled
                                    >
                                        {repeat(treeData)}
                                    </TreeSelect>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"71"}>
                            <FormItem hasFeedback key={key+"71"} {...formItemLayoutReset} styles={{float:"right"}}>
                                {getFieldDecorator(key+"71")(
                                    <TreeSelect
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        loadData={this.onLoadData}
                                        onChange={this.onSelect}
                                        treeDefaultExpandAll
                                        disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                                    >
                                        {repeat(treeData)}
                                    </TreeSelect>
                                )}
                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "name":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key, config)(input)}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"64"}>
                            <FormItem hasFeedback key={key+"64"} {...formItemLayoutReset} >
                              <Input ref="name"/>
                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "unit":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key, config)(input)}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"54"}>
                            <FormItem hasFeedback key={key+"54"} {...formItemLayoutReset} >
                              <Input ref="unit"/>
                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "model":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key, config)(input)}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"4"}>
                            <FormItem hasFeedback key={key+"4"} {...formItemLayoutReset} >
                              <Input ref="model"/>
                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "common":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key, config)(
                                    <Select
                                        disabled
                                    >
                                      <Option value="0">通用</Option>
                                      <Option value="1">非通用</Option>
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"5"}>
                            <FormItem hasFeedback key={key+"5"} {...formItemLayout}>
                                {getFieldDecorator(key+"5")(
                                    <Select
                                        onChange={this.common2}
                                    >
                                      <Option value="0">通用</Option>
                                      <Option value="1">非通用</Option>
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "source":
                    FormItems.push(
                        <Row gutter={30} key={key} >
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key, config)(
                                    <Select
                                        disabled
                                    >
                                      <Option value="0">外购</Option>
                                      <Option value="1">自制</Option>
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"6"}>
                            <FormItem hasFeedback key={key+"6"} {...formItemLayout}>
                                {getFieldDecorator(key+"6")(
                                    <Select
                                        onChange={this.source2}
                                    >
                                      <Option value="0">外购</Option>
                                      <Option value="1">自制</Option>
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "processing":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    <Select
                                        disabled
                                    >
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"7"}>
                            <FormItem hasFeedback key={key+"7"} {...formItemLayout}>

                              <Select
                                  onChange={this.processing2}
                              >
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                              </Select>

                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "seriesId":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    <Select
                                        disabled
                                    >
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"8"}>
                            <FormItem hasFeedback key={key+"8"} {...formItemLayout} >

                              <Select
                                  onChange={this.seriesId2}
                              >
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                              </Select>

                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "color":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    <Select
                                        disabled
                                    >
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"9"}>
                            <FormItem hasFeedback key={key+"9"} {...formItemLayout} >
                              <Select
                                  onChange={this.color2}
                              >
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                              </Select>

                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "expirationType":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    <Select
                                        disabled
                                    >
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"10"}>
                            <FormItem hasFeedback key={key+"10"} {...formItemLayout}>

                              <Select
                                  onChange={this.expirationType2}
                              >
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                              </Select>

                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "storage":
                    FormItems.push(
                        <Row gutter={30} key={key}>

                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    <Select
                                        disabled
                                    >
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"15"}>
                            <FormItem hasFeedback key={key+"15"} {...formItemLayout} >

                              <Input ref="storage"/>

                            </FormItem>
                          </Col>
                        </Row>)
                    break;
                case "origin":
                    FormItems.push(
                        <Row gutter={30} key={key}>

                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    <Select
                                        disabled
                                    >
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"11"}>
                            <FormItem hasFeedback key={key+"11"} {...formItemLayout} >

                              <Select
                                  onChange={this.origin2}
                              >
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                              </Select>

                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "level":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    <Select
                                        disabled
                                    >
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"12"}>
                            <FormItem hasFeedback key={key+"12"} {...formItemLayout}>

                              <Select
                                  onChange={this.level2}
                              >
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                              </Select>

                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "semiType":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col xs={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    <Select
                                        disabled
                                    >
                                    </Select>
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"13"}>
                            <FormItem hasFeedback key={key+"13"} {...formItemLayout}>

                              <Select
                                  onChange={this.semiType2}
                              >
                                <Option value="0">0</Option>
                                <Option value="1">1</Option>
                              </Select>

                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                case "oilPaint":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    input
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"34"}>
                            <FormItem hasFeedback key={key+"34"} {...formItemLayout} >
                              <Input ref="oilPaint"/>
                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;

                case "note":
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                                {getFieldDecorator(key)(
                                    input
                                )}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"44"}>
                            <FormItem hasFeedback key={key+"44"} {...formItemLayout} >
                              <Input ref="note"/>

                            </FormItem>
                          </Col>
                        </Row>
                    );
                    break;
                default:
                    FormItems.push(
                        <Row gutter={30} key={key}>
                          <Col span={12} key={key}>
                            <FormItem hasFeedback key={key} {...formItemLayoutReset} label={modalData[key].title}>
                                {getFieldDecorator(key)(input)}
                            </FormItem>
                          </Col>
                          <Col span={12} key={key+"18"}>
                            <FormItem hasFeedback key={key+"18"} {...formItemLayoutReset} >
                              <Input/>
                            </FormItem>
                          </Col>

                        </Row>
                    );
                    break;
            }
        });


        return (
            <Modal
                visible={this.props.visible}
                title={[
                  <span style={{marginLeft:'430px',fontSize:'23px'}} key='exid'>变更物料</span>,
                ]}
                onCancel={this.props.onCancel}
                onOk={this.handleSubmit}
                style={{minWidth: 1000}}
                footer={null}
            ><div className="TitleTop">
              <span className="MaterId">物料编码:</span>
              <Select
                  showSearch
                  placeholder="请输入物料编码"
                  className="InputCode1"
                  onChange={this.handleChange}
                  disabled={true}
                  onSearch={this.search}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                  {
                      codeData.map((item,index)=>{
                          return(
                              <Option value={item.code} key={index}>{item.code}</Option>
                          )
                      })
                  }

              </Select>
              <Button className="Sure3" onClick={this.changeCode1} >确定</Button>
               
            </div>
              <Form>
                <Row gutter={40}>
                    {FormItems}
                  <Button className="close3" onClick={this.handleCancel} >取消</Button>
                </Row>
              </Form>

            </Modal>
        )
    }
}

const ModalForm2 = Form.create(
    {
        mapPropsToFields(props) {
            const obj = {};
            Object.keys(props.modalData).forEach((key) => {
                const value = props.modalData[key].value;
                obj[key] = {value}
            });

            return obj
        }
    }
)(ModalForm);
export default ModalForm2