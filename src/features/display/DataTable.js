import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TableHeader from './TableHeader';
import { nanoid } from 'nanoid'
import Linear from './loading/Linear';




function descendingComparator(a, b, orderBy) {
     if (b[orderBy] < a[orderBy]) {
          return -1;
     }
     if (b[orderBy] > a[orderBy]) {
          return 1;
     }
     return 0;
}

function getComparator(order, orderBy) {
     return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
     const stabilizedThis = array.map((el, index) => [el, index]);
     stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
     });
     return stabilizedThis.map((el) => el[0]);
}


const useStyles = makeStyles((theme) => ({
     root: {
          width: '100%',
     },
     paper: {
          width: '100%',
          marginBottom: theme.spacing(1),
          marginTop: theme.spacing(2),
          backgroundColor: "#e6e6e6",
     },
     table: {
          maxWidth: '100%',
     },
     visuallyHidden: {
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          margin: -1,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          top: 20,
          width: 1,
     },

     container: {
          maxHeight: 380,
     },
     tableHeader: {
          fontSize: 16,
          fontWeight: 'bold'
     }
}));

function DataTable({ headCells, rows, showChkBox, rowSelected, loading, onSelectfx }) {
     const classes = useStyles();
     const [order, setOrder] = useState('asc');
     const [orderBy, setOrderBy] = useState('');
     const [selected, setSelected] = useState([]);
     const [page, setPage] = useState(0);
     const [rowsPerPage, setRowsPerPage] = useState(5);
     useEffect(() => {
          if (loading) {
               setSelected([])
          }
     }, [loading])
     const rowId = headCells.map((value) => value.id).filter((value, id) => id === 0)[0]

     const handleRequestSort = (event, property) => {
          const isAsc = orderBy === property && order === 'asc';
          setOrder(isAsc ? 'desc' : 'asc');
          setOrderBy(property);
     };

     const handleSelectAllClick = (event) => {
          if (event.target.checked) {
               const newSelecteds = rows.map((n) => n[rowId]);
               setSelected(newSelecteds);
               rowSelected(newSelecteds);
               return;
          }
          setSelected([]);
          rowSelected([]);
     };

     const handleClick = (event, name) => {
          const selectedIndex = selected.indexOf(name);
          let newSelected = [];


          if (selectedIndex === -1) {
               newSelected = newSelected.concat(selected, name);
          } else if (selectedIndex === 0) {
               newSelected = newSelected.concat(selected.slice(1));
          } else if (selectedIndex === selected.length - 1) {
               newSelected = newSelected.concat(selected.slice(0, -1));
          } else if (selectedIndex > 0) {
               newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
               );
          }
          setSelected(newSelected);
          rowSelected(newSelected);
          if (onSelectfx) {
               onSelectfx(newSelected)
          }


     };

     const handleChangePage = (event, newPage) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     const isSelected = (name) => selected.indexOf(name) !== -1;

     const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

     return (
          <div className={classes.root}>
               <Paper className={classes.paper}>
                    <TableContainer className={classes.container}>
                         <Linear loading={loading} />
                         <Table
                              className={classes.table}
                              aria-labelledby="tableTitle"
                              size='medium'
                              aria-label="enhanced table"
                         >
                              <TableHeader
                                   classes={classes}
                                   numSelected={selected.length}
                                   order={order}
                                   orderBy={orderBy}
                                   onSelectAllClick={handleSelectAllClick}
                                   onRequestSort={handleRequestSort}
                                   rowCount={rows.length}
                                   headCells={headCells}
                                   showChkBox={showChkBox}
                              />
                              <TableBody>
                                   {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                             const isItemSelected = isSelected(row[rowId]);
                                             const labelId = `enhanced-table-checkbox-${index}`;
                                             return (
                                                  <TableRow
                                                       hover
                                                       onClick={(event) => handleClick(event, row[rowId])}
                                                       role="checkbox"
                                                       aria-checked={isItemSelected}
                                                       tabIndex={-1}
                                                       key={row[rowId]}
                                                       selected={isItemSelected}
                                                  >
                                                       <TableCell
                                                            padding="checkbox"
                                                            style={{ display: showChkBox ? showChkBox : '' }}
                                                       >
                                                            <Checkbox
                                                                 checked={isItemSelected}
                                                                 inputProps={{ 'aria-labelledby': labelId }}
                                                            />

                                                       </TableCell>
                                                       {headCells.map(column => {
                                                            return (
                                                                 <TableCell
                                                                      key={nanoid()}
                                                                      style={!column.attribute ? { display: '' } : { display: 'none' }}
                                                                 >{row[column.id]}</TableCell>
                                                            )
                                                       })}

                                                  </TableRow>

                                             );
                                        })}
                                   {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                             <TableCell colSpan={6} />
                                        </TableRow>
                                   )}
                              </TableBody>
                         </Table>
                    </TableContainer>
                    <TablePagination
                         rowsPerPageOptions={[5, 10, 25, { label: 'All', value: rows.length }]}
                         component="div"
                         count={rows.length}
                         rowsPerPage={rowsPerPage}
                         page={page}
                         onChangePage={handleChangePage}
                         onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
               </Paper>

          </div>
     );
}

export default DataTable