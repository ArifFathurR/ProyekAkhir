import { Button } from "@/Components/ui/button";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TestComponent from "./TestCompoenent";

export default function Test3({ data }) {
const [modal, setModal] = useState(false);
const [data1, setData1] = useState(data);
const handlePopup = ()=> {
    setModal(true)
}

    return (
        <>
            <div>
                <button className="bg-gray-500 rounded-lg p-4 hover:bg-white" onClick={handlePopup}>Show Pop up</button>
                 <TestComponent
                 isOpen={modal}
                 isClose={()=>{setModal(false)}}
                 data={data1}
                 />
                {data.map((id) => (
                    <div>
                        <h1>Nama: {id.nama}</h1>
                        <h1>Kelas: {id.kelas}</h1>
                        <h1>Nim: {id.nim}</h1>
                    </div>

                ))}

            </div>
        </>
    );
}