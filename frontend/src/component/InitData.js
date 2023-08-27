import {Button, ButtonGroup, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import ajax from "../api/ajax";
import Alert from 'react-bootstrap/Alert';


function CountryBox() {

    const [dataWholeCountries, setDataWholeCountries] = useState(getSessionCountries());
    const [isShowApply, setIsShowApply] = useState(false);
    const [isShowDelete, setIsShowDelete] = useState(false);
    const [isShowReload, setIsShowReload] = useState(false);
    const [isHiddenReload, setIsHiddenReload] = useState(true);

    function onApply() {
        deleteCountries().then((response)=>{
            console.log('Deleted Countries:' + response);
        }).catch((error)=>{
            console.log('== Error == : Delete Failed | error-initdata-onapply-deletecountries');
            console.log(error);
        });
        onInsert();
        setIsShowApply(true);
        setTimeout(()=>{
            setIsShowApply(false);
        },3000)
    }

    function onInsert() {
        // console.log(dataWholeCountries);
        dataWholeCountries.forEach((country) => {
            insertCountry(country.name);
        });
    }

    function onLoadData() {
        setDataWholeCountries(getSessionCountries());
    }

    async function insertCountry(countryName) {
        console.log("Insert New Whole Countries");
        await ajax("api/insert/countries", {name: countryName}, 'POST').then(e => {
            console.log("Inserted : ");
            console.log(e.data);
        }).catch((error)=>{
            console.log("= Error = Insert Country : " + error);
        });
    }

    function onClear() {
        deleteCountries();
        setDataWholeCountries([]);
        setIsShowDelete(true);
        setTimeout(()=>{
            setIsShowDelete(false);
            setIsHiddenReload(false);
        },3000)
    }

    async function deleteCountries() {
        await ajax("api/delete", {}, 'DELETE').then(e => {
            console.log("Deleted: Countries: ");
            console.log(e.data);
        }).catch((error)=>{
            console.log("= Error = Delete Countries : " + error);
            console.log(error);
        });
    }

    function onReload(){
        setDataWholeCountries([...getSessionCountries()]);
        setIsShowReload(true);
        setIsHiddenReload(false);
        setTimeout(()=>{
            setIsShowReload(false);
            setIsHiddenReload(true);
        },3000)
    }


    return (

        <div className="App">
            <main>
                <Container xs={5} className="mt-5">
                    <Row className="justify-content-center">
                        <Col xs={5}>
                            <Card className="p-3 shadow-sm ">
                                <Row>
                                    <Col>
                                        <Form.Label htmlFor="datacountries"
                                                    className="text-primary mb-3">Countries</Form.Label>
                                        <Form.Control id="datacountries"
                                                      as="textarea" rows={10}
                                                      value={(() => {
                                                          return dataWholeCountries.map((o) => {
                                                              return o.name;
                                                          }).join('\n');
                                                      })()}
                                                      onChange={(e) => {
                                                          // console.log(e.target.value.split(/\r?\n/));
                                                          setDataWholeCountries(
                                                              e.target.value.split(/\r?\n/).map((item) => {
                                                                  return {name: item}
                                                              }));
                                                      }}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row className="mt-3 mb-3">
                                            <ButtonGroup>
                                                {/*<Button variant="outline-success" className="w-50" onClick={onInsert}>Load Data</Button>*/}
                                                <Button variant="primary" className="w-50"
                                                        onClick={onApply}>Apply</Button>
                                            </ButtonGroup>
                                        </Row>
                                        <Row>

                                            <ButtonGroup>
                                                <Button hidden={!isHiddenReload} variant="danger" className="w-50" onClick={onClear}>Delete
                                                    Data</Button>

                                                <Button hidden={isHiddenReload} variant="success" className="w-50" onClick={onReload}>Reload Data
                                                </Button>
                                            </ButtonGroup>

                                        </Row>

                                        <Alert key="primary" variant="primary" className="mt-3"
                                               show={isShowApply}>
                                            The above data has been applied.
                                        </Alert>

                                        <Alert key="danger" variant="danger" className="mt-3"
                                               show={isShowDelete}>
                                            All data has been deleted.
                                        </Alert>

                                        <Alert key="success" variant="success" className="mt-3"
                                               show={isShowReload}>
                                            Data has been reloaded. You Could <strong>Apply</strong> now.
                                        </Alert>


                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    )
        ;
}


async function loadCountries(iniData) {
    console.log("ini Data ====== ");
    await ajax("api/testing/select", {}).then(e => {
        console.log("-- node list ajax body --");
        console.log(e.data);
        iniData(e.data);
    });
    // return T_dataCountries;
}

export default CountryBox;

window.sessionStorage.setItem("sessionCountries", JSON.stringify( [{id: 1, name: 'Albania'},
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
        {id: 31, name: 'Zambia'}]));

function getSessionCountries(){
    return JSON.parse(window.sessionStorage.getItem("sessionCountries"));
}
