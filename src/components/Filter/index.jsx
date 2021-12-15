

import { Box, Button, Heading, Input } from "@dracula/dracula-ui";

//const mapaUrl = 'https://servicodados.ibge.gov.br/api/v1/censos/nomes/mapa?nome=';
const faixaUrl = 'https://servicodados.ibge.gov.br/api/v1/censos/nomes/faixa?nome=';
const basicaUrl = 'https://servicodados.ibge.gov.br/api/v1/censos/nomes/basica?nome=';

function Filter({ setData, setFaixa }) {

    async function renderiza(setData) {

        const nome = document.querySelector(".escreveNome").value
        const data = await (
            await fetch(basicaUrl + nome)
        ).json();
        setData(data);

        const faixa = await (
            await fetch(faixaUrl + nome)
        ).json();
        setFaixa(faixa);


    }

    return (
        <section>
            <label>
                    <Heading>Pesquise um nome</Heading>
                
                <Box>
                    <Input color="white" size="lg" placeholder="Um nome" m="xs" className="escreveNome" />
                </Box>
            </label>
            <Button color="purpleCyan" m="sm" onClick={async () => { await renderiza(setData) }}>
                Pesquisar
            </Button>
        </section>
    )
}

export default Filter;