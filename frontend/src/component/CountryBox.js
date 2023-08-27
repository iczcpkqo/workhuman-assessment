import {Card, Col, FloatingLabel, Form, ListGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import CountryInput from "./CountryInput";
import CountryList from "./CountryList";
import ajax from "../api/ajax";

function CountryBox({selected}) {

    const [dataWholeCountries, setDataWholeCountries] = useState([]);
    const [dataCountries, setDataCountries] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searching, setSearching] = useState('');
    selected(() => {
        setIsLoaded(false);
    });

    useEffect(() => {
        if (!isLoaded) {
            initLoad();
        }
        return () => {
            setIsLoaded(true);
        };
    }, [isLoaded]);


    function initLoad() {
        loadCountries((countries) => {
            setDataWholeCountries(countries);
            setDataCountries(countries.filter(country => country.name.toLowerCase().includes(searching.toLowerCase())));
        }).then((response) => {
            console.log('InitLoad Countries: ' + response);
        }).catch((error) => {
            console.log(error);
            setTimeout(() => {
                setIsLoaded(false);
            }, 3000);
        });
    }

    function onSearchChange(text) {

        if (text === '') {
            initLoad()
        } else {
            setSearching(text);
            setDataCountries(dataWholeCountries.filter(country => country.name.toLowerCase().includes(text.toLowerCase())));
        }
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
    await ajax("api/countries", {}).then(e => {
        console.log("Got ALL Countries: ");
        console.log(e.data);
        iniData(e.data);
    }).catch((error) => {
        console.log("= ERROR = Can NOT get ALL countries");
        console.log(error);
    });
}

export default CountryBox;
