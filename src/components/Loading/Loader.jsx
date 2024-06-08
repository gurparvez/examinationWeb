import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion'; // Import useAnimation hook

// TODO: use the props
function LoaderSimple(props) {
    const [loading, setLoading] = useState(true);
    const controls = useAnimation(); // Use useAnimation hook

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (loading) {
            controls.start({
                opacity: 1,
                transition: { duration: 1 },
            });
        } else {
            controls.start({
                opacity: 0,
                transition: { duration: 1 },
            });
        }
    }, [loading, controls]);

    return (
        <motion.div
            className='fixed left-0 top-0 z-10 flex h-full h-screen w-full items-center justify-center bg-gray-300'
            animate={controls}
        >
            <div className='rounded-md p-4'>
                <div className='flex justify-center'>
                    <>
                        <motion.span
                            className='mx-1 my-12 h-4 w-4 rounded-full bg-white'
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0], // Fades out
                                transition: { duration: 1, repeat: 2 },
                            }}
                        />
                        <motion.span
                            className='mx-1 my-12 h-4 w-4 rounded-full bg-white'
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0], // Fades out
                                transition: {
                                    duration: 1,
                                    repeat: 1.8,
                                    delay: 0.2,
                                },
                            }}
                        />
                        <motion.span
                            className='mx-1 my-12 h-4 w-4 rounded-full bg-white'
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0], // Fades out
                                transition: {
                                    duration: 1,
                                    repeat: 1.6,
                                    delay: 0.4,
                                },
                            }}
                        />
                    </>
                </div>
            </div>
        </motion.div>
    );
}

export default LoaderSimple;
