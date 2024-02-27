"use client";
import styles from "./pagetransition.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useContext, useRef } from "react";

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 100 },
};

const exceptions = ["/"];

export default function PageTransitionEffect({
  children,
}: PropsWithChildren<{}>) {
  // The `key` is tied to the url using the `usePathname` hook.
  const key = usePathname();
  const isException = exceptions.findIndex((item) => item === key) !== -1;
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={key}
        initial={isException ? "" : "hidden"}
        animate={isException ? "" : "enter"}
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
        className={styles.overflowHidden}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
