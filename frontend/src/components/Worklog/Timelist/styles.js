import { makeStyles } from '@mui/styles';
import { grey, lime } from '@mui/material/colors';

export default makeStyles(() => ({
  // container: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  paper: {
    margin: '20px',
    padding: '20px 30px',
  },
  card: {
    margin: '20px',
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logSection: {
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
  }
}));