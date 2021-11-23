import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import qs from 'query-string';

// interface IParam {
//   id?: string;
// }

interface IProps extends RouteConfigComponentProps<{}> {}

/** Main */
const Main = (props: IProps) => {
  // const id = parseLocationSearch(this.props.location.search).id;

  console.log(props);
  // const { id } = useParams<IParam>();
  // const { id } = props.match.params;
  const { id } = qs.parse(props.location.search);
  console.log('参数：', id);
  return (
    <div>
      123123
    </div>
  );
};

export default Main;
