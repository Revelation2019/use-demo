import React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../store/store';
import Count from './Count';

interface IProps {
  store?: Store
}

// const Main = (props: IProps) => {
//   console.log('render');
//   const store = props.store as Store;

//   const getCount = () => {
//     return store.count;
//   }

//   const plus = () => {
//     const store = props.store as Store;
//     store.setCount(store.count + 1);
//   }

//   return (
//     <div>
//       {/* <Count dom={() => store.count}></Count> */}
//       <div>{getCount()}</div>
//       <button onClick={plus}>++</button>
//     </div>
//   )
// }

// export default inject('store')(observer(Main));

@inject('store')
@observer
class Main extends React.Component<IProps, {}> {
  getCount = () => {
    return this.props.store?.count;
  }

  plus = () => {
    const store = this.props.store as Store;
    store.setCount(store.count + 1);
  }

  render () {
    console.log('render');
    return (
      <div>
        <Count dom={this.getCount}>
          {this.getCount()}
        </Count>
        <button onClick={this.plus}>++</button>
      </div>
    );
  }
}

export default Main;
