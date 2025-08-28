// src/components/admin/ProductManagement.js

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  TextField, 
  IconButton, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Box,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Paper,
  useTheme,
  Chip,
  Badge,
  Fab,
  Tooltip,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
  FormHelperText,
  Divider,
  Avatar,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Search, Add, Edit, Delete, AttachMoney, Inventory, 
        ViewModule, ViewList, Save, Cancel, CloudUpload, ExpandMore } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import productAPI from '../../api/ProductAPI';

const ProductManagement = () => {
  const theme = useTheme();
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const [debugInfo, setDebugInfo] = useState(null);
  
  // Updated categories with green colors
  const categories = [
    { name: 'Fresh Fruits', color: '#4CAF50' },
    { name: 'Natural Juices', color: '#8BC34A' },
    { name: 'Dried Fruits', color: '#009688' },
    { name: 'Detox Juice Packages', color: '#00BCD4' },
  ];

  // Handle token expiration
  const handleTokenExpired = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  // Check token expiration and redirect if expired
  useEffect(() => {
    if (!token) {
      handleTokenExpired();
      return;
    }
    
    try {
      // Decode JWT to get expiration time
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // Convert to milliseconds
      
      // Check if token is already expired
      if (Date.now() > expiryTime) {
        handleTokenExpired();
        return;
      }
      
      // Set up a timer to check token expiration
      const timeUntilExpiry = expiryTime - Date.now();
      const timer = setTimeout(() => {
        handleTokenExpired();
      }, timeUntilExpiry);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error decoding token:', err);
      handleTokenExpired();
    }
  }, [token, handleTokenExpired]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const productsData = await productAPI.getAllProducts(token);
      setProducts(productsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response && error.response.status === 401) {
        handleTokenExpired();
      } else {
        setError('Failed to fetch products');
      }
    } finally {
      setLoading(false);
    }
  }, [token, handleTokenExpired]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleOpen = (product = null) => {
    setCurrentProduct(product || { 
      name: '', 
      description: '', 
      price: '', 
      category: '', 
      stock_quantity: 0,
      image_url: '',
      image: null,
      is_active: true,
      is_featured: false
    });
    setImagePreview(product && product.image_url ? `http://localhost:5000${product.image_url}` : '');
    setIsEditing(!!product);
    setFormErrors({});
    setOpen(true);
    setDebugInfo(null);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
    setImagePreview('');
    setDebugInfo(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setCurrentProduct(prevProduct => ({
        ...(prevProduct || { 
          name: '', 
          description: '', 
          price: '', 
          category: '', 
          stock_quantity: 0,
          image_url: '',
          image: null,
          is_active: true,
          is_featured: false
        }),
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCurrentProduct(prevProduct => ({
      ...prevProduct,
      image: null,
      image_url: ''
    }));
    setImagePreview('');
  };

  const validateForm = () => {
    if (!currentProduct) {
      setFormErrors({ general: 'No product data' });
      return false;
    }
    
    const errors = {};
    
    // Validate name
    if (!currentProduct.name || !currentProduct.name.trim()) {
      errors.name = 'Product name is required';
    } else if (currentProduct.name.trim().length < 2) {
      errors.name = 'Product name must be at least 2 characters';
    }
    
    // Validate price
    if (!currentProduct.price) {
      errors.price = 'Price is required';
    } else if (isNaN(currentProduct.price) || parseFloat(currentProduct.price) <= 0) {
      errors.price = 'Price must be a positive number';
    }
    
    // Validate category
    if (!currentProduct.category) {
      errors.category = 'Category is required';
    }
    
    // Validate stock quantity
    if (currentProduct.stock_quantity === undefined || currentProduct.stock_quantity === null) {
      errors.stock_quantity = 'Stock quantity is required';
    } else if (isNaN(currentProduct.stock_quantity) || parseInt(currentProduct.stock_quantity) < 0) {
      errors.stock_quantity = 'Stock quantity must be a non-negative number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!currentProduct || !validateForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      setDebugInfo(null);
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all required fields with proper string conversion
      formData.append('name', currentProduct.name.trim());
      formData.append('description', currentProduct.description ? currentProduct.description.trim() : '');
      formData.append('price', currentProduct.price.toString());
      formData.append('category', currentProduct.category);
      formData.append('stock_quantity', currentProduct.stock_quantity.toString());
      formData.append('is_active', currentProduct.is_active ? 'true' : 'false');
      formData.append('is_featured', currentProduct.is_featured ? 'true' : 'false');
      
      // Handle image properly
      if (currentProduct.image instanceof File) {
        formData.append('image', currentProduct.image);
      } else if (isEditing && currentProduct.image_url) {
        // For existing products with unchanged images
        formData.append('image_url', currentProduct.image_url);
      }
      
      // Debug: Log form data contents
      const debugData = {
        url: isEditing ? `${productAPI.updateProduct.toString()}/${currentProduct.id}` : productAPI.createProduct.toString(),
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        formData: {}
      };
      
      for (let pair of formData.entries()) {
        debugData.formData[pair[0]] = pair[1];
      }
      
      setDebugInfo(debugData);
      console.log('Form data being sent:', debugData);
      
      if (isEditing) {
        await productAPI.updateProduct(currentProduct.id, formData, token);
        setSuccess('Product updated successfully');
      } else {
        await productAPI.createProduct(formData, token);
        setSuccess('Product created successfully');
      }
      
      handleClose();
      fetchProducts();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error saving product:', err);
      
      // Enhanced error information
      const errorDetails = {
        message: err.message,
        stack: err.stack,
        response: err.response ? {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
          headers: err.response.headers
        } : null,
        request: err.request ? {
          method: err.request.method,
          url: err.request.url,
          headers: err.request.headers
        } : null
      };
      
      setDebugInfo(errorDetails);
      
      if (err.response && err.response.status === 401) {
        handleTokenExpired();
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to save product');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id, token);
        setSuccess('Product deleted successfully');
        fetchProducts();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error deleting product:', err);
        if (err.response && err.response.status === 401) {
          handleTokenExpired();
        } else {
          setError(err.response?.data?.error || 'Failed to delete product');
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prevProduct => ({
      ...(prevProduct || { 
        name: '', 
        description: '', 
        price: '', 
        category: '', 
        stock_quantity: 0,
        image_url: '',
        image: null,
        is_active: true,
        is_featured: false
      }),
      [name]: value
    }));
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const getCategoryInfo = (categoryName) => {
    return categories.find(cat => cat.name === categoryName) || { color: '#4CAF50' };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} sx={{ color: '#4CAF50' }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Success/Error Messages */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body1">{error}</Typography>
        </Alert>
      )}
      
      {/* Debug Information */}
      {debugInfo && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Debug Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="pre" sx={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
              {JSON.stringify(debugInfo, null, 2)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
      
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        pb: 2,
        borderBottom: `1px solid #e0e0e0`
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
            Product Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage your fresh fruit and juice products
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Grid View">
            <IconButton 
              onClick={() => setViewMode('grid')}
              color={viewMode === 'grid' ? 'primary' : 'default'}
            >
              <ViewModule />
            </IconButton>
          </Tooltip>
          <Tooltip title="List View">
            <IconButton 
              onClick={() => setViewMode('list')}
              color={viewMode === 'list' ? 'primary' : 'default'}
            >
              <ViewList />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#757575' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  backgroundColor: '#f9f9f9',
                  '&:hover': {
                    borderColor: '#4CAF50',
                  },
                  '&.Mui-focused': {
                    borderColor: '#4CAF50',
                    boxShadow: `0 0 0 2px rgba(76, 175, 80, 0.2)`,
                  },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
                sx={{
                  borderRadius: '12px',
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => {
            const categoryInfo = getCategoryInfo(product.category);
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: '16px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-5px)', 
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Category Badge */}
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12,
                    zIndex: 1
                  }}>
                    <Chip 
                      label={product.category}
                      size="small"
                      sx={{ 
                        backgroundColor: `${categoryInfo.color}20`,
                        color: categoryInfo.color,
                        fontWeight: 'bold',
                        borderRadius: '6px',
                        '& .MuiChip-label': {
                          px: 1,
                          color: categoryInfo.color,
                        }
                      }}
                    />
                  </Box>
                  
                  {/* Stock Badge */}
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    left: 12,
                    zIndex: 1
                  }}>
                    <Badge 
                      badgeContent={product.stock_quantity}
                      color={product.stock_quantity > 20 ? 'success' : 'warning'}
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.75rem',
                          height: '24px',
                          minWidth: '24px',
                          borderRadius: '12px',
                        }
                      }}
                    >
                      <Inventory sx={{ color: '#757575' }} />
                    </Badge>
                  </Box>
                  
                  <CardMedia
                    component="img"
                    image={product.image_url ? `http://localhost:5000${product.image_url}` : '/images/product-placeholder.jpg'}
                    alt={product.name}
                    sx={{ 
                      height: 160, 
                      objectFit: 'cover',
                      position: 'relative'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Typography gutterBottom variant="h6" component="div" fontWeight="bold" color="#333">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1, flexGrow: 1 }}>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Typography variant="h6" color={categoryInfo.color} fontWeight="bold">
                        UGX {parseFloat(product.price).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Inventory fontSize="small" sx={{ mr: 0.5, color: '#757575' }} />
                        <Typography variant="body2" color="textSecondary">
                          Stock: {product.stock_quantity}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <Box sx={{ 
                    p: 1, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    backgroundColor: '#f5f5f5'
                  }}>
                    <IconButton 
                      onClick={() => handleOpen(product)} 
                      sx={{ 
                        color: '#4CAF50',
                        '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(product.id)} 
                      sx={{ 
                        color: '#f44336',
                        '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Card sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.1)' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#4CAF50' }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#4CAF50' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#4CAF50' }}>Price (UGX)</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#4CAF50' }}>Stock</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#4CAF50' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => {
                  const categoryInfo = getCategoryInfo(product.category);
                  return (
                    <TableRow key={product.id} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box 
                            component="img"
                            src={product.image_url ? `http://localhost:5000${product.image_url}` : '/images/product-placeholder.jpg'}
                            alt={product.name}
                            sx={{ 
                              width: 50, 
                              height: 50, 
                              mr: 2,
                              borderRadius: '8px',
                              objectFit: 'cover'
                            }}
                          />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: '500' }}>
                              {product.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {product.description.length > 30 ? `${product.description.substring(0, 30)}...` : product.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={product.category}
                          size="small"
                          sx={{ 
                            backgroundColor: `${categoryInfo.color}20`,
                            color: categoryInfo.color,
                            fontWeight: 'bold',
                            borderRadius: '6px',
                            '& .MuiChip-label': {
                              px: 1,
                              color: categoryInfo.color,
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: categoryInfo.color }}>
                          UGX {parseFloat(product.price).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Inventory fontSize="small" sx={{ mr: 0.5, color: '#757575' }} />
                          <Typography variant="body2" color="textSecondary">
                            {product.stock_quantity}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => handleOpen(product)} 
                          sx={{ 
                            color: '#4CAF50',
                            '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(product.id)} 
                          sx={{ 
                            color: '#f44336',
                            '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
      
      {/* Floating Add Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpen()}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: '#4CAF50',
          '&:hover': {
            background: '#388E3C',
          }
        }}
      >
        <Add />
      </Fab>
      
      {/* Product Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: '#4CAF50',
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center'
        }}>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  name="name"
                  label="Product Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentProduct?.name || ''}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                    }
                  }}
                />
                
                <FormControl fullWidth error={!!formErrors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={currentProduct?.category || ''}
                    label="Category"
                    onChange={handleChange}
                    sx={{
                      borderRadius: '12px',
                    }}
                  >
                    {categories.map(category => (
                      <MenuItem key={category.name} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.category && <FormHelperText>{formErrors.category}</FormHelperText>}
                </FormControl>
                
                <TextField
                  name="price"
                  label="Price (UGX)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={currentProduct?.price || ''}
                  onChange={handleChange}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney sx={{ color: '#757575' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: '12px',
                    }
                  }}
                />
                
                <TextField
                  name="stock_quantity"
                  label="Stock Quantity"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={currentProduct?.stock_quantity || ''}
                  onChange={handleChange}
                  error={!!formErrors.stock_quantity}
                  helperText={formErrors.stock_quantity}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Inventory sx={{ color: '#757575' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: '12px',
                    }
                  }}
                />
              </Stack>
            </Grid>
            
            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={currentProduct?.description || ''}
                  onChange={handleChange}
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                    }
                  }}
                />
                
                <Divider />
                
                <Typography variant="subtitle1" fontWeight="bold">
                  Product Image
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {imagePreview ? (
                    <Avatar
                      src={imagePreview}
                      variant="rounded"
                      sx={{ 
                        width: 200, 
                        height: 200, 
                        mb: 2,
                        border: `1px solid #e0e0e0`
                      }}
                    />
                  ) : (
                    <Avatar
                      variant="rounded"
                      sx={{ 
                        width: 200, 
                        height: 200, 
                        mb: 2,
                        backgroundColor: '#f9f9f9',
                        border: `1px dashed #e0e0e0`
                      }}
                    >
                      <CloudUpload sx={{ fontSize: 60, color: '#bdbdbd' }} />
                    </Avatar>
                  )}
                  
                  <Stack direction="row" spacing={2}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="product-image-upload"
                    />
                    <label htmlFor="product-image-upload">
                      <Button 
                        variant="outlined" 
                        component="span"
                        startIcon={<CloudUpload />}
                        sx={{ borderRadius: '12px' }}
                      >
                        {imagePreview ? 'Change Image' : 'Upload Image'}
                      </Button>
                    </label>
                    
                    {imagePreview && (
                      <Button 
                        variant="outlined" 
                        color="error"
                        onClick={handleRemoveImage}
                        startIcon={<Cancel />}
                        sx={{ borderRadius: '12px' }}
                      >
                        Remove
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              borderRadius: '12px',
              px: 3,
              py: 1
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            startIcon={<Save />}
            sx={{ 
              background: '#4CAF50',
              '&:hover': { background: '#388E3C' },
              borderRadius: '12px',
              px: 3,
              py: 1,
              fontWeight: 'bold'
            }}
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={20} /> : (isEditing ? 'Update Product' : 'Add Product')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;