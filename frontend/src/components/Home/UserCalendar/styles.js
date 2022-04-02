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
  // form: {
  //   margin: '20px',
  // },
  // timepickers: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',  
  //   margin: '10px 0'
  // },
  // timepicker: {
  //   margin: '0 10px'
  // },
}));