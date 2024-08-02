'use client'
import { Box, Typography, Button, Modal, TextField, Input, IconButton } from '@mui/material';
import { Stack } from '@mui/material';
import { firestore } from '@/firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { CaptureImage } from './CaptureImage.js';  // Updated import
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { classifyImage } from './classifyImage.js';  // Correct import path

// Define styles
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 400 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  position: 'relative'
};

const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  backgroundColor: 'black', // Set background color to navy blue
  color: 'white' // Set text color to white for better contrast
};

const headerStyle = {
  width: { xs: "100%", sm: "800px" },
  height: "100px",
  bgcolor: '#ADD8E6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const pantryBoxStyle = {
  width: { xs: "100%", sm: "800px" },
  height: "350px",
  spacing: 2,
  overflow: 'auto',
  bgcolor: '#f0f0f0'
};

const pantryItemStyle = {
  minHeight: "150px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  bgcolor: "#f0f0f0",
  paddingX: 5
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [open, setOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCameraOpen = () => setCameraOpen(true)
  const handleCameraClose = () => setCameraOpen(false)

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    // Check if exists
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + quantity });
      return;
    } else {
      await setDoc(docRef, { count: quantity });
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    await deleteDoc(docRef);
    await updatePantry();
  };

  const filteredPantry = pantry.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCapture = async (imageSrc) => {
        try {
          // Call classifyImage to get the item name from the image
          const itemName = await classifyImage(imageSrc);
    
          // Set the item name to the state and open the modal to specify the quantity
          setItemName(itemName);
          setCameraOpen(false);
          handleOpen();
        } catch (error) {
          console.error("Error classifying image:", error);
        }
      };

  return (
    <Box sx={containerStyle}>
      {/* Pantry Tracker */}
      <Typography variant="h1" textAlign="center" mb={4} sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}>
        Track The Items In Your Pantry
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={4} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Button variant="contained" onClick={handleOpen}>
          ADD ITEM
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: { xs: '100%', sm: '300px' },
            '& .MuiInputBase-input': {
              color: 'white', // Change the input text color to white
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // Change the border color to white
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // Change the border color to white when hovered
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Change the label text color to white
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // Change the border color to white when focused
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white', // Change the label text color to white when focused
            },
          }}
        />
      </Box>

      <Box border={'1px solid #333'} width={{ xs: '100%', sm: 'auto' }}>
        <Box sx={headerStyle}>
          <Typography variant={'h2'} color={'#333'} textAlign={'center'} fontFamily="'Courier New', Courier, monospace">
            Pantry Items
          </Typography>
        </Box>
        <Stack sx={pantryBoxStyle}>
          {filteredPantry.map(({ name, count }) => (
            <Box
              key={name}
              sx={pantryItemStyle}
            >
              <Typography
                variant={'h3'}
                color={'#333'}
                textAlign={'center'}
                fontFamily="'Courier New', Courier, monospace"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography
                variant={'h3'}
                color={'#333'}
                textAlign={'center'}
                fontFamily="'Courier New', Courier, monospace"
              >
                QTY: {count}
              </Typography>
              <Button variant='contained' onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleCameraOpen}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CameraAltIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Input
              id="outlined-quantity"
              label="Quantity"
              type="number"
              inputProps={{ min: 1 }}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              sx={{ width: '100px' }}
            />
            <Button
              variant='contained'
              onClick={() => {
                addItem(itemName);
                setItemName('');
                setQuantity(1);
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        open={cameraOpen}
        onClose={handleCameraClose}
        aria-labelledby="camera-modal-title"
        aria-describedby="camera-modal-description"
      >
        <Box sx={style}>
          <CaptureImage onCapture={handleCapture} />
        </Box>
      </Modal>

    </Box>
  );
}

