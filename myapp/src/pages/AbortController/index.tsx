import React, { useEffect } from 'react';
// import axios from 'axios';
import $ from 'jquery';
//
const AbortController = () => {
  // const CancelToken = axios.CancelToken;
  // const source = CancelToken.source();

  // const abortController = new Controller();
  let abortController: JQuery.jqXHR<any> | null = null;

  useEffect(() => {
    // axios.post('http://127.0.0.1:8088/getData', {name: 'zs', pwd: '123456'}, {cancelToken: source.token})
    //   .then(res => {
    //     console.log(res);
    //   })

    // fetch('http://127.0.0.1:8088/getData', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name: 'zs',
    //     pwd: '123456'
    //   }),
    //   signal: abortController.signal
    // })

    abortController = $.ajax({
      url: 'http://127.0.0.1:8088/getData',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        name: 'zs',
        pwd: '123456'
      }),
      success: function (res) {
        console.log(res);
      }
    });
  }, []);

  //
  const abort = () => {
    // source.cancel('cancle request!');
    // abortController.abort()
    abortController?.abort();
  };

  return (
    <>
    <div>this is a abortController page.</div>
    <div><button onClick={abort}>取消请求</button></div>
    </>
  );
};

export default AbortController;
