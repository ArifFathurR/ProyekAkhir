import { useEffect, useMemo, useState } from "react"

export default function Test2 (){
    const [count, setCount] = useState();
    useEffect(()=> {
        console.log("render terjadi pada test 2")
    });

    // useMemo(()=>{
    //     console.log("data tetap di render karena tidak ada perubahan")
    // },[count])
    return (
        <div>
            <button onClick={()=>{setCount(count+1)}}>Tambah</button>
        </div>
    )
}