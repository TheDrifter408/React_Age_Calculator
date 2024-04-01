import { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from 'react'
import './App.css'

type Result = {
  years: string,
  months:string,
  days:string
}

function App() {
  const [userInput, setUserInput] = useState<Result>({
    years:'--',
    months:'--',
    days:'--'
  })

  const [result,setResult] = useState<Result>({
    years:'--',
    months:'--',
    days:'--'
  })

  function handleChange(e:ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setUserInput({...userInput,[name]:value})
  }


  function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log(userInput);

  }
  return (
    <section className="bg-gray-100 min-h-screen grid place-content-center">
      <div className="border-2 bg-white border-black rounded-t-[1rem] rounded-bl-[1rem] rounded-br-[10rem] m-auto w-[70%] grid py-4 px-5">
        <form onSubmit={handleSubmit} className="m-0 p-0">
          <div className="flex gap-1 justify-center ">
            <div className="flex flex-col p-1 m-0 w-3/4">
              <label className="font-bold text-slate-400" htmlFor="inputDay">Day</label>
              <input onChange={handleChange} className="w-3/4 h-10 p-2 border rounded border-slate-300 font-bold text-slate-800" placeholder="DD"  type="text" id="inputDay" name="days" />
            </div>
            <div className="flex flex-col p-1 m-0 w-3/4">
              <label className="font-bold text-slate-400" htmlFor="inputMonth">Month</label>
              <input onChange={handleChange} className="w-3/4 h-10 p-2 border rounded border-slate-300 font-bold text-slate-800" placeholder="MM" type="text" id="inputMonth" name="months"/>
            </div>
            <div className="flex flex-col p-1 m-0 w-3/4">
              <label className="font-bold text-slate-400" htmlFor="inputYear">Year</label>
              <input onChange={handleChange} className="w-3/4 h-10 p-2 border rounded border-slate-300 font-bold text-slate-800" placeholder="YYYY" type="text" id="inputYear" name="years" />
            </div>
          </div>
          <div className="flex gap-2 items-center my-1">
          <div className="w-3/4 h-[2px] bg-slate-200 p-0 m-0" />
          <button className="h-[50px] w-[50px] rounded-full text-slate-100 bg-purple-700 m-0" type="submit"> S </button>
          </div>
        </form>
        <div className="">
          <h2 className="font-bold italic text-7xl my-1"><span className="text-purple-700">{result.years}</span> years</h2>
          <h2 className="font-bold italic text-7xl my-1"><span className="text-purple-700">{result.months}</span> months</h2>
          <h2 className="font-bold italic text-7xl my-1"><span className="text-purple-700">{result.days}</span> days</h2>
        </div>
      </div>  
    </section>
  )
}

export default App
