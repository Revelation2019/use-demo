import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import ClassRef from './class-ref';

interface IProps extends RouteConfigComponentProps<void> {

}

/** Main */
const Main = (props: IProps) => {
  return <div>
    <ClassRef></ClassRef>
    </div>;
};

export default Main;
