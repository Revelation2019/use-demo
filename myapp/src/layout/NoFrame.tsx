import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

interface IProps extends RouteConfigComponentProps<void> {

}

/** */
const NoFrame = (props: IProps) => {
  const { route } = props;
  return (
    <div>
        {renderRoutes(route?.routes)}
    </div>
  );
};

export default React.memo(NoFrame);
