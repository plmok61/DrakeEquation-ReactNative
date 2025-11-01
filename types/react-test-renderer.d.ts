declare module 'react-test-renderer' {
  export interface ReactTestRenderer {
    toJSON(): any;
  }
  export function create(element: React.ReactElement): ReactTestRenderer;
}

