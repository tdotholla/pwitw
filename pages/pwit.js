import Link from 'next/Link'
import fetch from 'isomorphic-unfetch'
import StatsTable from '../client/components/Map/StatsTable'
import BuildGraph from '../client/components/Graph/BuildGraph'
import url from 'url';
const Pwit = ({data}) => (
<div>
    {
    data ? (
        <div>
    <BuildGraph data ={data} />
    <StatsTable data={data} />
    </div>
    ) : (
       <div> LOADING...</div>
    )
    }
</div>
)

Pwit.getInitialProps = async function ( {req, path}) {
    
    let search = url.parse(req.url, true).search || ''
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const fetchUrl = `${baseUrl}/api/sql${search}`

    const res = await fetch(fetchUrl)
        .then(response => response.json())
        .then(json => json)

    const data = await res;

    console.log(`+++ FETCHED ${data.length} ITEMS +++`)
    return {
        data: data
    }
}

export default Pwit;