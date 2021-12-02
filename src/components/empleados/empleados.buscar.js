import React from 'react';
import { request } from '../helper/helper';
import { Container, Row } from 'react-bootstrap';
import './empleados.css'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
//
// npm install react-bootstrap-table-next react-bootstrap-table2-toolkit react-bootstrap-table2-filter react-bootstrap-table2-editor react-bootstrap-table2-paginator --save

// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/getting-started.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-pagination.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-filter.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/toolkits-getting-started.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/exposed-api.html
//

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
                </Row>
                <Row>
                    <PaginationProvider
                        pagination={paginationFactory(options)}
                    >
                        {
                            ({
                                paginationProps,
                                paginationTableProps
                            }) => (
                                <div>
                                    <BootstrapTable
                                        keyField="id"
                                        data={products}
                                        columns={columns}
                                        {...paginationTableProps}
                                    />
                                    <PaginationListStandalone
                                        {...paginationProps}
                                    />
                                </div>
                            )
                        }
                    </PaginationProvider>
                </Row>
            </Container>
        );
    }
}