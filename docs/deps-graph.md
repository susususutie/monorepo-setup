## 模块依赖图

> 使用 Mermaid 描述 monorepo 各模块依赖关系。

### 顶层包与示例应用
```mermaid
graph TD
  subgraph workspace
    subgraph packages
      U[pkg-utils]
      R[pkg-react-ui]
      V[pkg-vue-ui]
    end
    subgraph playground
      PRTS[vite-react-ts]
      PR18[vite-react18-js]
      PVTS[vue-ts]
      PVT[vanilla-ts]
    end
  end

  %% playground apps consume packages (via alias to src during dev)
  PRTS --> U
  PRTS --> R

  PR18 --> R

  PVTS --> U
  PVTS --> V

  PVT --> U

  %% external peers
  R --> REACT[react]
  R --> RDOM[react-dom]
  R --> ANTD[antd]
  R --> AS[antd-style]
  R --> ICONS[@ant-design/icons]

  V --> VUE[vue]
```

### pkg-utils 内部模块关系
```mermaid
graph TD
  IU[index.ts]
  C[constants.ts]
  T[types.ts]
  M[math.ts]
  S[string.ts]
  A[array.ts]
  O[object.ts]
  ASY[async.ts]
  D[date.ts]
  V[validator.ts]
  E[event.ts]
  CA[cache.ts]
  ER[error.ts]

  %% index.ts re-exports all modules
  IU --> C
  IU --> T
  IU --> M
  IU --> S
  IU --> A
  IU --> O
  IU --> ASY
  IU --> D
  IU --> V
  IU --> E
  IU --> CA
  IU --> ER

  %% tests target each module (Vitest)
  subgraph test
    TA[array.test.ts]
    TAS[async.test.ts]
    TC[cache.test.ts]
    TCONS[constants.test.ts]
    TD[date.test.ts]
    TER[error.test.ts]
    TEV[event.test.ts]
    TI[index.test.ts]
    TM[math.test.ts]
    TO[object.test.ts]
    TS[string.test.ts]
    TTS[types.test.ts]
    TV[validator.test.ts]
    TTSH[tree-shaking.test.ts]
  end

  TA --> A
  TAS --> ASY
  TC --> CA
  TCONS --> C
  TD --> D
  TER --> ER
  TEV --> E
  TI --> IU
  TM --> M
  TO --> O
  TS --> S
  TTS --> T
  TV --> V
  TTSH --> IU
```

### pkg-react-ui 组件库
```mermaid
graph TD
  RI[index.ts]
  DEMO[Demo.tsx]

  RI --> DEMO

  %% external deps
  DEMO --> ANTD[antd]
  DEMO --> AS[antd-style]
  DEMO --> ICONS[@ant-design/icons]
  DEMO --> REACT[react]
  DEMO --> RDOM[react-dom]
```

### pkg-vue-ui 组件库
```mermaid
graph TD
  VI[index (dist)]
  BTN[button (dist)]
  CARD[card (dist)]

  %% package.json exports map to dist entries
  VI --> BTN
  VI --> CARD

  %% external dep / peer
  VI --> VUE[vue]
  BTN --> VUE
  CARD --> VUE
```

