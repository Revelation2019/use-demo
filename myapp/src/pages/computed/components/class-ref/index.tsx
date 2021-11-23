import React from 'react';
import Child from './Child';

class Father extends React.Component<{}, {}> {
  inputRef: HTMLInputElement | null = null;

  generateRef = (el: HTMLInputElement) => {
    this.inputRef = el;
  }

  componentDidMount () {
    console.log(this.inputRef);
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  render () {
    return <Child generateRef={this.generateRef}></Child>;
  }
}

export default Father;
