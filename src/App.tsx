import { ChangeEvent, FormEvent, useState } from 'react'
import './App.css'
import CounterAnimate from './components/CounterAnimate'

//Error state type:
type Result = {
  years: string,
  months:string,
  days:string
}

type Count = {
  years:number,
  months:number,
  days:number
}

type Error = {
  years:{
    state:boolean,
    color:string
    text:string
  },
  months:{
    state:boolean,
    color:string,
    text:string
  },
  days:{
    state:boolean,
    color:string,
    text:string
  }
}

function App() {

  const [userInput, setUserInput] = useState<Result>({
    years:'--',
    months:'--',
    days:'--'
  })

  const [result,setResult] = useState<Count>({
    years:0,
    months:0,
    days:0
  })

  const [error,setError] = useState<Error>({
    years:{
      state:false,
      color:'text-slate-100',
      text:''
    },
    months:{
      state:false,
      color:'text-slate-100',
      text:''
    },
    days:{
      state:false,
      color:'text-slate-100',
      text:''
    }
  })

  function validateDate(days:string,months:string,years:string){

    const warningText = 'This field is required'
    const warningColor = 'text-red-500'
    //checking user day input 
    if(days.length === 0){
        setError({...error, days:{state:true,color:warningColor,text: warningText}})
    }
    else if(months.length === 0){
        setError({...error,months:{state:true,color:warningColor,text:warningText}})
    }
    else if(years.length === 0){
        setError({...error, years:{state:true,color:warningColor,text:warningText}})
    } else {
        const userDate = new Date(Number(years),Number(months) - 1,Number(days));
        const today = new Date();
        if(userDate.getDate() !== Number(days)){
          setError({...error, days:{state:true,color:warningColor,text:'Must be a valid Date.'}})
        } 
        else if((userDate.getMonth()) !== (Number(months) - 1)){
          setError({...error, days:{state:true,color:warningColor,text:'Must be a valid Month.'}})
        } 
        else if(userDate.getFullYear() > today.getFullYear()){
          setError({...error, days:{state:true,color:warningColor,text:'Must be a valid Year.'}})
        } 
        else {
          return userDate.getFullYear() === Number(years) && (userDate.getMonth()) === (Number(months) - 1) && userDate.getDate() === Number(days);
        }
    }
    return false;
  }

  function Counter(days:string,months:string,years:string){
    const userDate = new Date(Number(years),Number(months),Number(days));
    const today = new Date();
    // years
    let age_year = today.getFullYear() - userDate.getFullYear();
    // months
    let age_month = 0;
    if(today.getMonth() >= userDate.getMonth()){
      age_month = today.getMonth() - userDate.getMonth();
    } else {
      age_year--;
      age_month = 12 + (today.getMonth() - userDate.getMonth());
    }
    // get days
    let age_days = 0;
    if(today.getDate() >= userDate.getDate()){
      age_days = today.getDate() - userDate.getDate();
    } else {
      age_month--;
      age_days = 31 + (today.getDate() - userDate.getDate());
    }
    if(age_month < 0){
      age_month = 11
      age_year--;
    }
    age_month++;
    return {years:age_year,months:age_month,days:age_days}
  }

  function handleChange(e:ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setUserInput({...userInput,[name]:value})
  }


  function handleSubmit(e:FormEvent<HTMLFormElement>){
    
    e.preventDefault();
    
    const {years, months, days} = userInput;

    const ErrStat:boolean = validateDate(days,months,years)

    if(ErrStat === false){
      console.log("Validation not passed.");
      return;
    } else {
      const tempResult = Counter(days,months,years);
      setResult({...tempResult})
    }

  }
  return (
    <section className="grid place-content-center min-h-screen">
      <div className="border-2 bg-white border-black rounded-t-[1rem] rounded-bl-[1rem] rounded-br-[8rem] m-auto w-[100%] grid py-4 px-5">
        <form onSubmit={handleSubmit} className="m-0 p-0">
          <div className="flex gap-1 justify-center ">
            <div className="flex flex-col p-[0.5rem] m-0 w-3/4">
              <label className="font-bold text-slate-400" htmlFor="inputDay">Day</label>
              <input onChange={handleChange} className="w-3/4 h-10 p-2 border rounded border-slate-300 font-bold text-slate-800" placeholder="DD"  type="number" id="inputDay" name="days" />
              <span className={error.days.color}>{error.days.text}</span>
            </div>
            <div className="flex flex-col p-[0.5rem] m-0 w-3/4">
              <label className="font-bold text-slate-400" htmlFor="inputMonth">Month</label>
              <input onChange={handleChange} className="w-3/4 h-10 p-2 border rounded border-slate-300 font-bold text-slate-800" placeholder="MM" type="number" id="inputMonth" name="months" />
              <span className={error.months.color}>{error.months.text}</span>
            </div>
            <div className="flex flex-col p-[0.5rem] m-0 w-3/4">
              <label className="font-bold text-slate-400" htmlFor="inputYear">Year</label>
              <input onChange={handleChange} className="w-3/4 h-10 p-2 border rounded border-slate-300 font-bold text-slate-800" placeholder="YYYY" type="number" id="inputYear" name="years" />
              <span className={error.years.color}>{error.years.text}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center my-1">
          <div className="w-[85%] h-[2px] bg-slate-200 p-0 m-0" />
          <button className="h-[50px] w-[50px] rounded-full text-slate-100 bg-purple-700 m-0 p-[0.05rem] text-sm" type="submit"> Submit </button>
          </div>
        </form>
        <div className="">
          <CounterAnimate text={"years"} initialValue={0} targetValue={result.years} />
          <CounterAnimate text={"months"} initialValue={0} targetValue={result.months} />
          <CounterAnimate text={"days"} initialValue={0} targetValue={result.days} />
        </div>
      </div>  
    </section>
  )
}

export default App
