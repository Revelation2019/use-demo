import React from 'react';
import Loader from 'react-loader-spinner';

const loadComp = (Com: React.LazyExoticComponent<any>) => {
  return class LoadComp extends React.Component<any, any> {
    render () {
      return (
        <React.Suspense fallback={<Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/>}>
          <Com />
        </React.Suspense>
      );
    }
  };
};

export default loadComp;
