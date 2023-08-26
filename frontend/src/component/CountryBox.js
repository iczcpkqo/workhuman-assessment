import {Card, Col, FloatingLabel, Form, ListGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import CountryInput from "./CountryInput";
import CountryList from "./CountryList";
import ajax from "../api/ajax";

function CountryBox({selected}) {

    // const dataWholeCountries = loadCountries();
    // const [dataCountries, setDataCountries] = useState(dataWholeCountries);
    const [dataWholeCountries, setDataWholeCountries] = useState([]);
    const [dataCountries, setDataCountries] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searching, setSearching] = useState('');
    selected(() => {
        setIsLoaded(false);
    });

    useEffect(() => {
        console.log('ususususususus');
        if (!isLoaded) {
            console.log('ifififififif');
            initLoad();
        }
        return ()=>{
            setIsLoaded(true);
        };
    }, [isLoaded]);


    function initLoad() {
        loadCountries((countries) => {
            console.log('get into iniLoad');
            console.log(countries);
            setDataWholeCountries(countries);
            setDataCountries(countries.filter(country => country.name.toLowerCase().includes(searching.toLowerCase())));
        });
    }

    function onSearchChange(text) {
        setSearching(text);
        setDataCountries(dataWholeCountries.filter(country => country.name.toLowerCase().includes(text.toLowerCase())));
    }

    return (
        <Row className="justify-content-center">
            <Col xs={5}>
                <Card className="p-3 shadow-sm navbar-nav-scroll">
                    <Row>
                        <Col>
                            <CountryInput onSearchChange={onSearchChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CountryList dataCountries={dataCountries}/>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}


async function loadCountries(iniData) {
    console.log("ini Data ====== ");
    await ajax("api/countries", {}).then(e => {
        console.log("-- node list ajax body --");
        console.log(e.data);
        iniData(e.data);
    });
    // return T_dataCountries;
}


// async function loadCountries(extend, listType, operation, path, id) {
//     console.log("-- get node list --- ");
//
//     let nodes = []
//     await ajax("executeQuery",{queryID: "allchildren", subject: this.state.id}).then(e=>{
//         console.log("-- node list ajax body --");
//         for (let i in e.data){
//             console.log("--== node list ajax body node: " + i);
//             nodes.push( <Nodelist
//                 extend={extend}
//                 listType={listType}
//                 operation={operation}
//                 path={path}
//                 // onPathClick={this.state.listType === "window" ? (o) => this.onPathClick(o) : ""}
//                 onPathClick={(o)=>this.state.onPathClick(o) || ""}
//
//                 id={e.data[i]["object"]}
//                 predicate={e.data[i]["predicate"].split("#")[1]}
//                 type={e.data[i]["obj_type"].split("#")[1]}
//                 txt={e.data[i]["obj_name"]}/>);}});
//
//     nodes.length > this.state.maxShowChildren && ( nodes[this.state.maxShowChildren]=[
//         <Supernode amount={nodes.length - this.state.maxShowChildren}>
//             {nodes.splice(this.state.maxShowChildren, nodes.length - this.state.maxShowChildren)}
//         </Supernode>
//     ]);
//
//     this.setState({ list: nodes});
// }

export default CountryBox;

const T_dataCountries = [{id: 1, name: 'Albania'},
    {id: 2, name: 'Andorra'},
    {id: 3, name: 'Australia'},
    {id: 4, name: 'Brazil'},
    {id: 5, name: 'Belgium'},
    {id: 6, name: 'Canada'},
    {id: 7, name: 'China'},
    {id: 8, name: 'France'},
    {id: 9, name: 'Germany'},
    {id: 10, name: 'India'},
    {id: 11, name: 'Indonesia'},
    {id: 12, name: 'Ireland'},
    {id: 13, name: 'Italy'},
    {id: 14, name: 'Japan'},
    {id: 15, name: 'Kenya'},
    {id: 16, name: 'Luxembourg'},
    {id: 17, name: 'Mexico'},
    {id: 18, name: 'New Zealand'},
    {id: 19, name: 'Nigeria'},
    {id: 20, name: 'Portugal'},
    {id: 21, name: 'Russia'},
    {id: 22, name: 'South Africa'},
    {id: 23, name: 'South Korea'},
    {id: 24, name: 'Spain'},
    {id: 25, name: 'Sweden'},
    {id: 26, name: 'Thailand'},
    {id: 27, name: 'Ukraine'},
    {id: 28, name: 'United Kingdom'},
    {id: 29, name: 'United States of America'},
    {id: 30, name: 'Vietnam'},
    {id: 31, name: 'Zambia'}];


// •	Albania
// •	Andorra
// •	Australia
// •	Brazil
// •	Belgium
// •	Canada
// •	China
// •	France
// •	Germany
// •	India
// •	Indonesia
// •	Ireland
// •	Italy
// •	Japan
// •	Kenya
// •	Luxembourg
// •	Mexico
// •	New Zealand
// •	Nigeria
// •	Portugal
// •	Russia
// •	South Africa
// •	South Korea
// •	Spain
// •	Sweden
// •	Thailand
// •	Ukraine
// •	United Kingdom
// •	United States of America
// •	Vietnam
// •	Zambia
//


// [{id:1  , name:'Albania'},
//     {id:2  , name:'Andorra'},
//     {id:3  , name:'Australia'},
//     {id:4  , name:'Brazil'},
//     {id:5  , name:'Belgium'},
//     {id:6  , name:'Canada'},
//     {id:7  , name:'China'},
//     {id:8  , name:'France'},
//     {id:9  , name:'Germany'},
//     {id:10 , name:'India'},
//     {id:11 , name:'Indonesia'},
//     {id:12 , name:'Ireland'},
//     {id:13 , name:'Italy'},
//     {id:14 , name:'Japan'},
//     {id:15 , name:'Kenya'},
//     {id:16 , name:'Luxembourg'},
//     {id:17 , name:'Mexico'},
//     {id:18 , name:'New Zealand'},
//     {id:19 , name:'Nigeria'},
//     {id:20 , name:'Portugal'},
//     {id:21 , name:'Russia'},
//     {id:22 , name:'South Africa'},
//     {id:23 , name:'South Korea'},
//     {id:24 , name:'Spain'},
//     {id:25 , name:'Sweden'},
//     {id:26 , name:'Thailand'},
//     {id:27 , name:'Ukraine'},
//     {id:28 , name:'United Kingdom'},
//     {id:29 , name:'United States of America'},
//     {id:30 , name:'Vietnam'},
//     {id:31 , name:'Zambia'}]
