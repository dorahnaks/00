// src/components/admin/CustomerProfile.js
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
  Badge
} from '@mui/material';
import { 
  Person, 
  Email, 
  Phone, 
  LocationOn, 
  Edit, 
  Save,
  Cancel,
  ShoppingBag,
  Favorite,
  History,
  Loyalty,
  Cake,
  LocalShipping
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const themeColors = {
  primary: '#8E24AA',         // Purple from logo
  primaryLight: '#AB47BC',     // Light purple
  primaryDark: '#6A1B9A',      // Dark purple
  primaryLighter: '#E1BEE7',   // Very light purple
  
  secondary: '#F57C00',       // Orange from logo
  secondaryLight: '#FF9800',  // Light orange
  secondaryDark: '#E65100',   // Dark orange
  
  accent: '#4CAF50',          // Fresh green
  accentLight: '#81C784',     // Light green
  accentDark: '#388E3C',      // Dark green
  
  background: '#F8F9FA',      // Light gray background
  surface: '#FFFFFF',         // White surface
  cardBg: '#FFFFFF',          // White card background
  textPrimary: '#212121',     // Primary text
  textSecondary: '#757575',   // Secondary text
  textLight: '#FFFFFF',       // White text
  border: '#E0E0E0',          // Border color
  divider: '#EEEEEE',         // Divider color
  
  success: '#4CAF50',         // Success green
  warning: '#FF9800',         // Warning orange
  error: '#F44336',           // Error red
  info: '#2196F3',            // Info blue
  
  shadowLight: '0 2px 8px rgba(0,0,0,0.08)',
  shadowMedium: '0 4px 16px rgba(0,0,0,0.12)',
  shadowHover: '0 8px 24px rgba(0,0,0,0.16)',
};

const CustomerProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { customerId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [customerData, setCustomerData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    joinDate: '',
    lastOrderDate: '',
    totalOrders: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
    preferences: {
      newsletter: true,
      notifications: true,
      specialOffers: true
    }
  });

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      // Mock data for now
      setCustomerData({
        id: customerId || '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, San Francisco, CA',
        joinDate: '2022-01-15',
        lastOrderDate: '2023-05-18',
        totalOrders: 24,
        totalSpent: 1256.75,
        loyaltyPoints: 350,
        preferences: {
          newsletter: true,
          notifications: true,
          specialOffers: true
        }
      });
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handlePreferenceChange = (key, value) => {
    setCustomerData({
      ...customerData,
      preferences: {
        ...customerData.preferences,
        [key]: value
      }
    });
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      // In a real app, you would save to backend here
      console.log('Saving customer data:', customerData);
      setIsEditing(false);
      alert('Customer profile updated successfully!');
    } catch (error) {
      console.error('Error saving customer profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    fetchCustomerData();
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} sx={{ color: themeColors.primary }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: themeColors.primary }}>
          Customer Profile
        </Typography>
        <Typography variant="body2" color="textSecondary">
          View and manage customer information
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Customer Overview Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: '16px', 
            boxShadow: themeColors.shadowLight,
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
              background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})` 
            }} />
            
            <CardContent sx={{ position: 'relative', zIndex: 1, pt: 8 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    border: `4px solid ${themeColors.surface}`,
                    boxShadow: themeColors.shadowMedium,
                    mb: 2
                  }}
                >
                  {customerData.name.charAt(0)}
                </Avatar>
                
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: themeColors.textPrimary }}>
                  {customerData.name}
                </Typography>
                
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Customer ID: #{customerData.id}
                </Typography>
                
                <Chip 
                  label="Loyal Customer" 
                  size="small"
                  icon={<Loyalty />}
                  sx={{ 
                    backgroundColor: `${themeColors.secondary}20`,
                    color: themeColors.secondary,
                    fontWeight: 'bold',
                    borderRadius: '6px'
                  }}
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 1, color: themeColors.textSecondary, fontSize: '1rem' }} />
                  <Typography variant="body2" color="textSecondary">
                    {customerData.email}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1, color: themeColors.textSecondary, fontSize: '1rem' }} />
                  <Typography variant="body2" color="textSecondary">
                    {customerData.phone}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1, color: themeColors.textSecondary, fontSize: '1rem' }} />
                  <Typography variant="body2" color="textSecondary">
                    {customerData.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Cake sx={{ mr: 1, color: themeColors.textSecondary, fontSize: '1rem' }} />
                  <Typography variant="body2" color="textSecondary">
                    Customer since: {customerData.joinDate}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant={isEditing ? "outlined" : "contained"}
                  startIcon={isEditing ? <Cancel /> : <Edit />}
                  onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                  sx={{ 
                    backgroundColor: isEditing ? 'transparent' : themeColors.primary,
                    color: isEditing ? themeColors.primary : themeColors.textLight,
                    borderColor: themeColors.primary,
                    '&:hover': { 
                      backgroundColor: isEditing ? `${themeColors.primary}10` : themeColors.primaryDark 
                    },
                    borderRadius: '12px',
                    px: 3,
                    py: 1
                  }}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Customer Details Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            borderRadius: '16px', 
            boxShadow: themeColors.shadowLight,
            height: '100%'
          }}>
            <CardHeader 
              title="Customer Information" 
              titleTypographyProps={{ fontWeight: 'bold', color: themeColors.textPrimary }}
              subheaderTypographyProps={{ color: 'textSecondary' }}
              action={
                isEditing && (
                  <Button 
                    variant="contained" 
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={submitting}
                    sx={{ 
                      backgroundColor: themeColors.primary,
                      '&:hover': { backgroundColor: themeColors.primaryDark },
                      borderRadius: '12px',
                      px: 3,
                      py: 1
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
                    value={customerData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: themeColors.textSecondary }} />
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
                    value={customerData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: themeColors.textSecondary }} />
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
                    value={customerData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: themeColors.textSecondary }} />
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
                    label="Address"
                    name="address"
                    value={customerData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn sx={{ color: themeColors.textSecondary }} />
                        </InputAdornment>
                      ),
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
        
        {/* Customer Stats Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: '16px', 
            boxShadow: themeColors.shadowLight
          }}>
            <CardHeader 
              title="Customer Statistics" 
              titleTypographyProps={{ fontWeight: 'bold', color: themeColors.textPrimary }}
              subheaderTypographyProps={{ color: 'textSecondary' }}
              avatar={
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '12px', 
                  background: `linear-gradient(135deg, ${themeColors.accent}, ${themeColors.primary})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: themeColors.shadowLight
                }}>
                  <ShoppingBag sx={{ color: themeColors.textLight }} />
                </Box>
              }
            />
            <Divider />
            <CardContent sx={{ p: 3 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingBag sx={{ color: themeColors.primary }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Total Orders" 
                    secondary={customerData.totalOrders}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Favorite sx={{ color: themeColors.secondary }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Total Spent" 
                    secondary={`$${customerData.totalSpent.toFixed(2)}`}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Loyalty sx={{ color: themeColors.accent }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Loyalty Points" 
                    secondary={customerData.loyaltyPoints}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <History sx={{ color: themeColors.info }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Last Order Date" 
                    secondary={customerData.lastOrderDate}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Preferences Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: '16px', 
            boxShadow: themeColors.shadowLight
          }}>
            <CardHeader 
              title="Communication Preferences" 
              titleTypographyProps={{ fontWeight: 'bold', color: themeColors.textPrimary }}
              subheaderTypographyProps={{ color: 'textSecondary' }}
              avatar={
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '12px', 
                  background: `linear-gradient(135deg, ${themeColors.secondary}, ${themeColors.accent})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: themeColors.shadowLight
                }}>
                  <LocalShipping sx={{ color: themeColors.textLight }} />
                </Box>
              }
            />
            <Divider />
            <CardContent sx={{ p: 3 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Badge color={customerData.preferences.newsletter ? 'success' : 'default'}>
                      <Email />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Newsletter Subscription" 
                    secondary={customerData.preferences.newsletter ? 'Subscribed' : 'Not Subscribed'}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Badge color={customerData.preferences.notifications ? 'success' : 'default'}>
                      <Notifications />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Order Notifications" 
                    secondary={customerData.preferences.notifications ? 'Enabled' : 'Disabled'}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Badge color={customerData.preferences.specialOffers ? 'success' : 'default'}>
                      <Favorite />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Special Offers" 
                    secondary={customerData.preferences.specialOffers ? 'Enabled' : 'Disabled'}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerProfile;