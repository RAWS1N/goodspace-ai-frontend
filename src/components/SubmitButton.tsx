import React from 'react'

interface SubmitButtonProps {
    isLoading? : boolean
    onSubmit : () => void,
    label: string
}

const SubmitButton:React.FC<SubmitButtonProps> = ({isLoading,onSubmit,label}) => {
  return (
    <div onClick={onSubmit} className='cursor-pointer text-white border bg-gray-800 my-0.5 flex items-center justify-center gap-2 py-2 w-8/12 rounded-md mx-auto'>
    {isLoading ? <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>:<>{label}</>}
    </div>
  )
}

export default SubmitButton