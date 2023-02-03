import {
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
  createContext,
} from "react";

export interface StoreProviderProps {
  children?: ReactNode;
}

type UseStore<State> = () => State;
type UseDispatch<Action> = () => Dispatch<Action>;
type StoreProvider = (props: StoreProviderProps) => JSX.Element;

export type Reducer<State, Action> = (state: State, action: Action) => State;

type StoreResult<State, Action> = {
  StoreProvider: StoreProvider;
  useStore: UseStore<State>;
  useDispatch: UseDispatch<Action>;
};

export default function makeStore<State, Action>(
  key: string,
  reducer: Reducer<State, Action>,
  initialState: State
): StoreResult<State, Action> {
  const StoreContext = createContext(initialState);
  const DispatchContext = createContext<Dispatch<Action>>(() => {});

  try {
    initialState = JSON.parse(localStorage.getItem(key) || "") || initialState;
  } catch (e) {}

  const localStorageReducer = (state: State, action: Action) => {
    const newState = reducer(state, action);
    localStorage.setItem(key, JSON.stringify(newState));
    return newState;
  };

  function StoreProvider({ children }: StoreProviderProps) {
    const [store, dispatch] = useReducer<Reducer<State, Action>>(
      localStorageReducer,
      initialState
    );

    return (
      <>
        <StoreContext.Provider value={store}>
          <DispatchContext.Provider value={dispatch}>
            {children}
          </DispatchContext.Provider>
        </StoreContext.Provider>
      </>
    );
  }

  function useStore(): State {
    return useContext(StoreContext);
  }

  function useDispatch(): Dispatch<Action> {
    return useContext<Dispatch<Action>>(DispatchContext);
  }

  return { StoreProvider, useDispatch, useStore };
}
