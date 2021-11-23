import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Store } from '../store';

interface IProps {
  store: Store;
}

const Main = (props: IProps) => {
  const { store } = props;
  const { fetchData } = store;

  useEffect(() => {
    fetchData();
  });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // }

  return (
    <form action="/mock/16430/test/getData" method="post">
      <input type="text" name="id" id=""/>
      <br/>
      <input type="text" name="name" id=""/>
      <br/>
      {/* <input type="file" name="file" id=""/> */}
      {/* <br/> */}
      <input type="submit" value="提交"/>
    </form>
  );
};

export default inject('store')(observer(Main));
