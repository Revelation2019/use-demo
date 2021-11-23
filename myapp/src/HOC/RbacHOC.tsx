import { message } from 'antd';
import React, { Component } from 'react';

/** RbacHOC */
const RbacHOC = (Com: React.FC) => {
  return class WrappedComponent extends Component {
    divRef = React.createRef<HTMLDivElement>();

    /** intercept */
    intercept = (event: Event) => {
      event.stopImmediatePropagation();
      message.info('你没有权限使用该功能!!!');
    }

    componentDidMount () {
      this.divRef.current?.addEventListener('click', this.intercept, true);
    }

    componentWillUnmount () {
      this.divRef.current?.removeEventListener('click', this.intercept);
    }

    render () {
      return (
        <div style={{ display: 'inline-block' }} ref={this.divRef}>
          <Com></Com>
        </div>
      );
    }
  };
};

export default RbacHOC;
