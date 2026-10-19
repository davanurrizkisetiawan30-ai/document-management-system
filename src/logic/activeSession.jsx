import { createContext, useContext, useState } from "react";

{/* Active Session Context/menyimpan data pengguna */}
const ActiveSessionContext = createContext(null);

export function ActiveSessionProvider({ children }) {
    const [activeSession, setActiveSession] = useState(null);
    return (
        <ActiveSessionContext.Provider value={{ activeSession, setActiveSession }}>
            {children}
        </ActiveSessionContext.Provider>
    );
}

export function useActiveSession() {
    return useContext(ActiveSessionContext);
}