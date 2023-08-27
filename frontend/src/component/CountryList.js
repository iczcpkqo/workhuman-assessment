import {Card, ListGroup} from "react-bootstrap";

/**
 * A component that renders a list of countries.
 *
 * @param {Array} dataCountries - The list data of countries to render.
 *
 * @returns {Element} a Countries list component with many country component.
 *
 * @author Sean
 * @date 24-08-2023
 */
function CountryList({dataCountries}) {

    /**
     * A function that renders the list of countries.
     *
     * @returns {Element} The rendered list of countries.
     */
    function ShowList() {
        return dataCountries.map((country, index ) =>
                <ListGroup.Item action className="text-primary"
                                key={index}
                                country-id={country.id}>{country.name}</ListGroup.Item>);
    }

    /**
     * A function that renders a no results message if there are no countries.
     *
     * @returns {Element} The rendered no results message.
     */
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
