import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AlertPopup = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const Item = () => {

  const [api, setApi] = useState([]);
  const [name, setName] = useState('');
  const [find, setFind] = useState('ditto');
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const getApi = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${find}`)
      const data = await response.json()
      setApi(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getApi()
  }, [find])

  const handleChange = (e) => {
    setName(e.target.value.toLowerCase())
  }

  const handleSubmit = () => {
    if( name !== '') setFind(name)
    setName('')
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToWishlist = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if(api.stats === undefined) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <div className="input-container">
        <div className="control">
          <input type="text"
            onChange={ handleChange }
            value={ name }
            placeholder="Find pokemons by name!"
          />
          <button
            onClick={ handleSubmit }
          >
            Search
          </button>
        </div>
      </div>
      <Card className='item-card' sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              { api.name[0].toUpperCase() }
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={api.name}
        />
        <CardMedia
          component="img"
          height="194"
          image={api.sprites?.other.home.front_default}
          alt={api.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Base_experience: {api.base_experience}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Height: {api.height}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Order: {api.order}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon
              onClick={() => addToWishlist(api.name)}
            />
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <AlertPopup onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  This is a success message!
                </AlertPopup>
              </Snackbar>
            </Stack>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Base_experience: {api.base_experience}
            </Typography>
            <Typography paragraph>
              Height: {api.height}
            </Typography>
            <Typography paragraph>
              Order: {api.order}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}

export default Item