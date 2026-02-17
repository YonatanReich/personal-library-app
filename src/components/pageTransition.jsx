import { motion } from 'framer-motion';

//This component is responisble for the page transitions
const animations = {
  // Page is shrunk below its y axis and invisible
  initial: { opacity: 0, y: -20, scale: 0.8 },
  
  // Page moves to its natural position at full size and opacity
  animate: { opacity: 1, y: 0, scale: 1 },
  
 
  exit: { opacity: 0, y:20, scale: 0.8 },
};


const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      /* TRANSITION CONFIG:
         type: "spring" -> Creates an organic, bouncy feel rather than a rigid linear movement.
         stiffness: 260 -> Controls the 'snap' speed.
         damping: 20    -> Controls how much the spring 'vibrates' before stopping.
      */
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;