import React from 'react'

export default function Chat({msg,name,align}) {
  return (
    <div className={`bg-purple-600 ${align === "right" ? "ml-auto" : "mr-auto"} text-slate-950 m-0 p-1 h-fit max-w-[60vw] w-fit min-w-[250px] my-1 rounded-lg shadow-purple-400 shadow-md`}>
        <div className='text-[12px] text-indigo-100'>{name}</div>
        <div className='text-white'>{msg}</div>
    </div>
  )
}
