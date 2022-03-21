import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: ({ force, height = '100%' }) => force ? '100vh' : height,
    width: '100%'
  }
});