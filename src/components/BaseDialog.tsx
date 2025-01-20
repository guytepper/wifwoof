import { motion } from "framer-motion";
import { ReactCall } from "react-call";
import styles from "./BaseDialog.module.css";

interface BaseDialogProps {
  children: React.ReactNode;
  call: ReactCall.Context<void, void, unknown>;
}

export const BaseDialog = ({ children, call }: BaseDialogProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: call.ended ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={styles.dialogBackdrop}
        onClick={() => call.end()}
      />

      <motion.div
        initial={{ y: "-90vh" }}
        animate={{ y: call.ended ? "100vh" : -100 }}
        transition={{
          type: "spring",
          damping: 21,
          stiffness: 300,
          mass: 0.8,
        }}
        aria-modal="true"
        className={styles.dialogContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </>
  );
};
