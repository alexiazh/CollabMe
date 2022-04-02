import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  appbar: {
    padding: '5px 20px',
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    cursor: 'pointer',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));