import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import Plugin from './Plugin';
// import Communicate from './communicate';

// eslint-disable-next-line no-unused-vars
type IASD = string;// IASD

interface IProps extends RouteConfigComponentProps<any> {
 aaa?: string;// aaa
}

/** Main */
const Main = (props: IProps) => {
  return (
    <div>
      <span>测试webworker</span>
      {/* <Communicate></Communicate> */}
      {/* <WorkerBlob></WorkerBlob> */}
      <Plugin></Plugin>
    </div>
  );
};

export default Main;
