import { useEffect, useState } from "react"

type ComponentProps = {
    text:string;
    initialValue:number;
    targetValue:number,
}
export default function CounterAnimate({text,initialValue,targetValue}:ComponentProps){
    const [count, setCount] = useState<number>(initialValue);
    const duration = 450;

    useEffect(() => {
        let startingVal = initialValue;

        const interval = Math.floor(duration/ (targetValue - initialValue))

        const counter = setInterval(() => {
            startingVal += 1;
            setCount(startingVal);
            if(startingVal >= targetValue){
                clearInterval(counter);
            }
        },interval + count);

        return () => {
            clearInterval(counter);
        };

    },[targetValue,initialValue]);

    return(
        <h2 className="font-bold italic text-7xl my-1 mx-0"><span className="text-purple-700 mr-[0.75rem]">{count === 1 ? '--' : count}</span>{text}</h2>
    );
}