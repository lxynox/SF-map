This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

It uses `redux` for deterministic state management and `react` for declarative ui rendering.

Simply 

```bash
$ yarn // or `npm i`
$ yarn start // or `npm start`
```

the app will be ready at: [browser](http://localhost:3000).

### Folder Structure

```
├── App.js                   (root level of react render tree)
├── index.css                (global styles applied to the document)
├── index.js                 (app entry with initialization sequence)
├── registerServiceWorker.js (CRA boilerplate that helps build PWA)
├── actions                  (redux actions)
│   ├── api.js
│   ├── routes.js
│   └── vehicles.js
├── assets
│   └── vue.png
├── components               (ui blocks)
│   ├── Control.js
│   ├── Error.js
│   ├── ErrorBoundary.js
│   ├── RequestTracker.js
│   └── SFMap.js
├── constants 
│   ├── ActionTypes.js
│   └── api.js
├── data                     (json files used for painting)
│   ├── arteries.json
│   ├── freeways.json
│   ├── index.js
│   ├── neighborhoods.json
│   └── streets.json
├── reducers                 (redux reducers)
│   ├── api.js
│   ├── index.js
│   ├── routes.js
│   └── vehicles.js
├── store                    (redux store)
│   ├── configureStore.dev.js
│   ├── configureStore.prod.js
│   ├── index.js
│   └── selectors.js
└── utils                    (helper functions)
    ├── color.js
    ├── doFetch.js
    ├── resolveUrl.js
    └── viewport.js
```

### Render Tree

```jsx
<Provider>
  <SFMap />
  <Control />
</Provider>
```

### State Tree

```
{
  api: {
    endpoint
  },
  routes: {
    ids,
    selectedRoute
  },
  vehicles: {
    ids,
    lastTime
  }
}
```
