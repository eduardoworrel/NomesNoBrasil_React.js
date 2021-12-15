import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Heading, Paragraph } from "@dracula/dracula-ui";
import { options } from "./help";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MontaGrafico(faixas){
  const labels = faixas.map(a=>a.faixa);
  
  const dados = {
     labels,
     datasets: [
       {
         label: "",
         data: faixas.map((a) => a.freq),
         borderColor: 'rgb(255, 99, 132)',
         backgroundColor: 'rgba(255, 99, 132, 0.5)',
       },
     ],
   };
  return <Line options={options} data={dados} />
}  


function Results({data,faixa}){
   
    if(data.length < 1){
        return (<></>)
    }
    const result = data[0];
    return ( 
     <>
             <Heading size="lg">
                <div>Existem <b>{result.freq}</b> pessoas chamadas {result.nome} no Brasil </div>
              </Heading>
              <Heading size="sm"> 
                Acompanhe as séries históricas deste nome
            
              </Heading>
            {MontaGrafico(faixa)}
        </>
    )

   
}
export default Results;