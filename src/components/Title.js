
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TypoGraphy from '@material-ui/core/TypoGraphy';
import { inherits } from 'util';



const styles = {
  root: {
        display: 'flex',
    flex: 'wrap',
    flexDirection: "column",
    padding: '8px 20px 8px 20px',
    alignItems: "center",
    backgroundColor: "#4648aa",
    color: "white"
   

  },
  title: {
  
  },

}


  function Title(props){
   const { classes } = props;

    return (
      <div className={classes.root}>

      <TypoGraphy  variant="h4" 
      color="inherit"
      >
      Focusalarm 
       </TypoGraphy>
      <TypoGraphy className={classes.root} variant="h6" color="inherit">An alarm for Focusmate</TypoGraphy>


 </div>
    );
  
    }

Title.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Title);





