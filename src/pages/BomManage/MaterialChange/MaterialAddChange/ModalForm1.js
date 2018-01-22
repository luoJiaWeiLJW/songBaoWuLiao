import React, {Component} from 'react';
import {Modal, Form, Input, Select, message, Row, Col,TreeSelect,Button} from 'antd';
import axios from "axios";

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

class ModalForm extends Component {
  handleSubmit2 = (e) => {
    
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, getFieldsValue) => {
      if (err) {
        return false;
      }
      const data = {};
      Object.keys(getFieldsValue).forEach(key => {
        data[key] = getFieldsValue[key]
      });
      this.props.onOk(data)
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

            this.props.onOk(data, option)
        })

    };
    handleSubmit3=()=>{
        axios({
            url:"/material/"+this.props.record.id,
            method:"put",
            data:{
                code:this.props.form.getFieldsValue().code,
                name:this.props.form.getFieldsValue().name,
                model:this.props.form.getFieldsValue().model,
                unit:this.props.form.getFieldsValue().unit,
                common:this.props.form.getFieldsValue().common,
                source:this.props.form.getFieldsValue().source,
                processing:this.props.form.getFieldsValue().processing,
                seriesId:this.props.form.getFieldsValue().seriesId,
                color:this.props.form.getFieldsValue().color,
                expirationType:this.props.form.getFieldsValue().expirationType,
                storage:this.props.form.getFieldsValue().storage,
                origin:this.props.form.getFieldsValue().origin,
                level:this.props.form.getFieldsValue().level,
                semiType:this.props.form.getFieldsValue().semiType,
                oilPaint:this.props.form.getFieldsValue().oilPaint,
                note:this.props.form.getFieldsValue().note
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
                categoryId:this.props.form.getFieldsValue().categoryId,
                code:this.props.form.getFieldsValue().code,
                name:this.props.form.getFieldsValue().name,
                model:this.props.form.getFieldsValue().model,
                unit:this.props.form.getFieldsValue().unit,
                common:this.props.form.getFieldsValue().common,
                source:this.props.form.getFieldsValue().source,
                processing:this.props.form.getFieldsValue().processing,
                seriesId:this.props.form.getFieldsValue().seriesId,
                color:this.props.form.getFieldsValue().color,
                expirationType:this.props.form.getFieldsValue().expirationType,
                storage:this.props.form.getFieldsValue().storage,
                origin:this.props.form.getFieldsValue().origin,
                level:this.props.form.getFieldsValue().level,
                semiType:this.props.form.getFieldsValue().semiType,
                oilPaint:this.props.form.getFieldsValue().oilPaint,
                note:this.props.form.getFieldsValue().note
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
  };
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
    this.props.statusNumberChange();
      this.setState({
          judge:true,
          saves:false,
          saves1:true,
      })
  };



  render() {
    const {treeData}=this.state;
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
      let input = <Input autoComplete="off" style={{width: '100%'}} disabled={this.state.judge?this.props.disabled:this.state.disabled1}/>;
     
      switch (key) {
        case "categoryId":
          FormItems.push(
            <Col xs={24} key={key} >
              <FormItem hasFeedback key={key} {...formItemLayoutReset} label={modalData[key].title}>
                {getFieldDecorator(key, config)(
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
          );
          break;
        case "code":
          FormItems.push(
            <Col xs={24} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayoutReset} label={modalData[key].title} >
                {getFieldDecorator(key, config)(
                    <Input autoComplete="off" style={{width: '100%'}}   disabled={this.state.judge?this.props.disabled:this.state.disabled1}/>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "name":
        case "unit":
        case "model":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key, config)(input)}
              </FormItem>
            </Col>
          );
          break;
        case "common":
          FormItems.push(
              <Col xs={12} key={key}>
                  <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                      {getFieldDecorator(key, config)(
                          <Select
                              disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                          >
                              <Option value="0">通用</Option>
                              <Option value="1">非通用</Option>
                          </Select>
                      )}
                  </FormItem>
              </Col>
          );
          break;
        case "source":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key, config)(
                  <Select
                      disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                  >
                    <Option value="0">外购</Option>
                    <Option value="1">自制</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "processing":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select
                      disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                  >
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "seriesId":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select
                      disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                  >
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "color":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select
                      disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                  >
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "expirationType":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select
                      disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                  >
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;

        case "origin":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select
                      disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                  >
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "level":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select
                      disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                  >
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "semiType":
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(
                  <Select
                      disabled={this.state.judge?this.props.disabled:this.state.disabled1}
                  >
                  </Select>
                )}
              </FormItem>
            </Col>
          );
          break;
        case "note":
          FormItems.push(
            <Col xs={24} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayoutReset} label={modalData[key].title}>
                {getFieldDecorator(key)(input)}
              </FormItem>
            </Col>
          );
          break;
        default:
          FormItems.push(
            <Col xs={12} key={key}>
              <FormItem hasFeedback key={key} {...formItemLayout} label={modalData[key].title}>
                {getFieldDecorator(key)(input)}
              </FormItem>
            </Col>
          );
          break;
      }
    });

    {
        if(this.props.statusNumber==="0"){
            FormItems.push(
                <Col xs={24} key={'add'} style={{textAlign: 'center'}}>
                    <Button onClick={this.handleSubmit3}>保存</Button>&nbsp;&nbsp;
                    <Button onClick={this.handleCancel}>取消</Button>
                </Col>
            )
        }else if(this.props.statusNumber==="1"){
            FormItems.push(
                <Col xs={24} key={'edit'} style={{textAlign: 'center'}}>
                    <Button onClick={this.handleSubmit.bind(this,2)}>审核通过</Button>&nbsp;&nbsp;
                    <Button onClick={this.handleSubmit.bind(this,-2)}>驳回</Button>&nbsp;&nbsp;
                    <Button onClick={this.handleSubmit.bind(this,-1)}>否决</Button>&nbsp;&nbsp;
                    <Button onClick={this.handleCancel}>取消</Button>
                </Col>
            );
        }else if(this.props.statusNumber==="2"){
            FormItems.push(
                <Col xs={24} key={'add'} style={{textAlign: 'center'}}>
                    <Button onClick={this.handleCancel}>取消</Button>
                </Col>
            )
        }else if(this.props.statusNumber==="-2"){
            FormItems.push(
                <Col xs={24} key={'add'} style={{textAlign: 'center'}}>
                    <Button onClick={this.handleSubmit1}  style={{display:this.state.saves?"block":"none",marginLeft: '458px',marginBottom:"20px"}}>保存</Button>
                    <Button onClick={this.disabledChange} style={{display:this.state.saves1?"block":"none",textAlign: 'center',marginLeft: '430px',marginBottom:"20px"}}>编辑</Button>&nbsp;&nbsp;
                    <Button onClick={this.handleCancel} style={{float:"right",marginTop:"-48px",marginRight:"400px"}}>取消</Button>
                </Col>
            )
        }else if(this.props.statusNumber==="-1"){
            FormItems.push(
                <Col xs={24} key={'add'} style={{textAlign: 'center'}}>
                    <Button onClick={this.handleCancel}>取消</Button>
                </Col>
            )
        }else if(this.props.statusNumber==="3"){
            FormItems.push(
                <Col xs={24} key={'add'} style={{textAlign: 'center'}}>
                    <Button onClick={this.handleSubmit2}>保存</Button>&nbsp;&nbsp;
                    <Button onClick={this.handleCancel}>取消</Button>
                </Col>
            )
        }
        // else if(modalType === "add"){
        //     <Col xs={24} key={'add'} style={{textAlign: 'center'}}>
        //         <Button onClick={this.handleSubmit2}>保存</Button>&nbsp;&nbsp;
        //         <Button onClick={this.handleCancel}>取消</Button>
        //     </Col>
        // }
      // modalType === "add" ?
      //
      //   :"";


    }

    return (
      <Modal
        visible={this.props.visible}
        title={[
        <span style={{marginLeft:'430px',fontSize:'23px'}} key='exid'>新增物料</span>,
      ]}
        onCancel={this.props.onCancel}
        onOk={this.handleSubmit}
        style={{minWidth: 1000}}
        footer={null}
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
export default ModalForm1