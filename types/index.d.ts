declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

declare module 'react-styleguidist/lib/client/rsg-components/ComponentsList/ComponentsList' {
  interface ComponentsListProps {
    [key: string]: any | any[];
  }

  const ComponentsList: React.FunctionComponent<ComponentsListProps>;
  // eslint-disable-next-line import/no-default-export
  export default ComponentsList;
}
