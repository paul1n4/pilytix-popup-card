import React from 'react'
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, Grid} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  var data = {
    labels: probHistory?.map( prob => prob.daysAgo),
    datasets: [
      {
        label: 'Pilytix Probability',
        data: probHistory?.map( prob => prob.pilytixProb),
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)'],
        borderWidth: 1
      },
      {
        label: 'Rep Probability',
        data: probHistory?.map( prob => prob.repProb),
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 159, 64, 1)'],
        borderWidth: 1
      }

    ]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <Dialog 
    open={open}
    onClose={()=> setOpen(false)}
    fullWidth
    maxWidth='lg'
    aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <DialogTitle id='dialog-title' align="center">{opportunityInfo.oppName}</DialogTitle>
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
          <Box sx={{ width: '100%' }}>
            <Typography align="center">Probability History</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={6}>
                <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 440 }}>
                  <Table stickyHeader sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Days Ago</TableCell>
                        <TableCell align="center">Pilytix Probability</TableCell>
                        <TableCell align="center">Rep Probability</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {probHistory?.reverse().map((row, index) => (
                        <StyledTableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">{row.daysAgo}</TableCell>
                          <TableCell align="center">{row.pilytixProb}</TableCell>
                          <TableCell align="center">{row.repProb}</TableCell>
                        </StyledTableRow>
                      )).reverse()}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <Bar
                  height={400}
                  data={data}
                  options={options}
                />
              </Grid>
            </Grid>
          </Box>
        ) 
        :(<Box sx={{ display: 'none'}}></Box>)}
      </DialogContent>
      <DialogActions>
        <Button onClick={()=> setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>

  )
}

export default DialogComponent