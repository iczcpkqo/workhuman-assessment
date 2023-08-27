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
        return () => {
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

    function fallback(name) {
        return (<p className="p-4 pt-5"><strong>Sorry, Error in the {name} component.</strong></p>);
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


export default CountryBox;
