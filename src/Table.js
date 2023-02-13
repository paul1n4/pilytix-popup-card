import {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, styled} from '@mui/material';

import * as opportunities from "./opportunities.json";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function BasicTable() {
  const [open, setOpen] = useState(false)
  const [opportunityInfo, setOpportunityInfo] = useState({})
  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;

  function handleRowClick(event, row) {
    setOpen(true);
    setOpportunityInfo(row)
    console.log("row", row);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Opp Name</TableCell>
            <TableCell align="left">Opp Stage</TableCell>
            <TableCell align="right">Rep Probability</TableCell>
            <TableCell align="right">PX Probability</TableCell>
            <TableCell align="left">PX Tier</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Sales Rep</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            
            <StyledTableRow
              onClick={(event) => handleRowClick(event, row)}
              key={row.oppId}
              hover
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              
              <TableCell component="th" scope="row">
                {row.oppName}
              </TableCell>
              <TableCell align="left">{row.stage}</TableCell>
              <TableCell align="right">{row.repProbability}</TableCell>
              <TableCell align="right">{row.pilytixProbability}</TableCell>
              <TableCell align="left">{row.pilytixTier}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="left">{row.product}</TableCell>
              <TableCell align="left">{row.salesRepName}</TableCell>
              
            </StyledTableRow>
            
          ))}
          <Dialog 
          open={open}
          onClose={()=> setOpen(false)}
          aria-labelledby="dialog-title" aria-describedby="dialog-description">
            <DialogTitle id='dialog-title'>dfghj</DialogTitle>
            <DialogContent>
              <DialogContentText id='dialog-description'>lorem ipsum</DialogContentText>
              <DialogContentText id='dialog-description'>{opportunityInfo.oppName}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=> setOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </TableBody>
        
      </Table>
    </TableContainer>
  );
}
