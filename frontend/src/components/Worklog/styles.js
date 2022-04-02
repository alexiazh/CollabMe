import { makeStyles } from '@mui/styles';
import { grey, lime } from '@mui/material/colors';

export default makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paper: {
    margin: '20px',
    padding: '20px',
  }
}));