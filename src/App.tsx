import "./App.css"
import React from "react"
import axios from "axios"

export default function App() {
    const [data, setData] = React.useState<any>([])
    const [name, setName] = React.useState("")
    const [birth, setBirth] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
      const foo = () => {
        fetch("https://swapi.dev/api/people/")
            .then(res => res.json())
            .then(data => setData(data.results))
            .catch(error => console.log(error))
      }
      foo()
    }, [])

    // const foo = async () => {
    //     setLoading(true)
    //     try {
    //         const res = await axios.get("https://swapi.dev/api/people/")
    //         setData(res.data.results)
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // React.useEffect(() => {
    //     foo()
    // }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (name !== "" && birth !== "") {
            const obj = {
                name: name,
                birth_year: birth,
            }
            const res = [...data, obj]
            setData(res)
        }
    }

    if (loading === false) {
        return (
            <div className="App">
                <div style={{ marginBottom: "10px" }}>
                    {data.map((item: any, index: number) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <div style={{ marginRight: 10 }}>{item?.name}</div>
                            <div>{item.birth_year}</div>
                        </div>
                    ))}
                </div>

                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "0 auto",
                        width: 200,
                    }}
                    onSubmit={handleSubmit}
                >
                    <input
                        style={{ marginBottom: 10 }}
                        placeholder="Введите имя"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    ></input>
                    <input
                        style={{ marginBottom: 10 }}
                        placeholder="Введите дату"
                        type="text"
                        onChange={(e) => setBirth(e.target.value)}
                        value={birth}
                    ></input>

                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }

    return <div>loading...</div>
}

