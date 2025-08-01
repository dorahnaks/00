import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Grid, 
  IconButton,
  InputAdornment,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Chip
} from '@mui/material';
import { 
  Phone, 
  Email, 
  LocationOn, 
  Map, 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  Save,
  Cancel,
  Public,
  Language,
  ContactPhone
} from '@mui/icons-material';
import { themeColors } from '../../theme/Colors';

const ContactSettings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    location: '',
    mapLink: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      // Mock data for now
      setContactInfo({
        phone: '0700 000 000',
        email: 'contact@fruitdesign.com',
        location: 'Kampala, Uganda',
        mapLink: 'https://maps.google.com/?q=123+Fruit+Street',
        socialMedia: {
          facebook: 'https://facebook.com/fruitdesign',
          twitter: 'https://twitter.com/fruitdesign',
          instagram: 'https://instagram.com/fruitdesign',
          linkedin: 'https://linkedin.com/company/fruitdesign'
        }
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contact info:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleSocialChange = (platform, value) => {
    setContactInfo({
      ...contactInfo,
      socialMedia: {
        ...contactInfo.socialMedia,
        [platform]: value
      }
    });
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      // In a real app, you would save to backend here
      console.log('Saving contact info:', contactInfo);
      setIsEditing(false);
      alert('Contact information saved successfully!');
    } catch (error) {
      console.error('Error saving contact info:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    fetchContactInfo();
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} sx={{ color: themeColors.primary.main }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        pb: 2,
        borderBottom: `1px solid ${themeColors.neutral.divider}`
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: themeColors.primary.main }}>
            Contact Information Settings
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage how customers can reach your business
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ContactPhone sx={{ mr: 1, color: themeColors.secondary.main }} />
          <Typography variant="h6" sx={{ color: themeColors.secondary.main, fontWeight: 'bold' }}>
            Stay Connected
          </Typography>
        </Box>
      </Box>
      
      <Card sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: themeColors.shadow.light }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: themeColors.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <ContactPhone sx={{ mr: 1 }} />
                Contact Details
              </Typography>
              
              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                name="phone"
                value={contactInfo.phone}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                name="email"
                value={contactInfo.email}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Physical Location"
                name="location"
                value={contactInfo.location}
                onChange={handleChange}
                disabled={!isEditing}
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Google Maps Link"
                name="mapLink"
                value={contactInfo.mapLink}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Map sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: themeColors.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Public sx={{ mr: 1 }} />
                Social Media Links
              </Typography>
              
              <TextField
                fullWidth
                margin="normal"
                label="Facebook"
                value={contactInfo.socialMedia.facebook}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Facebook sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Twitter"
                value={contactInfo.socialMedia.twitter}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Twitter sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Instagram"
                value={contactInfo.socialMedia.instagram}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="LinkedIn"
                value={contactInfo.socialMedia.linkedin}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                disabled={!isEditing}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedIn sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: themeColors.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <Language sx={{ mr: 1 }} />
              Preview
            </Typography>
            
            {!isEditing ? (
              <Button 
                variant="contained" 
                onClick={() => setIsEditing(true)}
                sx={{ 
                  backgroundColor: themeColors.primary.main,
                  '&:hover': { backgroundColor: themeColors.primary.dark },
                  boxShadow: themeColors.shadow.light,
                  borderRadius: '12px',
                  px: 3,
                  py: 1
                }}
              >
                Edit Information
              </Button>
            ) : (
              <Box>
                <Button 
                  variant="outlined" 
                  onClick={handleCancel}
                  sx={{ 
                    mr: 2,
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    borderColor: themeColors.primary.main,
                    color: themeColors.primary.main
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleSave}
                  startIcon={<Save />}
                  sx={{ 
                    backgroundColor: themeColors.primary.main,
                    '&:hover': { backgroundColor: themeColors.primary.dark },
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    boxShadow: themeColors.shadow.light
                  }}
                  disabled={submitting}
                >
                  {submitting ? <CircularProgress size={20} /> : 'Save Changes'}
                </Button>
              </Box>
            )}
          </Box>
          
          <Card sx={{ 
            padding: 3, 
            mt: 3, 
            backgroundColor: themeColors.primary.lighter,
            borderRadius: '16px',
            border: `1px solid ${themeColors.primary.main}`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 1, color: themeColors.primary.main }} />
              <Typography>{contactInfo.phone}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1, color: themeColors.primary.main }} />
              <Typography>{contactInfo.email}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, color: themeColors.primary.main }} />
              <Typography>{contactInfo.location}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Map sx={{ mr: 1, color: themeColors.primary.main }} />
              <Typography 
                component="a" 
                href={contactInfo.mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: themeColors.primary.main, textDecoration: 'none', fontWeight: '500' }}
              >
                View on Google Maps
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Follow us on social media:
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton 
                component="a" 
                href={contactInfo.socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#3b5998',
                  backgroundColor: 'rgba(59, 89, 152, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(59, 89, 152, 0.2)' }
                }}
              >
                <Facebook />
              </IconButton>
              
              <IconButton 
                component="a" 
                href={contactInfo.socialMedia.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#1DA1F2',
                  backgroundColor: 'rgba(29, 161, 242, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(29, 161, 242, 0.2)' }
                }}
              >
                <Twitter />
              </IconButton>
              
              <IconButton 
                component="a" 
                href={contactInfo.socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#E1306C',
                  backgroundColor: 'rgba(225, 48, 108, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(225, 48, 108, 0.2)' }
                }}
              >
                <Instagram />
              </IconButton>
              
              <IconButton 
                component="a" 
                href={contactInfo.socialMedia.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: '#0077B5',
                  backgroundColor: 'rgba(0, 119, 181, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(0, 119, 181, 0.2)' }
                }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactSettings;