import { data } from "../utils/data"


const HomePage = () => {
  return (
    <div className="flex my-8 items-center justify-center">
        <div className="mx-auto space-y-2 ">
            <h1 className="text-2xl text-center">Welcome to <span className="text-blue-800 font-semibold tracking-wide">Goodspace</span> ai assistant</h1>
            <h2 className="text-center text-lg font-semibold">Ask anything you want</h2>
            <h3 className="text-center">For Example:</h3>
            <div>
                {data.map((item,idx) => (
                    <div className="card" key={idx}>{item.question}</div>
                ))}
            </div>
        </div> 
    </div>
  )
}

export default HomePage