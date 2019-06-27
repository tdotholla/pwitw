import Link from 'next/Link'
import fetch from 'isomorphic-unfetch'

const Pwit = (props) => (
<div>
    <ul>
    {
        props.result.map( (row) => (
            <li key={`${row.date_created}-${row.computer_name}`}>
            <div>{row.computer_name} {row.console_user} {row.ipv4_address}
            </div></li>
        ))
    }
    </ul>
</div>
)

Pwit.getInitialProps = async function ( {req}) {
    // const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    // const res = await fetch(baseUrl + '/api/test')
    const res = await fetch('http://localhost:7000/api/sql')
        .then(response => response.json())
        .then(json => json)

    const data = await res;

    console.log(`+++ FETCHED ${data.length} ITEMS`)
    return {
        result: data
    }
}

export default Pwit;