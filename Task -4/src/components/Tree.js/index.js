import { useEffect, useState } from "react"

const Tree = ({ explorer }) => {
    console.log(explorer)
    const [expand, setExpand] = useState(false)
    if (explorer.items.length > 0) {
        return (
            <div >
                <div className={`wrapper ${expand ? 'show' : 'hide'}`} onClick={() => setExpand(!expand)}>{explorer.title}</div><br />
                <div style={{ display: expand ? "block" : "none"}} className="container">
                    {explorer.items.map((exp) => {
                        return <Tree explorer={exp} />
                    })}
                </div>
            </div>

        )
    }
    else {
        return <div className="wrapper">{explorer.title}</div>
    }
}
export default Tree