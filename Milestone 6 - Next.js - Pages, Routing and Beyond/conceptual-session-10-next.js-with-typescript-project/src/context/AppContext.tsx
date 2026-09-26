import React, { ReactNode, useState } from 'react';
import { createContext } from 'vm';


export const AppContext = createContext(null);

const AppProvider = ({ children }: { children: ReactNode }) => {

    const [installed]Apps, setInstalledApps] = useState([]);

    return <AppContext.Provider value={}>
        {children}
    </AppContext.Provider>
};

export default AppProvider;