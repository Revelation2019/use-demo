/* eslint-disable react/display-name */
import React from 'react';
import ReactGridManager from 'gridmanager-react';
import 'gridmanager-react/css/gm-react.css';

const Table = () => {
  // 组件: 操作列
  function ActionInner (props: any) {
    const actionAlert = (event: any) => {
      alert('操作栏th是由React模板渲染的');
    };
    return <span onClick={actionAlert} style={{ display: 'block', color: 'red' }}>{props.text}</span>;
  }

  function ActionComponents (props: any) {
    return <ActionInner text={props.text}/>;
  }

  // 组件: 空模板
  function EmptyTemplate (props: any) {
    return (
      <section style={{ textAlign: 'center' }}>
          {props.text}
      </section>
    );
  }

  // 组件: 标题
  function TitleComponents (props: any) {
    return (
      <a href={'https://www.lovejavascript.com/#!zone/blog/content.html?id=' + props.row.id} target={'_black'}>{props.row.title}</a>
    );
  }

  // 组件: 类型
  function TypeComponents (props: any) {
  // 博文类型
    const TYPE_MAP: any = {
      1: 'HTML/CSS',
      2: 'nodeJS',
      3: 'javaScript',
      4: '前端鸡汤',
      5: 'PM Coffee',
      6: '前端框架',
      7: '前端相关'
    };
    return (
      <button>{TYPE_MAP[props.type]}</button>
    );
  }

  // 组件: 删除
  function DeleteComponents (props: any) {
    const { index, row } = props;
    // const deleteAction = (event: any) => {
    //     if(window.confirm(`确认要删除当前页第[${event.target.getAttribute('data-index')}]条的['${event.target.title}]?`)){
    //         console.log('----删除操作开始----');
    //         $gridManager.refreshGrid(option.gridManagerName);
    //         console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
    //         console.log('----删除操作完成----');
    //     }
    // };

    return (
      <span className={'plugin-action'} data-index={index} title={row.title}>删除</span>
    );
  }

  // 表格组件配置
  const option = {
    gridManagerName: 'testReact',
    height: '100%',
    emptyTemplate: <EmptyTemplate text={'这个React表格, 什么数据也没有'}/>,
    columnData: [{
      key: 'pic',
      remind: 'the pic',
      width: '110px',
      text: '缩略图',
      template: (pic: any, row: any) => {
        return (
          <img style={{ width: '90px', margin: '0 auto' }} src={'https://www.lovejavascript.com' + pic} title={row.name}/>
        );
      }
    }, {
      key: 'title',
      remind: 'the title',
      text: '标题',
      template: <TitleComponents/>
    }, {
      key: 'type',
      remind: 'the type',
      text: '分类',
      align: 'center',
      template: (type: any, row: any, index: any) => {
        return <TypeComponents type={type}/>;
      }
    },
    {
      key: 'info',
      remind: 'the info',
      text: '使用说明'
    }, {
      key: 'username',
      remind: 'the username',
      text: '作者',
      // 使用函数返回 dom node
      template: (username: any, row: any, index: any) => {
        return (
              <a href={'https://github.com/baukh789'} target={'_black'}>{username}</a>
        );
      }
    }, {
      key: 'createDate',
      remind: 'the createDate',
      width: '100px',
      text: '创建时间',
      sorting: 'DESC',
      // 使用函数返回 htmlString
      template: function (createDate: any, rowObject: any) {
        return new Date(createDate).toLocaleDateString();
      }
    }, {
      key: 'lastDate',
      remind: 'the lastDate',
      width: '120px',
      text: '最后修改时间',
      sorting: '',
      // 使用函数返回 htmlString
      template: function (lastDate: any, rowObject: any) {
        return new Date(lastDate).toLocaleDateString();
      }
    }, {
      key: 'action',
      remind: 'the action',
      width: '100px',
      disableCustomize: true,
      text: <ActionComponents text={'操作'}/>,
      // 快捷方式，将自动向组件的props增加row、index属性
      template: <DeleteComponents/>
    }],
    supportRemind: true,
    isCombSorting: true,
    supportAjaxPage: true,
    supportSorting: true,
    ajaxData: 'http://localhost:8088/getData',
    ajaxType: 'POST'
  };

  const callback = (query: any) => { console.log('callback => ', query); };

  return (
    <ReactGridManager
      option={option}
      callback={callback}>
    </ReactGridManager>
  );
};

export default Table;
