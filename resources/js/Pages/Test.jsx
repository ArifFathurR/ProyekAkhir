// import { router } from "@inertiajs/react";
// import { useEffect, useState } from "react"

// export default function Test(data) {
//     const [tampil, setTampil] = useState(false);
//     const PindahHalaman = (e) => {
//         router.get(route('test.halaman2'));
//     }
//     useEffect(()=>{
//         console.log("render terjadi")
//     },[tampil]);
//     return (
//         <div className="flex flex-col my-64 bg-white p-6 rounded-lg shadow-md mx-auto w-2/4 text-center border border-gray-200">
//             {tampil == false ?
//                 <h1 className="text-2xl text-black ">Ini halaman testing Hello word</h1>
//                 : <h1 className="text-2xl text-black">Ini halaman testing Hello word {data.kata}</h1>

//             }
//             <div className="flex flex-row justify-center mt-3">
//                 <h1 className="p-2 mx-2 text-white bg-blue-400 rounded-md">SS</h1>
//                 <button onClick={()=> {setTampil(true)}} className="bg-blue-500 rounded-md shadow-lg hover:bg-blue-300 text-white px-14">Tampil</button>

//             </div>
//         </div>

//     )
// }
import { useEffect, useState } from "react";

export default function Test() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getUsers();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">
                Daftar User
            </h1>

            {users.map((user) => (
                <div
                    key={user.id}
                    className="border p-3 rounded mb-2"
                >
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            ))}
        </div>
    );
}