import {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material';


import * as opportunities from "./opportunities.json";
import DialogComponent from "./components/DialogComponent";


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F9FAFE',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  'td, th': {
    border: 0,
    color: '#838FA8'
  },
}));

export default function BasicTable() {
  const [open, setOpen] = useState(false)
  const [opportunityInfo, setOpportunityInfo] = useState({})
  const [probHistory, setProbHistory] = useState([])
  const [increasingWin, setIncreasingWin] = useState([])
  const [decreasingWin, setDecreasingWin] = useState([])
  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;

  function handleRowClick(event, row) {
    
    setOpen(true);
    setOpportunityInfo(row)
    console.log("row", row);
    const probabilityHistory = row.probabilityHistory
    setProbHistory(probabilityHistory)
    const factorsIncreasingWin = row.pilytixFactorsIncreasingWin
    setIncreasingWin(factorsIncreasingWin)
    const factorsDecreasingWin = row.pilytixFactorsDecreasingWin
    setDecreasingWin(factorsDecreasingWin)
  }

  return (
    <TableContainer component={Paper} >
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
              <TableCell component="th" scope="row">{row.oppName}</TableCell>
              <TableCell align="left">{row.stage}</TableCell>
              <TableCell align="right">{row.repProbability}</TableCell>
              <TableCell align="right">{row.pilytixProbability}</TableCell>
              <TableCell align="left">{row.pilytixTier}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="left">{row.product}</TableCell>
              <TableCell align="left">{row.salesRepName}</TableCell>
            </StyledTableRow>
          ))}
          <DialogComponent 
            open={open}
            setOpen={setOpen}
            opportunityInfo={opportunityInfo}
            probHistory={probHistory}
            increasingWin={increasingWin}
            decreasingWin={decreasingWin}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
