import makeStore from "../makeStore";

type Token = {
  username: string;
  accessToken: string;
} | null;

type Action =
  | {
      type: "SET_TOKEN";
      payload: {
        username: string;
        accessToken: string;
      };
    }
  | {
      type: "CLEAR_TOKEN";
    };

const reducer = (state: Token, action: Action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        username: action.payload.username,
      };
    case "CLEAR_TOKEN":
      return null;
    default:
      return state;
  }
};

export const {
  StoreProvider: AuthStoreProvider,
  useStore: useAuthStore,
  useDispatch: useAuthDispatch,
} = makeStore<Token, Action>("auth", reducer, null);
