import {Card, ListGroup} from "react-bootstrap";

function CountryList({dataCountries}) {
    function ShowList() {
        return dataCountries.map((country, index ) =>
                <ListGroup.Item action className="text-primary"
                                key={index}
                                country-id={country.id}>{country.name}</ListGroup.Item>);
    }

    function NoReault(){
        if (dataCountries.length === 0)
            return (<p className="p-4 pt-5"><strong>Sorry, No results.</strong></p>);
    }

    return (
        <>
            <Card className="modal-dialog-scrollable overflow-auto" style={{maxHeight: 300}}>
                <ListGroup variant="flush">
                    <ShowList/>
                </ListGroup>
                    <NoReault/>
            </Card>
        </>
    );
}


export default CountryList;
