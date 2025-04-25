import React from 'react';

const AuthImagePattern = ({ title, subTitle}) => {
    return (
        <div className="hidden z-10 lg:flex items-center justify-center bg-base-200 p-12">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {
                        [...Array(9)].map((_,i) =>(
                            <div key={i} className={`w-[8.75rem] h-[8.75rem] rounded-2xl bg-primary opacity-10 ${i%2 === 0 ? "animate-pulse":""}`}>
                            </div>
                        ))
                    }

                </div>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content opacity-60">{subTitle}</p>

            </div>

        </div>
    );
};

export default AuthImagePattern;