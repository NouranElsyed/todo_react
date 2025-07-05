

const ErrorMsg = ({msg , display}:{msg?:string , display:boolean}) => {
  return (
    <>
  { display &&
      <div className="text-red-400"> {msg}</div>
  }
  </>
  )
}

export default ErrorMsg