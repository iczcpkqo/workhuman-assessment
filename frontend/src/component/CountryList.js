import {Card, ListGroup} from "react-bootstrap";

function CountryList({dataCountries}) {
    return (
        <>
            <Card className="modal-dialog-scrollable overflow-auto" style={{maxHeight: 300}}>
                <ListGroup variant="flush">

                    {
                        dataCountries.map(country =>
                            <ListGroup.Item action className="text-primary"
                                            country-id={country.id}>{country.name}</ListGroup.Item>
                        )
                    }
                </ListGroup>

                {(() => {
                    if (dataCountries.length === 0)
                        return (<p className="p-4 pt-5"> <strong>Sorry, No results.</strong> </p>);
                })()}
            </Card>
        </>
    );
}


export default CountryList;
