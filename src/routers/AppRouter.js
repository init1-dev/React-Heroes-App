import { Routes, Route, HashRouter } from "react-router-dom";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
    return (
        <HashRouter>
            
            <Routes>
                
                <Route path="/login" element={
                        <PublicRoute>
                            <LoginScreen />
                        </PublicRoute>
                    } 
                />
                
                <Route path="/*" element={
                        <PrivateRoute>
                            <DashboardRoutes />
                        </PrivateRoute>
                    } 
                />

                {/* <Route path="/login" element={ <LoginScreen /> } /> */}

                {/* <Route path="/*" element={ <DashboardRoutes /> } /> */}
                
            </Routes>
        </HashRouter>
    )
}
