import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GetUserById,GetImagesByOfferId } from "../../src/Fetch/index";
import {useState,useEffect} from "react";

const Cart = ({ offer }) => {
  const [ownerName, setOwnerName] = useState('');
  const [owner, setOwner] = useState({ name: '', phone: '' });
  const [ownerImages, setownerImages] = useState([]);
  const token = localStorage.getItem('token');
  const DescriptionText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1.4rem',
  }));
  
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

  useEffect(() => {
  

    const fetchOwnerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const ownerData = await GetUserById(token, offer.ownerId);
        const ownerImages = await GetImagesByOfferId(token, offer.id);
        setOwnerName(ownerData.fullName);
        setownerImages(ownerImages);
        const formattedPhoneNumbers = ownerData.phoneNumbers.map(phoneObj => phoneObj.phoneNumber).join(', ');
        setOwner({
          name: ownerData.fullName , // Default value if name is not present
          phone: formattedPhoneNumbers , // Default value if email is not present
        });// Adjust according to your API response
      } catch (err) {
        console.error('Failed to fetch owner data:', err);
      }
    }; 
    if (offer.ownerId) {
      fetchOwnerData();
    }
  }, [offer.ownerId, token]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={owner.name}
        subheader={owner.phone}
      />
      {ownerImages[0] && (
        <CardMedia
          component="img"
          height="194"
          image={ownerImages[0]}
          alt="Offer image"
        />
      )}
      <CardContent>
      <DescriptionText variant="h1" color="text.secondary">
          {offer.description}
        </DescriptionText>
      </CardContent>
    </Card>
  );
};

export default Cart;
