import React from 'react'
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled} from '@mui/material';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryStack} from 'victory';

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

function DialogComponent({open, setOpen, opportunityInfo, probHistory, increasingWin, decreasingWin}) {

  return (
    <Dialog 
    open={open}
    onClose={()=> setOpen(false)}
    fullWidth
    maxWidth='lg'
    aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <DialogTitle id='dialog-title' align="center">Opp Id: {opportunityInfo.oppId}</DialogTitle>
      <DialogContent>
        <Box>
          <TableContainer component={Paper} sx={{ mb: 9 }}>
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
              <StyledTableRow>
                <TableCell component="th" scope="row">{opportunityInfo.oppName}</TableCell>
                <TableCell align="left">{opportunityInfo.stage}</TableCell>
                <TableCell align="right">{opportunityInfo.repProbability}</TableCell>
                <TableCell align="right">{opportunityInfo.pilytixProbability}</TableCell>
                <TableCell align="left">{opportunityInfo.pilytixTier}</TableCell>
                <TableCell align="right">{opportunityInfo.amount}</TableCell>
                <TableCell align="left">{opportunityInfo.product}</TableCell>
                <TableCell align="left">{opportunityInfo.salesRepName}</TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          </TableContainer>
        </Box>

        {increasingWin ? (
          <Box>
            <Typography align="center">Pilytix Factors Increasing Win</Typography>
            <TableContainer component={Paper} sx={{ mb: 9 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" colSpan={1}>Name</TableCell>
                    <TableCell align="left" colSpan={1}>Message</TableCell>
                    <TableCell align="center" colSpan={2}>Weight</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center">Value</TableCell>
                    <TableCell align="left">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {increasingWin?.map(({ name, message, weight: { description, value}}, index) => (
                    <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{name}</TableCell>
                      <TableCell align="left">{message}</TableCell>
                      <TableCell align="center">{value}</TableCell>
                      <TableCell align="left">{description}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) 
        :(<Box sx={{ display: 'none'}}></Box>)}
        
        {decreasingWin ? (
          <Box>
            <Typography align="center">Pilytix Factors Decreasing Win</Typography>
            <TableContainer component={Paper} sx={{ mb: 9 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" colSpan={1}>Name</TableCell>
                    <TableCell align="left" colSpan={1}>Message</TableCell>
                    <TableCell align="center" colSpan={2}>Weight</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center">Value</TableCell>
                    <TableCell align="left">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {decreasingWin?.map(({ name, message, weight: { description, value}}, index) => (
                    <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                    >
                      <TableCell component="th" scope="row">{name}</TableCell>
                      <TableCell align="left">{message}</TableCell>
                      <TableCell align="center">{value}</TableCell>
                      <TableCell align="left">{description}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) 
        :(<Box sx={{ display: 'none'}}></Box>)}

        {probHistory ? (
          <Box>
            <Typography align="center">Probability History</Typography>
            <TableContainer component={Paper} sx={{ mb: 2, maxWidth: 450 }}>
              <Table sx={{ maxWidth: 450 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Days Ago</TableCell>
                    <TableCell align="center">Pilytix Probability</TableCell>
                    <TableCell align="center">Rep Probability</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {probHistory?.map((row, index) => (
                    <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.daysAgo}</TableCell>
                      <TableCell align="center">{row.pilytixProb}</TableCell>
                      <TableCell align="center">{row.repProb}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) 
        :(<Box sx={{ display: 'none'}}></Box>)}
        
        
        {/* <VictoryChart domainPadding={{ x: 50 }} width={400} height={400}>
          <VictoryGroup offset={10} style={{ data: { width: 15 } }}>
            <VictoryStack>
              
              <VictoryBar
                data={probHistory}
                x={probHistory.daysAgo}
                y={probHistory.pilytixProb}
              />
            </VictoryStack>
          </VictoryGroup>
        </VictoryChart> */}
        

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
      </DialogContent>
      <DialogActions>
        <Button onClick={()=> setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>

  )
}

export default DialogComponent