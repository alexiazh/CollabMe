import { makeStyles } from '@mui/styles';

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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  paper: {
    margin: '10px',
    padding: '20px',
  },
  memberlist: {
    margin: '5px',
  }
}));