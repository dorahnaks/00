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
  CardHeader,
  Avatar,
  useMediaQuery,
  useTheme,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  Person, 
  Email, 
  Phone, 
  LocationOn, 
  Edit, 
  Save,
  Cancel,
  Security,
  Notifications,
  Language,
  Cake,
  Work
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { themeColors } from '../../theme/Colors';

const AdminProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    location: '',
    bio: '',
    joinDate: '',
    lastLogin: '',
    preferences: {
      language: 'en',
      notifications: true,
      theme: 'light'
    }
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      // Mock data for now
      setProfileData({
        name: currentUser?.name || 'Admin User',
        email: currentUser?.email || 'admin@fruitdesign.com',
        phone: '+1 (555) 123-4567',
        position: 'System Administrator',
        department: 'IT',
        location: 'San Francisco, CA',
        bio: 'Experienced system administrator with expertise in managing fruit and juice business platforms.',
        joinDate: '2020-01-15',
        lastLogin: '2023-05-20',
        preferences: {
          language: 'en',
          notifications: true,
          theme: 'light'
        }
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePreferenceChange = (key, value) => {
    setProfileData({
      ...profileData,
      preferences: {
        ...profileData.preferences,
        [key]: value
      }
    });
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      // In a real app, you would save to backend here
      console.log('Saving profile data:', profileData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    fetchProfileData();
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: themeColors.primary.main }}>
          Admin Profile
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Manage your personal information and preferences
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Profile Overview Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: '16px', 
            boxShadow: themeColors.shadow.light,
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background gradient */}
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              height: 120, 
              background: themeColors.gradient.primary 
            }} />
            
            <CardContent sx={{ position: 'relative', zIndex: 1, pt: 8 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    border: `4px solid ${themeColors.neutral.surface}`,
                    boxShadow: themeColors.shadow.medium,
                    mb: 2
                  }}
                >
                  {profileData.name.charAt(0)}
                </Avatar>
                
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: themeColors.neutral.text.primary }}>
                  {profileData.name}
                </Typography>
                
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {profileData.position}
                </Typography>
                
                <Chip 
                  label={profileData.department} 
                  size="small"
                  sx={{ 
                    backgroundColor: `${themeColors.primary.main}20`,
                    color: themeColors.primary.main,
                    fontWeight: 'bold',
                    borderRadius: '6px'
                  }}
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 1, color: themeColors.neutral.text.secondary, fontSize: '1rem' }} />
                  <Typography variant="body2" color="textSecondary">
                    {profileData.email}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1, color: themeColors.neutral.text.secondary, fontSize: '1rem' }} />
                  <Typography variant="body2" color="textSecondary">
                    {profileData.phone}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1, color: themeColors.neutral.text.secondary, fontSize: '1rem' }} />
                  <Typography variant="body2" color="textSecondary">
                    {profileData.location}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Cake sx={{ mr: 1, color: themeColors.neutral.text.secondary, fontSize: '1rem' }} />
                  <Typography variant="body2" color="textSecondary">
                    Joined: {profileData.joinDate}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Work sx={{ mr: 1, color: themeColors.neutral.text.secondary, fontSize: '1rem' }} />
                  <Typography variant="body2" color="textSecondary">
                    Last login: {profileData.lastLogin}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant={isEditing ? "outlined" : "contained"}
                  startIcon={isEditing ? <Cancel /> : <Edit />}
                  onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                  sx={{ 
                    backgroundColor: isEditing ? 'transparent' : themeColors.gradient.primary,
                    color: isEditing ? themeColors.primary.main : themeColors.neutral.text.light,
                    borderColor: themeColors.primary.main,
                    '&:hover': { 
                      backgroundColor: isEditing ? `${themeColors.primary.main}10` : themeColors.primary.dark 
                    },
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    fontWeight: 'bold'
                  }}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Profile Details Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            borderRadius: '16px', 
            boxShadow: themeColors.shadow.light,
            height: '100%'
          }}>
            <CardHeader 
              title="Profile Information" 
              titleTypographyProps={{ fontWeight: 'bold', color: themeColors.neutral.text.primary }}
              subheaderTypographyProps={{ color: 'textSecondary' }}
              action={
                isEditing && (
                  <Button 
                    variant="contained" 
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={submitting}
                    sx={{ 
                      background: themeColors.gradient.primary,
                      '&:hover': { background: themeColors.primary.dark },
                      borderRadius: '12px',
                      px: 3,
                      py: 1,
                      fontWeight: 'bold'
                    }}
                  >
                    {submitting ? <CircularProgress size={20} /> : 'Save Changes'}
                  </Button>
                )
              }
            />
            <Divider />
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: themeColors.neutral.text.secondary }} />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: '12px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={profileData.email}
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
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={profileData.phone}
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
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={profileData.position}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Work sx={{ color: themeColors.neutral.text.secondary }} />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: '12px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={profileData.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      sx: {
                        borderRadius: '12px',
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
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
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    multiline
                    rows={3}
                    InputProps={{
                      sx: {
                        borderRadius: '12px',
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Preferences Card */}
        <Grid item xs={12}>
          <Card sx={{ 
            borderRadius: '16px', 
            boxShadow: themeColors.shadow.light
          }}>
            <CardHeader 
              title="Preferences" 
              titleTypographyProps={{ fontWeight: 'bold', color: themeColors.neutral.text.primary }}
              subheaderTypographyProps={{ color: 'textSecondary' }}
              avatar={
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '12px', 
                  background: themeColors.gradient.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: themeColors.shadow.light
                }}>
                  <Security sx={{ color: themeColors.neutral.text.light }} />
                </Box>
              }
            />
            <Divider />
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Language sx={{ mr: 1, color: themeColors.neutral.text.secondary }} />
                    <Typography variant="h6" color="textPrimary">
                      Language
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={profileData.preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      disabled={!isEditing}
                      sx={{
                        borderRadius: '12px',
                      }}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Notifications sx={{ mr: 1, color: themeColors.neutral.text.secondary }} />
                    <Typography variant="h6" color="textPrimary">
                      Notifications
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={profileData.preferences.notifications ? 'enabled' : 'disabled'}
                      onChange={(e) => handlePreferenceChange('notifications', e.target.value === 'enabled')}
                      disabled={!isEditing}
                      sx={{
                        borderRadius: '12px',
                      }}
                    >
                      <MenuItem value="enabled">Enabled</MenuItem>
                      <MenuItem value="disabled">Disabled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Security sx={{ mr: 1, color: themeColors.neutral.text.secondary }} />
                    <Typography variant="h6" color="textPrimary">
                      Theme
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={profileData.preferences.theme}
                      onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                      disabled={!isEditing}
                      sx={{
                        borderRadius: '12px',
                      }}
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="system">System Default</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminProfile;