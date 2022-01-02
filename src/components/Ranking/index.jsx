import { Heading, Button, Text, Box, Badge, Divider} from "@dracula/dracula-ui";
import { useEffect, useState } from "react";


const basicaUrl = "https://servicodados.ibge.gov.br/api/v1/censos/nomes/ranking?qtd=10"
const Ranking = ({renderiza})=>{
    
   
    const [list,setList] = useState([]);

    const load = ()=>{
        fetch(basicaUrl).then(a => a.json()).then((a)=>{
            setList(a)
        });
    }
    useEffect(load,[]);
    
    return (
        
        <>
            <Heading p="sm">
                TOP 10 BRASIL
            </Heading>
           
            {list.map((i,c)=> 
          
                <Heading size="lg" p="md">
                <b>{i.rank}º</b> {i.nome} <div className="bag">
                    {i.freq.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} HABITANTES  <Button color="purpleCyan" onClick={async () => {  await renderiza(i.nome) }}>
                            ...
                    </Button>
                </div>
                </Heading>
           
            )}
           
        </>
    )
}
export default Ranking