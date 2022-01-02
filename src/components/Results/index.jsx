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
import { Heading, Box, Text, Divider } from "@dracula/dracula-ui";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Evolução ao longo das décadas',
    },
  },
};
function MontaGrafico(faixas) {
  const labels = faixas.map(a => a.faixa);

  const dados = {
    labels,
    datasets: [
      {
        label: "",
        data: faixas.map((a) => a.freq),
        borderColor: 'yellowgreen',
        backgroundColor: 'black',
      },
    ],
  };
  return <Line height={300} options={options} data={dados} />
}


function Results({ data, faixa }) {

  if (data.length < 1) {
    return (<></>)
  }
  const result = data[0];
  return (
    <>
      <Box className="" >
        <section className="dados">
          <Box color="cyan" display="" rounded="lg" p="xs" m="xs">
            <Heading>
              <Text color="black">
                {result.rank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}º em popularidade
              </Text>
            </Heading>
          </Box>
          <Box color="purpleCyan" display="" rounded="lg" p="xs" m="xs">
            <Heading>
              <Text color="black">
                São {result.freq.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {result.nome}'s no Brasil
              </Text>
            </Heading>
          </Box>
          <Box color="purpleCyan" display="" rounded="lg" p="xs" m="xs">
            <Heading>
              <Text color="black">
                Aproximadamete {result.percentual.toString().replace(".", ",")}% da população
              </Text>
            </Heading>
          </Box>
          <Box color="purple" rounded="lg" p="xs" m="xs">
            <Heading>
              <Text color="black">
                {result.ufMax} é o Estado com mais {result.nome}'s 
                ({parseFloat(result.ufMaxProp).toFixed(2).replace(".", ",")} a cada 100 mil habitantes)
              </Text>
            </Heading>
          </Box>
        </section>
        <br></br>
        <Divider/>
        <section className="grafico">
          <Heading p="xs" m="xs" size="xs">
            Acompanhe a evolução históricas deste nome
          </Heading>
          <Box p="xs" m="xs">
            {MontaGrafico(faixa)}
          </Box>
        </section>

      </Box>
    </>
  )


}
export default Results;