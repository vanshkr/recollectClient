import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper,AppBar,TextField,Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../Actions/posts';
import  ChipInput from 'material-ui-chip-input';   
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import useStyles from './style';

function useQuery()
{
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = query.get('page')|| 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search,setSearch] = useState('');
  const [tags,setTags] = useState([]);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleKeyPres = (e) =>{
    if(e.keyCode === 13)
    {
      searchPost();
    }
  }
  const handleAddTag = (tag)=>{
    return setTags([...tags,tag]);
  }
  const handleDeleteTag = (tagToDelete)=> {
    return setTags(tags.filter((tag)=>tag !== tagToDelete ))
  }
  const searchPost = ()=>{
    if(search.trim() || tags)
    {
      dispatch(getPostsBySearch({search,tags:tags.join(',')}));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }
    else
      history.push('/')
  }
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField name="search" variant='outlined' 
                label="Seach Memories"
                fullWidth
                value={search}
                onKeyDown = {handleKeyPres}
                onChange={(e)=>setSearch(e.target.value)}
              />
              <ChipInput
                style = {{margin:`10px 0`}}
                value = {tags}
                onAdd={(tag)=>handleAddTag(tag)}
                onDelete={(tag)=>handleDeleteTag(tag)}
                label="Search Tags"
                variant = 'outlined'/>
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  color = 'primary'
                  variant = 'contained'>
                    Search
                </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length)&&(<Paper className={classes.pagination} elevation = {6}>
              <Paginate page={page} />
            </Paper>)}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;