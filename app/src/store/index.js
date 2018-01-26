import prodStore from './configureStore.prod';
import devStore from './configureStore.dev';

let loadedStore = null;

// Load store based on build env.
if (process.env.NODE_ENV === 'production') {
  loadedStore = prodStore
} else {
  loadedStore = devStore
}

export default loadedStore;
