import { useEffect, useState } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import "./Hidden.css";

export default function Hidden({ until, label = "Hidden block.", group = "default", children }) {
    const [canBeShown, setCanBeShown] = useState(false);

    const updateUntil = (until) => setDoc(doc(db, "hidden", group), { until });
    const hideBlock = () => updateUntil(until - 1);
    const showBlock = () => updateUntil(until);

    useEffect(() => {
        const unsuscribe = onSnapshot(doc(db, "hidden", group), (doc) => {
            try {
                const shouldBeShown = doc.data()?.until >= until;
                shouldBeShown !== canBeShown && setCanBeShown(shouldBeShown);
            } catch (err) {
                console.error(err);
            }
        });
        return () => unsuscribe();
    }, [canBeShown]);

    return canBeShown ?
        <>
            <span className="hidden-block--btn hidden-block--btn-hide" onClick={hideBlock}>🙈</span>
            {children}
        </>
        :
        <div className="hidden-block">
            {label}
            <span className="hidden-block--btn" onClick={showBlock}>🙌</span>
        </div>;
}
