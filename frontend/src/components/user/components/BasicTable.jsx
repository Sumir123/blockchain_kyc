import React,{useContext} from 'react';
import { TransactionContext } from "../../../context/TransactionContext";
import { Button, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// const banks = [
//   'Rastriya Banijya Bank',
//   'NIC Asia Bank',
//   'NMB Bank',
//   'Mega Bank Nepal'
// ];

const BasicTable = (props) => {
  const {addBankAccess} = useContext(TransactionContext);

  const handleClick=async(bankAddress)=>{
    // console.log(bankAddress)
    await addBankAccess(bankAddress);

  }

  // console.log(props.banks)


  return (
    <Box sx={{marginLeft:"50px", marginRight:"50px"}}>
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="left">S.N</StyledTableCell>
            <StyledTableCell align="left">Name of the Bank</StyledTableCell>
            <StyledTableCell align="left">KYC Access</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {props.banks.map((bank, index) => (
            <StyledTableRow
              key={bank.name}>
                {/* {console.log(bank.name,bank.address)} */}
              <StyledTableCell align="left">{index+1}</StyledTableCell>
              <StyledTableCell align="left">{bank.name}</StyledTableCell>
              <StyledTableCell align="left"><Button size="small" variant="contained" onClick={()=>handleClick(bank.address)}>Grant Access</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default BasicTable;