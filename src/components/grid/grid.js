import React from 'react';
import { request } from '../helper/helper';
import { Button, Row, Col } from 'react-bootstrap';
import './grid.css'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, {
    PaginationProvider, PaginationListStandalone,
    SizePerPageDropdownStandalone, PaginationTotalStandalone
} from 'react-bootstrap-table2-paginator';
import Loading from '../loading/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { isUndefined } from 'util';
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

export default class DataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: false,
            rows: [],
        };

        if (this.props.showEditButton && !this.existsColumn('Editar')) {
            this.props.columns.push(this.getEditButton());
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        request
            .get(this.props.url)
            .then((response) => {
                this.setState({ rows: response.data });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    existsColumn(colText) {
        let col = this.props.columns.find((column) => column.text === colText);
        return !isUndefined(col);
    }

    getEditButton() {
        return {
            text: 'Editar',
            formatter: function priceFormatter(cell, row) {
                // console.log(row);
                return (
                    <Button onClick={() => this.props.onClickEditButton(row)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                );
            },
        };
    }

    render() {

        const options = {
            custom: true,
            totalSize: this.state.rows.length
        };

        return (
            <ToolkitProvider
                keyField="pt"
                data={this.state.rows}
                columns={this.props.columns}
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
                                                data={this.state.rows}
                                                columns={this.props.columns}
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
        );
    }
}