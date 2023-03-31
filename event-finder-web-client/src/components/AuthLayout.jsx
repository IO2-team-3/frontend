import {Await, useLoaderData, useOutlet} from "react-router-dom";

import React, {createContext, Suspense, useContext, useEffect, useMemo, useState} from "react";
import {AuthProvider, useAuth} from "../hooks/useAuth.jsx";
import ProgressBar from "./ProgressBar.jsx";

export const AuthLayout = () => {
    const outlet = useOutlet();

    const IndicatorContext = createContext();

    function IndicatorProvider({ children }) {
        const [active, setActive] = useState(false);
        const value = useMemo(() => ({ active, setActive }), [active, setActive]);
        return (
            <IndicatorContext.Provider value={value}>
                {children}
            </IndicatorContext.Provider>
        );
    }

    function Indicator() {
        const { active } = useContext(IndicatorContext);
        const [percent, setPercent] = useState(0);
        useEffect(() => {
            setTimeout(() => {
                setPercent(percent => (percent < 100 ? percent + 15 : 100));
            }, 200);
        });
        return active ? <ProgressBar percent={percent} /> : null;
    }

    function IndicatorFallback() {
        const { setActive } = useContext(IndicatorContext);
        useEffect(() => {
            setActive(true);
            return () => setActive(false);
        });
        return null;
    }

    const { userPromise } = useLoaderData();
    return (
        <IndicatorProvider>
            <Indicator/>
        <Suspense fallback={
            <IndicatorFallback/>
            }>
            <Await
                resolve={userPromise}
                errorElement={<p>Something went wrong!</p>}
                children={(user) => (
                    <AuthProvider userData={user}>{outlet}</AuthProvider>
                )}
            />
        </Suspense>
        </IndicatorProvider>
    );
};