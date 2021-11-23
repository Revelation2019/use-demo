/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
import React from 'react';
import { PageHeader, Button, Tag, Typography, Table } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M'
  });
}

@observer
class Main extends React.Component {
  render () {
    const { columnData } = this.props.PageStore;
    const columns = this.renderColumn(toJS(columnData));
    // console.log(columns);
    return (
      <div>
         <Table
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
          />
          <Button onClick={() => this.changeSchemeGroup()}>切换Group</Button>
          <Button onClick={() => this.changeScheme()}>切换Item</Button>
          <Button onClick={() => this.addGroupColumn()}>添加列</Button>
      </div>
    );
  }

  /** renderColumn */
renderColumn=(objects) => {
  const list = [];
  const resolve = {
    title: '译码结果',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left'
  };
  list.push(resolve);
  objects.map((item) => {
    const children = [];
    if (item.children) {
      for (let i = 0; i < item.children.length; i++) {
        const schemeDataIndex = item.children[i].index;
        const schemeData = item.children[i];
        const scheme = {
          title: () => {
            return <div>
              供应商{schemeDataIndex}
              <Button onClick={() => this.moveScheme(schemeData.index, -1)}>左移</Button>
              <Button onClick={() => this.moveScheme(schemeData.index, 1)}>右移</Button>
              </div>;
          },
          dataIndex: schemeDataIndex,
          key: schemeDataIndex
        };
        children.push(scheme);
      }
    }
    const data = {
      title: () => {
        return <div>{item.title}
            <Button onClick={() => this.moveGroup(item.index, -1)}>左移</Button>
            <Button onClick={() => this.moveGroup(item.index, 1)}>右移</Button>
            <Button onClick={() => this.addSupplier(item.index)}>添加供应商</Button></div>;
      },
      dataIndex: item.index,
      key: item.index,
      children: children
    };
    list.push(data);
  });
  return list;
}

/** changeSchemeGroup */
changeSchemeGroup = () => {

}

/** changeScheme */
changeScheme = () => {

}

/** getDiv */
getDiv = () => {
  return <div>sss</div>;
}

/** moveGroup */
moveGroup = (groupIndex, move) => {
  this.props.PageStore.moveGroup(groupIndex, move);
}

/** addGroupColumn */
addGroupColumn = () => {
  const { columnData } = this.props.PageStore;
  const columns = toJS(columnData);
  const index = columns.length + 1;
  const object = {
    title: '集采方案' + index,
    index: index,
    children: []
  };
  return this.props.PageStore.addColumn(object);
}

/** addSupplier */

addSupplier = (groupIndex) => {
  this.props.PageStore.addSupplier(groupIndex);
}

/** moveScheme */
moveScheme = (schemeIndex, move) => {
  this.props.PageStore.moveScheme(schemeIndex, move);
}
}

export default Main;
