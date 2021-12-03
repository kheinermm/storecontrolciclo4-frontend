import React from 'react';
// import { request } from '../helper/helper';
import { Container, Row, Col } from 'react-bootstrap';
import '../empleados.css'
import DataGrid from '../../grid/grid';

const columns = [{
    dataField: '_id',
    text: 'ID',
    hidden: true,
}, {
    dataField: 'codigo',
    text: 'Codigo Producto',
    sort: true,
}, {
    dataField: 'nombre',
    text: 'Nombre Producto',
    sort: true,
}, {
    dataField: 'categoria',
    text: 'Categoria',
    sort: true,
}, {
    dataField: 'precio',
    text: 'Precio',
}, {
    dataField: 'cantidad',
    text: 'Cantidad',
}, {
    dataField: 'stockMinimo',
    text: 'Stock Minimo',
}];

export default class EmpleadosBuscar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.onClickEditButton = this.onClickEditButton.bind(this);
    }

    onClickEditButton(row) {
        this.props.showIdEmpleado(row._id)
        this.props.changeTab('editar');
    }

    render() {
        return (
            <Container id="empleados-buscar-container">
                <Row>
                    <h1>Buscar Empleados</h1>
                    <hr />
                </Row>
                <Row>
                    <DataGrid
                        url="/empleados"
                        columns={columns}
                        showEditButton={true}
                        onClickEditButton={this.onClickEditButton}
                    />
                </Row>
            </Container>
        );
    }
}