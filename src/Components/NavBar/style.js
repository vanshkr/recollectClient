import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 10px',
    [theme.breakpoints.down('sm')]: {
      borderRadius:5,
      justifyContent: 'space-evenly',
      margin: '5px 0',
      padding: '5px 10px',
    },
  },
  heading: {
    color: 'dark-grey', 
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
    [theme.breakpoints.down('sm')]: {
      marginLeft:'5px',
    },

  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '300px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '300px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));