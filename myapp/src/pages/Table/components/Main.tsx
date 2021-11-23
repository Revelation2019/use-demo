import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import Table from './table';

interface IProps extends RouteConfigComponentProps<{}> {}

const Main = (props: IProps) => {
  return (
    <div>
      <Table></Table>
    </div>
  );
};

export default Main;
