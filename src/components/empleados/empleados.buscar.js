import React from 'react';
import { request } from '../helper/helper';
import { Container, Row, Col } from 'react-bootstrap';
import './empleados.css'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory,
{
    PaginationProvider, PaginationListStandalone,
    SizePerPageDropdownStandalone, PaginationTotalStandalone
}
    from 'react-bootstrap-table2-paginator';
//
// npm install react-bootstrap-table-next react-bootstrap-table2-toolkit react-bootstrap-table2-filter react-bootstrap-table2-editor react-bootstrap-table2-paginator --save

// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/getting-started.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-pagination.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-filter.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-search.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/toolkits-getting-started.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/exposed-api.html
//
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Welcome&selectedStory=react%20bootstrap%20table%202%20&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
//

const { SearchBar, ClearSearchButton } = Search;

const products = [
    {
        id: 1,
        name: 'Producto 1',
        price: 1000,
        category: 'Dairy'
    },
    {
        id: 2,
        name: 'Producto 2',
        price: 2000,
        category: 'Meats'
    },
];

const columns = [{
    dataField: 'id',
    text: 'Product ID'
}, {
    dataField: 'name',
    text: 'Product Name'

}, {
    dataField: 'price',
    text: 'Product Price'
}, {
    dataField: 'category',
    text: 'Category',
    sort: true
}];

// export default () =>
//     <BootstrapTable
//         keyField='id'
//         data={products}
//         columns={columns} />

export default class EmpleadosBuscar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        request
            .get('/empleados')
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {

        const options = {
            custom: true,
            totalSize: products.length
        };

        return (
            <Container id="empleados-buscar-container">
                <Row>
                    <h1>Buscar Empleados</h1>
                    <hr />
                </Row>
                <Row>
                    <ToolkitProvider
                        keyField="pt"
                        data={products}
                        columns={columns}
                        search
                    >
                        {
                            props => (
                                <>
                                    <PaginationProvider
                                        pagination={paginationFactory(options)}
                                    >
                                        {
                                            ({
                                                paginationProps,
                                                paginationTableProps
                                            }) => (
                                                <>
                                                    <Row>
                                                        <Col>
                                                            <SizePerPageDropdownStandalone
                                                                {...paginationProps}
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <SearchBar {...props.searchProps} />
                                                            <ClearSearchButton {...props.searchProps} />
                                                        </Col>
                                                    </Row>
                                                    <BootstrapTable
                                                        keyField="bt"
                                                        data={products}
                                                        columns={columns}
                                                        {...paginationTableProps}
                                                        {...props.baseProps}
                                                    />
                                                    <PaginationTotalStandalone
                                                        {...paginationProps}
                                                    />
                                                    <PaginationListStandalone
                                                        {...paginationProps}
                                                    />
                                                </>
                                            )
                                        }
                                    </PaginationProvider>
                                </>
                            )
                        }
                    </ToolkitProvider>
                </Row>
            </Container>
        );
    }
}