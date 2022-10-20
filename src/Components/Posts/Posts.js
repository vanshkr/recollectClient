import React from 'react';
import Post from './Post/Post';
import useStyles from './style.js';
import {useSelector} from 'react-redux';
import {Grid,CircularProgress, Typography,Paper} from '@material-ui/core';

const Posts = ({setCurrentId})=>{
    const classes = useStyles();
    const {posts,isLoading} = useSelector((state)=>state.posts);
    if(!posts?.length && !isLoading)
      return (
        <Paper elevation={6} style={{ padding: '20px', borderRadius: '15px',height:'220px' }}>
        <Typography variant = 'h4' align='center'> No Posts Available</Typography>
      </Paper>
      );
    return(
        isLoading? <CircularProgress/>:(
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts?.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                <Post post={post} setCurrentId = {setCurrentId}  />
              </Grid>
            ))}
          </Grid>
        )
    )
};

export default Posts;