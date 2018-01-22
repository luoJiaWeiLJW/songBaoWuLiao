import React, {Component} from 'react';
import { Breadcrumb,  Modal, Button,Form, Input, Select,Upload, Icon} from 'antd';

import './style.css'
const FormItem = Form.Item;
const Option = Select.Option;

class AddDrawing extends Component {
    constructor(props){
        super(props);
        this.state=({
            visible: false
        })
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
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })
    handleClick=()=>{
        window.history.go(-1);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 9 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
        };
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div>
            <Breadcrumb className="Title">
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>生产配置</Breadcrumb.Item>
                <Breadcrumb.Item>图纸管理</Breadcrumb.Item>
                <Breadcrumb.Item>新增图纸</Breadcrumb.Item>
            </Breadcrumb>
                <div className="Body-body">
                    <Button onClick={this.handleClick} className="Back" >返回</Button>
                    <Form >
                        <FormItem label="物料编码"
                                  {...formItemLayout}
                        >
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 270 }}
                                    placeholder="请选择物料编码"
                                    optionFilterProp="children"
                                    // onChange={handleChange}
                                    // onFocus={handleFocus}
                                    // onBlur={handleBlur}

                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="tom">Tom</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="物料名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input type="password" disabled />
                            )}
                        </FormItem>
                        <FormItem
                           label="图纸数目"
                           {...formItemLayout}
                        >
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="上传图纸"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('remember1', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <div className="clearfix" style={{width:1000}}>
                                    <Upload
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 20 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            )}
                        </FormItem>
                        <Button type="primary" style={{width:100,marginLeft:"720px",marginTop:"50px"}}
                         onClick={this.handleClick}
                        >
                            保存
                        </Button>
                    </Form>
                </div>

            </div>)
    }
}

const WrappedNormalLoginForm = Form.create()(AddDrawing);
export default WrappedNormalLoginForm;