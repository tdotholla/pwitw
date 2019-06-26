import Link from 'next/Link'
import fetch from 'isomorphic-unfetch'

const Pwit = (props) => (
<div>
    {
        props.result.map( (row) => (
            <div key={row.id}>{row.title}</div>
        ))
    }
</div>
)

Pwit.getInitialProps = async function ( {req}) {
    // const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    // const res = await fetch(baseUrl + '/api/test')
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => json)

    const data = await res;

    console.log(`+++ FETCHED ${data.length} ITEMS`)

    return {
        result: data
    }
}

export default Pwit;