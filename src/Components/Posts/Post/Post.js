import React from 'react';
import useStyles from './style.js';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../Actions/posts';
import { useHistory } from 'react-router-dom';
const Post = ({post,setCurrentId})=>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const Likes = ()=>{
      if(post.likes.length>0)
      {
        return post.likes.find((like)=> like === (user?.result?.sub || user?.result?._id))
        ?(
          <><ThumbUpAltIcon fontSize='small'/>&nbsp;{post.likes.length>2 ? `You and ${post.likes.length-1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : '' }`}  
          </>
        ):(
          <><ThumbUpAltOutlinedIcon fontSize='small'/>&nbsp;{post.likes.length}{post.likes.length === 1 ? 'Like': 'Likes'}
          </>
        )
      }
      return <>
      <ThumbUpAltOutlinedIcon fontSize='small'/>&nbsp;Like</>
    };

    const openPost = ()=> history.push(`/posts/${post._id}`);
    return(
      
        <Card className={classes.card} raised elevation={6}>
          <CardMedia className={classes.media} image={post.selectedFile||'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size="small" onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);}}><EditIcon fontSize="default" /></Button>
          </div>)}
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
          </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}><Likes/></Button>
          <Button size="small" color="primary" onClick={openPost}><InfoOutlinedIcon fontSize='small'/></Button>
          
          {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (<Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /></Button>)}
        </CardActions>
      </Card>
    )
};

export default Post;