import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  mainContainer: {
    padding: '20px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    width: '100%',
    position: 'relative',
  },
  subheader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subCard: {
    flexDirection: 'row',
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));