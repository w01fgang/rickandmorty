# Rick and Morty, BigCorp affiliate program

## Stack
- [React](https://reactjs.org)
- [Nextjs](https://nextjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)


## Structure

- **pages** - entry points for pages, no components should be here
- **components** - components are here
- **assets** - static assets
- **flow-typed** - Flow type definitions
- **lib** - Store, Actions, Reducer, etc.

## Development process

**Start in dev mode**
```
yarn dev
```

**Build**
```
yarn build
```

**Run built app locally**
```
yarn start
```

**DX**

To open errors in your editor create a file `.env.local` in the root of the project and cpecify your editor
```
REACT_EDITOR=atom
```

Check for static types errors
```
yarn flow check
```

Check for eslint errors
```
yarn flow lint
```

Fix eslint errors
```
yarn flow lint:fix
```
