import React, { useEffect, useState } from 'react'
import { Grafico } from '../../components/Grafico'
import api from '../../service/covidApi'
import '../../global/styles.css';
import { Menu } from '../../components/Menu';
import Progress from '../../components/Progress';

export default function Covid() {

    const [casos, setCasos] = useState()
    const [searchResults, setSearchResults] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
            if(casos && searchTerm.trim() != ''){
                const results = casos.filter((each) =>
                    each.Date && each.Date.split("T")[0].includes(searchTerm)
                );
                console.log(results);
                setSearchResults(results)
            }
    }, [searchTerm])

    useEffect(() => {
        const getCovidData = async () =>{
          setLoading(true);
            try {
            const response = await api.get(`/dayone/country/brazil`);
            console.log(response.data);
            setCasos(response.data);
            setLoading(false);
            } catch (error) {
            console.log(error);
            }
        }
        getCovidData();
    }, [])
  

    return (
      <>
        <title>Covid</title>
        <main>
            { loading ?
           <Progress/>
            :
            <div style={{display: "flex", flexDirection: "row"}}> 
            
            <div> 
            {/* <div>
            <input type="date" onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div> */}
            <table className="table">
                <thead className="thead">
                  <tr>
                    <th>Data</th>
                    <th>Casos Totais</th>
                    <th>Novos Casos</th>
                    <th>Mortes Totais</th>
                    <th>Novas Mortes</th>
                  </tr>
                </thead>
                {casos && (searchResults ? <tbody>
                  {searchResults.map((each, i) => (
                    <tr key={each.Id}>
                        <td>{`${new Date(each.Date).toLocaleDateString('pt-br', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}`}</td>
                      <td>{each.Confirmed }</td>
                      <td>{each.Deaths}</td>
                    <td>{i == 0 ? each.Confirmed : casos[i].Confirmed - casos[i -1].Confirmed }</td>
                    </tr>
                  ))}
                </tbody> :
                <tbody>
                {casos.map((each, i) => (
                  <tr key={each.Id}>
                      <td>{`${new Date(each.Date).toLocaleDateString('pt-br', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}`}</td>
                      <td>{each.Confirmed }</td>
                    <td>{`+${i == 0 ? each.Confirmed : casos[i].Confirmed - casos[i -1].Confirmed}`}</td>
                    <td>{each.Deaths}</td>
                    <td>{`+${i == 0 ? each.Deaths : casos[i].Deaths - casos[i -1].Deaths}`}</td>
                  </tr>
                ))}
              </tbody>)
                }
              </table>
              </div>
            <div style={{display: "flex", flexDirection: "column"}}> 
              <div className="container-neo" id="container-grafico">
            <Grafico data={casos} value={"Confirmed"}/>
            </div>
            <div className="container-neo" id="container-grafico">
            <Grafico data={casos} value={"Deaths"}/>
            </div>
              </div>
              </div>}
        </main>
        </>
    )
}


       