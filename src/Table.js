import {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, styled, Typography} from '@mui/material';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryStack} from 'victory';

import * as opportunities from "./opportunities.json";


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
    console.log(probabilityHistory);
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
              <Typography>
                <span>oppId: </span> {opportunityInfo.oppId}
              </Typography>
              <Typography>
                <span>oppName: </span> {opportunityInfo.oppName}
              </Typography>
              <Typography>
                <span>salesRepName: </span> {opportunityInfo.salesRepName}
              </Typography>
              <Typography>
                <span>amount: </span> {opportunityInfo.amount}
              </Typography>
              <Typography>
                <span>product: </span> {opportunityInfo.product}
              </Typography>
              <Typography>
                <span>stage: </span> {opportunityInfo.stage}
              </Typography>
              <Typography>
                <span>repProbability: </span> {opportunityInfo.repProbability}
              </Typography>
              <Typography>
                <span>pilytixTier: </span> {opportunityInfo.pilytixTier}
              </Typography>
              <Typography>
                <span>pilytixProbability: </span> {opportunityInfo.pilytixProbability}
              </Typography>
              <Typography>
                probabilityHistory:  
              </Typography>
             {/*  <VictoryChart>
                <VictoryGroup offset={20}>
                  <VictoryStack>
                    <VictoryBar
                    data={probHistory}
                    x="daysAgo"
                    y="pilytixProb"
                    />
                  </VictoryStack>
                  <VictoryStack>
                    <VictoryBar
                    data={probHistory}
                    x="daysAgo"
                    y="repProb"
                    />
                  </VictoryStack>
                  <VictoryStack>
                    <VictoryBar
                    data={probHistory}
                    x="daysAgo"
                    y="pilytixProb"
                    />
                  </VictoryStack>
                </VictoryGroup>
              </VictoryChart> */}
              <VictoryBar
                data={probHistory}
                x="daysAgo"
                y="pilytixProb"
              />
              <Typography>
                {probHistory.map(probability => 
                  <Typography>{probability.daysAgo}</Typography>
                )}
              </Typography>
              <Typography>
                <span>pilytixFactorsIncreasingWin: </span> 
              </Typography>
              <Typography>
                <span>pilytixFactorsDecreasingWin: </span> 
              </Typography>
              
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
