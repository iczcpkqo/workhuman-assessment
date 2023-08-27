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
    function selected(func) {
        tabSearch = func;
    }
    function debounce(delay) {
        let timer;
        return function(...args) {
            if (args[0] !== 'countries') return;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                tabSearch(...args);
                timer = null;
            }, delay);
        };
    }

    return (
        <Tabs
            defaultActiveKey="countries"
            id="fill-tab-example"
            className="mb-0 border-primary"
            // fill
            onSelect={debounce(300)}
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
