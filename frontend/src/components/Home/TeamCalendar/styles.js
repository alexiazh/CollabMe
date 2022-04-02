import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },
  calendar: {
    width: '100%',
  },
}));