import React, {Component} from 'react';
import {message, Table, Button} from 'antd';
import Table2 from './Table2';
import axios from 'axios';
import checkCode from '../../../../config/codeTips';
import SearchForm from './searchForm';
import ModalForm1 from './ModalForm1'


class MaterialAddChange extends Component {
  constructor(props) {
    super(props);
    const visible = false;
    const disabled=false;
    const dataSource = [];
    const record="";
    const statusNumber="3";
    const axiosChange=false;
    const editIndex = -1;
    const pagination = {showSizeChanger: true, showQuickJumper: true, showTotal: total => '共 ' + total + ' 条'};
    const loading = false;
    const sorter = {order: ""};
    const searchData = {};
    const modalData = {
      categoryId:{value:"",title:"产品分类"},
      code:{value:"",title:"物料编码"},
      name:{value:"",title:"物料名称"},
      model:{value:"",title:"规格型号"},
      unit:{value:"",title:"单位"},
      common:{value:"",title:"配置属性"},
      source:{value:"",title:"来源"},
      processing:{value:"",title:"加工类型"},
      seriesId:{value:"",title:"产品系列"},
      color:{value:"",title:"颜色"},
      expirationType:{value:"",title:"质保期"},
      storage:{value:"",title:"存放要求"},
      origin:{value:"",title:"产地"},
      level:{value:"",title:"材质等级"},
      semiType:{value:"",title:"半制品种类"},
      oilPaint:{value:"",title:"油漆面积"},
      note:{value:"",title:"备注"},
    };
    const modalType = "";
    const modalKey = "";
    this.state = {
        record,
        disabled,
        statusNumber,
        axiosChange,
      visible,
      pagination,
      loading,
      dataSource,
      editIndex,
      sorter,
      modalData,
      searchData,
      modalType,
      modalKey,
    };
    //初始化columns
    const columns = [
      {title: "序号", key: "order", render: (text, record, index) => index + 1},
      {title: "物料编码", dataIndex: "code", key: "code"},
      {title: "物料名称", dataIndex: "name", key: "name"},
      // {title: "新增类型", dataIndex: "addType", key: "addType"}, //TODO 待根据后续代码调整变更类型
      {title: "发起人", dataIndex: "createUserId", key: "createUserId"},
      {title: "修改时间", dataIndex: "updateTime", key: "updateTime"},
      {title: "最后审核状态", dataIndex: "status", key: "status", render: (text, record) => this.statusRender(text, record)},
      {title: "审核人", dataIndex: "approvalUserId", key: "approvalUserId"},
      {title: "操作", dataIndex: "pic", key: "pic",render:(text,record, index)=>{
        return <Button onClick={()=>{this.showModal('edit',record)}}>查看</Button>
      }},
    ];
    this.columns = columns;

  }
    handleAppr = (record) => {
        axios({
            url:"/new/approval/"+record.approvalId+"/submit",
            method:"put",
            data:{
            }
        }).then(res =>{
            if(res.data.code !=="200"&& res.data.code !=="201"&&res.data.code !=="204"){
                message.warning(res.data.msg||"操作失败");
                return;
            }
            message.success("操作成功");
            this.axios({pageindex: 1});
        }).catch(e=>{
            message.error("系统出错,请重新尝试");
        })
    }
    
  statusRender = (text, record) => {
    if(text === "0"){
      return <span>未提交&nbsp;&nbsp;<Button onClick={()=>{this.handleAppr(record)}}>提交审核</Button></span>;
    }else if(text === "1"){
      return "待审核";
    }else if(text === "2"){
      return "审核通过";
    }else if(text === "-1"){
      return "被拒";
    }else if(text === "-2"){
      return "驳回";
    }
  }

  handleSearch = (data) =>{//按条件搜索
    const {pagination} = this.state;
    pagination.current = 1;
    pagination.total=0;
    this.setState({
      searchData:data,
      pagination
    })
    this.axios({
      ...data,
      pagesize:this.state.pagination.pagesize||10,
      pageindex:1,
      sortField:this.state.sorter.field,
      sortOrder:this.state.sorter.order
    });
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = {...this.state.pagination};
    let pageindex = 1;
    if (sorter.field !== this.state.sorter.field) {
      pageindex = 1;
    } else {
      pageindex = pagination.current
    }
    pager.current = pageindex;
    pager.pagesize = pagination.pageSize;
    const sort = {};
    sort.field = sorter.field;
    sort.order = sorter.order;
    this.setState({
      pagination: pager,
      sorter: sort
    });


  };
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
      url: "/new/materials",
      method: "get",
      params: {
        pagesize: 10,
        ...params
      }
    }).then(res => {
     
      if (!checkCode(res.data.code)) {
        const pagination = {...this.state.pagination};
        pagination.total = 0;
        if (res.data.code === "607") {
          this.setState({
            loading: false,
            dataSource: [],
            pagination
          })
        } else {
          this.setState({pagination, loading: false, dataSource: []})
        }
        return
      };
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
  //
  componentDidMount(){
    this.axios({pageindex: 1});
  }
    statusNumberChange=()=>{
       this.setState({
           statusNumber:"3",
       })
    }
  showModal = (type,record) => {
      console.log(record)
    const {modalData} = this.state ;
    Object.keys(modalData).forEach(key=>{
      if(type === "add"){
        modalData[key].value = "";
          this.setState({
              disabled:false,
              modalType:type,
              visible:true,
              editIndex:editIndex,
              modalData,
              modalKey
          })
      }else if (type === "edit"){
        modalData[key].value = record[key];
         if(record.status==="0"){
           this.setState({
               disabled:false,
           })
         }else{
           this.setState({
               disabled:true,
           })
         }
          this.setState({
              record:record,
              statusNumber:record.status,
              modalType:type,
              visible:true,
              editIndex:editIndex,
              modalData,
              modalKey
          })
      }

    });

    let editIndex = -1;
    this.state.dataSource.forEach((item,index)=>{
      if(item === record){editIndex = index}
    })
    let modalKey = 1000*Math.random()+ new Date(0).toUTCString();


  };
  //自动调用子组件的方法
  axiosChange=()=>{
     this.setState({
         axiosChange:true,
     })
  }
  handleOk = (data,option) => {
    this.setState({
      visible: false,
    });
    const modalType = this.state.modalType;
    if(modalType === 'add'){
      axios({
        url:"/new/material",
        data:{
          ...data,
        },
        method:"post"
      }).then((res)=>{
        if(!checkCode(res.data.code))return;
        const {searchData,pagination,sorter}= this.state;
        this.axios({
          pageindex:pagination.current||1,
          pagesize:pagination.pagesize||10,
          ...searchData,
          sortField:sorter.field,
          sortOrder:sorter.order
        })
      }).catch(e=>{
        message.error("系统出错,请重新尝试")
      })
    }else if(modalType === 'edit'){
        axios({
            url:"/new/approval/"+ this.state.record.approvalId +"/approve",
            method:"put",
            data:{
                id: this.state.record.id,
                name: this.state.record.name,
                apprProcessId: this.state.record.apprProcessId,
                sourceId: this.state.record.sourceId,
                opinion: option,
                description: data.note
            }
        }).then(res =>{
            if(res.data.code !=="200"&& res.data.code !=="201"&&res.data.code !=="204"){
                message.warning(res.data.msg||"操作失败");
                return;
            }
            message.success("操作成功");
            this.axios()
            this.axios({pageindex: 1})
        }).catch(
            // message.error("系统出错,请重新尝试");
        )
      // console.log(this.state.dataSource[this.state.editIndex].id)
      // axios({
      //   url:"new/material/"+ this.state.dataSource[this.state.editIndex].id +"/approve",
      //   data:{
      //     ...data,
      //   },
      //   method:"post"
      // }).then((res)=> {
      //   if (!checkCode(res.data.code)) return;
      //   const {searchData, pagination, sorter} = this.state;
      //   this.axios({
      //     pageindex: pagination.current || 1,
      //     pagesize: pagination.pagesize || 10,
      //     ...searchData,
      //     sortField: sorter.field,
      //     sortOrder: sorter.order
      //   })
      // }).catch(e=>{
      //   message.error("系统出错,请重新尝试")
      // })
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
    
  render = () => {
    const expandedRowRender = (record, index) => {
      return <Table2 index={index}
                     record={record}
                     axios={this.axios}
                     axiosChange={this.axiosChange}
                     axiosChg={this.state.axiosChange}
      />;
    };
    const {modalKey,modalType,visible,modalData}=this.state;
    return (
      <div>
        <SearchForm onSearch = {this.handleSearch} />
        <div>
          <Button style={{marginRight:16}} onClick={()=>{this.showModal('add')}}>添加物料</Button>
          <Button style={{marginLeft:20,marginBottom:20}}>导入物料</Button>
        </div>
        <Table className="components-table-nested" columns={this.columns} pagination={this.state.pagination}
               onChange={this.handleTableChange} loading={this.state.loading} rowKey={record => record.id}
               dataSource={this.state.dataSource} expandedRowRender={expandedRowRender}/>
        <ModalForm1
          key={modalKey}
          modalType={modalType}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          modalData={modalData}
          statusNumber={this.state.statusNumber}
          disabled={this.state.disabled}
          disabledChange={this.disabledChange}
          record={this.state.record}
          axios={this.axios}
          statusNumberChange={this.statusNumberChange}
        />
      </div>

    )

  }


}

export default MaterialAddChange;