import { useContext, useEffect, useState } from "react";
import { LabosaurusContext } from "../..";

import "./Hidden.css";

export default function Hidden({ until, label = "Hidden block.", group = "default", children }) {
    const { storeProvider } = useContext(LabosaurusContext);

    const [canBeShown, setCanBeShown] = useState(false);

    const updateUntil = (until) => storeProvider.dispatch({ document: "hidden", id: group }, { until });
    const hideBlock = () => updateUntil(until - 1);
    const showBlock = () => updateUntil(until);

    useEffect(() => {
        const unsubscribe = storeProvider.subscribe({ document: "hidden", id: group }, (doc) => {
            try {
                const shouldBeShown = doc?.until >= until;
                shouldBeShown !== canBeShown && setCanBeShown(shouldBeShown);
            } catch (err) {
                console.error(err);
            }
        });
        return () => unsubscribe();
    }, [canBeShown]);

    return canBeShown ?
        <>
            <span className="hidden-block--btn hidden-block--btn-hide" onClick={hideBlock}>🙈</span>
            {children}
        </>
        :
        <>
            <span className="hidden-block--btn" onClick={showBlock}>🙌</span>
            <div className="block hidden-block">{label}</div>
        </>;
}
