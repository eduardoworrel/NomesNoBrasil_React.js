import { Box, Button, Heading, Input, List, Divider,Anchor } from "@dracula/dracula-ui";
import { useState } from "react";

import Ranking from "../Ranking";

const faixaUrl = 'https://servicodados.ibge.gov.br/api/v1/censos/nomes/faixa?nome=';
const basicaUrl = 'https://servicodados.ibge.gov.br/api/v1/censos/nomes/basica?nome=';

function Filter({ setData, setFaixa }) {


    const [nome, setName] = useState("");
    const [finding, setFinding] = useState(false);
    const [findResult, setFindResult] = useState(false);
    const [inFocus, setInFocus] = useState(false);

    function reset() {
        setName("");
        setFinding(false);
        setFindResult(false);
        setData([]);
        setFaixa([]);
        setInFocus(false);
    }

    async function renderiza(custom) {
        if (!nome && !custom) {
            alert("Digite um nome");
            return;
        }
        if(custom){
            setName(custom)
        }
        setFinding(true);
        try {
            const data = await (
                await fetch(basicaUrl + (custom ? custom : nome))
            ).json();
            const faixa = await (
                await fetch(faixaUrl + (custom ? custom : nome))
            ).json();

          
          
            setFinding(false);
            setFaixa(faixa);
            setData(data);
            setFindResult(true);
        } catch (err) {
            setFinding(false);
            alert("Não foi possível encontrar o nome");
            setName("");
        }
    }
  
  
    return (
        <section>

            <Heading p="sm">Nomes no Brasil e suas evoluções ao decorrer das decadas!</Heading>
            <Heading size="sm" className="centered">Pesquise um nome</Heading>
            <Box className="flex-cotainer">
                <section className="inputName" >
                    <Input
                        value={nome}
                        disabled={finding || findResult}
                      
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setInFocus(true)}
                        onBlur={() => setInFocus(false)}
                        color="white" placeholder="Um nome" m="xs"
                    />
                </section>
                <section className="inputButton" >
                    {!findResult && !finding &&
                        <Button color="purpleCyan" m="sm" onClick={async () => { await renderiza() }}>
                            Pesquisar
                        </Button>
                    }
                    {(findResult) &&
                        <Button color="cyanGreen" m="sm" onClick={async () => { reset() }}>
                            Resetar
                        </Button>
                    }
                    {( finding) &&
                        <Button color="cyanGreen" m="sm" onClick={async () => { reset() }}>
                            ...
                        </Button>
                    }
                </section>
            </Box>
            {
                inFocus ?
                <section>
                <List variant="unordered" color="purple">
                    <li className="drac-text drac-text-white">
                        Nomes parecidos são considerados isoladamente</li>
                    <li className="drac-text drac-text-white">Não é considerado acentos, cedilha, trema e til</li>
                    <li className="drac-text drac-text-white">Fonte: IBGE, Censo Demográfico 2010.</li>
                </List>

                <Divider/>
            </section>
            :
                <section>
                <List variant="unordered" color="purple">
                    <li className="drac-text drac-text-white">
                       Desenvolvido por <Anchor href="https://eduardoworrel.com" color="cyanGreen" hoverColor="yellowPink" mb="sm">
                       Eduardo Worrel
                    </Anchor>
                        </li>
                    <li className="drac-text drac-text-white">Disponível em <Anchor href="https://github.com/eduardoworrel/NomesNoBrasil_React.js" color="cyanGreen" hoverColor="yellowPink" mb="sm">
                    Github
                    </Anchor>
                    </li>
                    <li className="drac-text drac-text-white">Fonte: IBGE, Censo Demográfico 2010.</li>
                </List>

                <Divider/>
            </section>
            }
           
            {
            !finding && !findResult ? 
            <Ranking renderiza={renderiza}/>
            : <></>
            }
        </section>
        
    )
}

export default Filter;