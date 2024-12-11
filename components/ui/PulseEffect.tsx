"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";

interface Props {
    children: JSX.Element;
}

function PulseEffect({ children }: Props) {
    const { scrollYProgress } = useScroll();
    const [itsZero, setitsZero] = useState(false);
    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            if (scrollYProgress.get() === 0) {
                setitsZero(true);
            } else {
                setitsZero(false);
            }
        }
    });

    let mainControl = "";

    if (itsZero) {
        mainControl = "first";
    } else {
        mainControl = "second";
    }
    return (
        <AnimatePresence mode="wait">
            <motion.div
                variants={{
                    first: { scale: [1.3, 1], filter: ["blur(8px)", "blur(0px)"] },
                    second: { scale: 1, filter: "blur(0px)" },
                }}
                initial="second"
                animate={mainControl}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default PulseEffect;
