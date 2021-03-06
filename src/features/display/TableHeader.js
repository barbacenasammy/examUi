import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';


function TableHeader(props) {
     const { classes,
          onSelectAllClick,
          order,
          orderBy,
          numSelected,
          rowCount,
          onRequestSort,
          headCells, showChkBox } = props;

     const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
     };

     return (
          <TableHead>
               <TableRow>
                    <TableCell
                         padding="checkbox"
                         style={{ display: showChkBox ? showChkBox : '' }}>
                         <Checkbox
                              indeterminate={numSelected > 0 && numSelected < rowCount}
                              checked={rowCount > 0 && numSelected === rowCount}
                              onChange={onSelectAllClick}
                              inputProps={{ 'aria-label': 'select all desserts' }}
                         />
                    </TableCell>
                    {headCells.map((headCell) => (
                         < TableCell
                              key={headCell.id}
                              align='left'
                              padding='default'
                              sortDirection={orderBy === headCell.id ? order : false}
                              style={!headCell.attribute ? { display: '' } : { display: 'none' }}
                         >
                              <TableSortLabel
                                   active={orderBy === headCell.id}
                                   direction={orderBy === headCell.id ? order : 'asc'}
                                   onClick={createSortHandler(headCell.id)}
                                   className={classes.tableHeader}
                              >
                                   {headCell.label}
                                   {/* {headCell.label} */}

                                   {orderBy === headCell.id ? (
                                        <span className={classes.visuallyHidden} >
                                             {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                   ) : null}
                              </TableSortLabel>
                         </TableCell>
                    ))}
               </TableRow>
          </TableHead >
     );
}

TableHeader.propTypes = {
     classes: PropTypes.object.isRequired,
     numSelected: PropTypes.number.isRequired,
     onRequestSort: PropTypes.func.isRequired,
     onSelectAllClick: PropTypes.func.isRequired,
     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
     orderBy: PropTypes.string.isRequired,
     rowCount: PropTypes.number.isRequired,
};

export default TableHeader