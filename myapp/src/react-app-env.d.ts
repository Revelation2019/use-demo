/// <reference types="react-scripts" />
declare module 'gridmanager-react' {
  const classes: any;
  export default classes;
}

declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}

declare module 'react-webworker';

declare module 'classnames';
