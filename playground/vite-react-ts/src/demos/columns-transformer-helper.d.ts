import '@monorepo-setup/pkg-react-ui'

declare module '@monorepo-setup/pkg-react-ui' {
  interface TableCustomValueParamsMap {
    myValueType: { count: 2 | 3 }
  }
}
