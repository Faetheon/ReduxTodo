// Npm modules
import { createStore } from 'redux';

// Helper functions
import reducer from './reducers';

// Interfaces
import { reduxStore } from '../interfaces/reduxStore';


export default function configureStore(initialState: reduxStore) {
  const store = createStore(reducer, initialState);
  return store;
}