import React from 'react';

interface IProps {
  generateRef: (el: HTMLInputElement) => void;
}

class Child extends React.Component<IProps, {}> {
  render () {
    const { generateRef } = this.props;
    return <input type="text" ref={generateRef}/>;
  }
}

export default Child;
