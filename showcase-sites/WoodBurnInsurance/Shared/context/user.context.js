import { ReactV18 } from 'dxmodule';

const { React } = ReactV18;

//
// Context for accessing the currently logged-in user.
//
export const UserContext = React.createContext(null);
