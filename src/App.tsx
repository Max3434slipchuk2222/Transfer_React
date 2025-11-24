import './App.css'
import {useEffect, useState} from "react";
interface Country {
    id: number;
    name: string;
    code: string;
    image: string;
}
function App() {
    const [data, setData] = useState<Country[]>([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const url = "http://localhost:5254/api/Countries";
        fetch(url)
            .then(response =>{ if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            return response.json(); })
            .then(responseData => {
                console.log("Server data:", responseData);
                setData(responseData);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setData([]);
            })
    },[]);
    if(error){
        console.log("error:", error);
    }
    return (
        <>
            <div className="card-grid-container">
                {data.map(item => (
                    <div key={item.id || item.name} className="card-wrapper">
                        <a
                            className="card h-[76mm]"
                            href={item.image ? `http://localhost:5254/images/${item.image}` : "#"}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <img
                                className="rounded-2xl"

                                src={`http://localhost:5254/images/${item.image}`}
                                alt={item.name}
                            />

                            <h1 className="relative text-xl font-bold mt-4 mb-2">{item.name}</h1>

                            <hr/>
                            <h2 className="relative text-base mt-2 font-bold"> {item.code}</h2>
                        </a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default App
