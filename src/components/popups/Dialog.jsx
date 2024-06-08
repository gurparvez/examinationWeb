const Dialog = () => {
    console.log('Dialog Rendered');
    return (
        <div className='pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300'>
            <div
                data-dialog='dialog-xs'
                className='text-blue-gray-500 relative m-4 w-1/4 min-w-[25%] max-w-[25%] rounded-lg bg-white font-sans text-base font-light leading-relaxed antialiased shadow-2xl'
            >
                <div className='text-blue-gray-900 flex shrink-0 items-center p-4 font-sans text-2xl font-semibold leading-snug antialiased'>
                    Its a simple dialog.
                </div>
                <div className='border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500 relative border-b border-t p-4 font-sans text-base font-light leading-relaxed antialiased'>
                    The key to more success is to have a lot of pillows. Put it
                    this way, it took me twenty five years to get these plants,
                    twenty five years of blood sweat and tears, and I&apos;m
                    never giving up, I&apos;m just getting started. I&apos;m up
                    to something. Fan luv.
                </div>
                <div className='text-blue-gray-500 flex shrink-0 flex-wrap items-center justify-end p-4'>
                    <button
                        data-ripple-dark='true'
                        data-dialog-close='true'
                        className='middle none center mr-1 rounded-lg px-6 py-3 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                    >
                        Cancel
                    </button>
                    <button
                        data-ripple-light='true'
                        data-dialog-close='true'
                        className='middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 px-6 py-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
