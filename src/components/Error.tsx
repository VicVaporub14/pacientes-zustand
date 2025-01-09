import React from "react";

export default function Error({children} : {children: React.ReactNode}) {
  return (
    <p 
        className="bg-red-100 text-red-600 border-2 border-red-600 text-center font-medium rounded-md mt-2"
    >
        {children}
    </p>
  )
}
