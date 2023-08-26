import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import CountryBox from "./component/CountryBox";
import InitData from "./component/InitData";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import React from "react";


function App() {

    let tabSearch;

    function selected(ex) {
        tabSearch = ex;
    }

    return (
        <Tabs
            defaultActiveKey="countries"
            id="fill-tab-example"
            className="mb-0 border-primary"
            fill
            onSelect={(k) => {
                if (k === 'countries')
                    tabSearch();
            }}
        >
            <Tab eventKey="countries" title="Countries"
            >
                <div className="App">
                    <main>
                        <Container xs={5} className="mt-5">
                            <CountryBox selected={selected}/>
                        </Container>
                    </main>
                </div>
            </Tab>
            <Tab eventKey="ini" title="Initialize Data">
                <InitData/>
            </Tab>
        </Tabs>
    )
        ;
}

export default App;
