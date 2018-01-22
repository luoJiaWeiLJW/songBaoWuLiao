import React, {Component} from 'react';
import { Breadcrumb,Table,  Modal, Button,Form, Input ,Upload, Icon} from 'antd';

import './style.css'
const FormItem = Form.Item;
class Device extends Component {
    constructor(props){
        super(props);
        this.state=({
            visible: false
        })
        //上传图片
       this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        };

    }
    //上传图片方法
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    
    showModal = () => {
        this.setState({
            visible: true,
        });
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
    render() {
        const {getFieldDecorator} = this.props.form;
        const columns = [
            {title:<span className="id">序号</span>,key:"order",render:(text,record,index) => index+1},
            {title:<span className="id">加工说明编码</span>,dataIndex:"approvalTime",key:"approvalTime"},
            {title:<span className="id">加工说明名称</span>,dataIndex:"opinion",key:"opinion"},
            {title:<span className="id">图纸</span>,dataIndex:"opinion1",key:"opinion1"},
            {title:<span className="id">操作</span>,dataIndex:"approvalUserId",key:"approvalUserId"}
        ];
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (<div>
            <Breadcrumb className="Title">
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>生产配置</Breadcrumb.Item>
                <Breadcrumb.Item>加工说明</Breadcrumb.Item>
            </Breadcrumb>
            <div className="Table-title">
                <Button  className="Add-1" onClick={this.showModal}>新增</Button>
                <span className="ClassGroup">加工说明编码:</span>
                <Input size="large"  style={{width:120,marginLeft:"20px"}}/>
                <span className="ClassGroup1">加工说明名称:</span>
                <Input size="large"  style={{width:120,marginLeft:"20px"}}/>
                <Button  type="primary" className="Add-1" style={{marginLeft:"120px",}}>搜索</Button>
                <Button   className="Add-1" style={{marginLeft:"20px",}}>清空</Button>
                <Modal
                    title={<span className="AddManagement">新增工序</span>}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            label="加工说明编号"
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
                            label="加工说明名称"
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
                            label="上传图纸"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('gender1', )(
                                <div className="clearfix" style={{width:"350px"}}>
                                    <Upload
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 3 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ span: 16, offset: 10 }}
                        >
                            <Button type="primary" htmlType="submit">
                                保存提交
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
                <Table size="middle" columns={columns} />
            </div>

        </div>)
    }
}

const WrappedApp = Form.create()(Device);
export default WrappedApp;