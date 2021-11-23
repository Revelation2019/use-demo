import { Button } from 'antd';
import React from 'react';
import RbacHOC from '../../HOC/RbacHOC';

/** Rbac */
const Rbac = (props: any) => {
  /** submit */
  const submit = () => {
    console.log('submit!!!');
  };
  return (
    <div>
      <div>
        <Button onClick={submit}>submit1</Button>
        <Button onClick={submit}>submit2</Button>
      </div>
      <Button onClick={submit}>submit3</Button>
      <Button onClick={submit}>submit4</Button>
    </div>
  );
};

export default RbacHOC(Rbac);
