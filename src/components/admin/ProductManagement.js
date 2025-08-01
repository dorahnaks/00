import React, { useState, useEffect } from 'react';
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
  useMediaQuery,
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
  TableRow
} from '@mui/material';
import { Search, Add, Edit, Delete, Category, AttachMoney, Inventory, ShoppingCart, Filter, Sort, ViewModule, ViewList } from '@mui/icons-material';
import { themeColors } from '../../theme/Colors';

const ProductManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const categories = [
    { name: 'Fruits', color: themeColors.primary.main },
    { name: 'Vegetables', color: themeColors.status.success },
    { name: 'Juices', color: themeColors.secondary.main },
    { name: 'Salads', color: themeColors.accent.main },
    { name: 'Desserts', color: themeColors.status.warning },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Mock data for now
      setProducts([
        { id: 1, name: 'Fresh Apples', description: 'Crisp and juicy red apples', price: 2.99, category: 'Fruits', stock_quantity: 100, image: '/images/products/apple.jpg' },
        { id: 2, name: 'Organic Bananas', description: 'Sweet and ripe organic bananas', price: 1.49, category: 'Fruits', stock_quantity: 150, image: '/images/products/banana.jpg' },
        { id: 3, name: 'Fresh Oranges', description: 'Juicy and vitamin-rich oranges', price: 3.49, category: 'Fruits', stock_quantity: 80, image: '/images/products/orange.jpg' },
        { id: 4, name: 'Carrot Juice', description: 'Freshly squeezed carrot juice', price: 4.99, category: 'Juices', stock_quantity: 50, image: '/images/products/carrot-juice.jpg' },
        { id: 5, name: 'Garden Salad', description: 'Fresh mixed greens salad', price: 5.99, category: 'Salads', stock_quantity: 30, image: '/images/products/salad.jpg' },
        { id: 6, name: 'Mixed Berries', description: 'Assorted fresh berries', price: 6.99, category: 'Fruits', stock_quantity: 40, image: '/images/products/berries.jpg' },
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleOpen = (product = null) => {
    setCurrentProduct(product || { name: '', description: '', price: '', category: '', stock_quantity: 0 });
    setIsEditing(!!product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const handleSave = async () => {
    setSubmitting(true);
    try {
      if (isEditing) {
        setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
      } else {
        setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const getCategoryInfo = (categoryName) => {
    return categories.find(cat => cat.name === categoryName) || { color: themeColors.primary.main };
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
      <Paper sx={{ p: 2, mb: 3, borderRadius: '16px', boxShadow: themeColors.shadow.light }}>
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
                    <Search sx={{ color: themeColors.neutral.text.secondary }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  backgroundColor: themeColors.neutral.surface,
                  '&:hover': {
                    borderColor: themeColors.primary.main,
                  },
                  '&.Mui-focused': {
                    borderColor: themeColors.primary.main,
                    boxShadow: `0 0 0 2px rgba(46, 125, 50, 0.2)`,
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
                  boxShadow: themeColors.shadow.light,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-5px)', 
                    boxShadow: themeColors.shadow.hover,
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
                      <Inventory sx={{ color: themeColors.neutral.text.secondary }} />
                    </Badge>
                  </Box>
                  
                  <CardMedia
                    component="img"
                    image={product.image || '/images/product-placeholder.jpg'}
                    alt={product.name}
                    sx={{ 
                      height: 160, 
                      objectFit: 'cover',
                      position: 'relative'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Typography gutterBottom variant="h6" component="div" fontWeight="bold" color={themeColors.neutral.text.primary}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1, flexGrow: 1 }}>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Typography variant="h6" color={categoryInfo.color} fontWeight="bold">
                        ${product.price}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Inventory fontSize="small" sx={{ mr: 0.5, color: themeColors.neutral.text.secondary }} />
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
                    backgroundColor: themeColors.primary.lighter 
                  }}>
                    <IconButton 
                      onClick={() => handleOpen(product)} 
                      sx={{ 
                        color: themeColors.primary.main,
                        '&:hover': { backgroundColor: `${themeColors.primary.main}10` }
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(product.id)} 
                      sx={{ 
                        color: themeColors.status.error,
                        '&:hover': { backgroundColor: `${themeColors.status.error}10` }
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
        <Card sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: themeColors.shadow.light }}>
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead sx={{ backgroundColor: themeColors.primary.lighter }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Stock</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => {
                  const categoryInfo = getCategoryInfo(product.category);
                  return (
                    <TableRow key={product.id} hover sx={{ '&:hover': { backgroundColor: themeColors.primary.lighter } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box 
                            component="img"
                            src={product.image || '/images/product-placeholder.jpg'}
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
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: categoryInfo.color }}>
                          ${product.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Inventory fontSize="small" sx={{ mr: 0.5, color: themeColors.neutral.text.secondary }} />
                          <Typography variant="body2" color="textSecondary">
                            {product.stock_quantity}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => handleOpen(product)} 
                          sx={{ 
                            color: themeColors.primary.main,
                            '&:hover': { backgroundColor: `${themeColors.primary.main}10` }
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(product.id)} 
                          sx={{ 
                            color: themeColors.status.error,
                            '&:hover': { backgroundColor: `${themeColors.status.error}10` }
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
          background: themeColors.gradient.primary,
          '&:hover': {
            background: themeColors.primary.dark,
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
            boxShadow: themeColors.shadow.medium,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: themeColors.gradient.primary,
          color: themeColors.neutral.text.light,
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center'
        }}>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Product Name"
                type="text"
                fullWidth
                variant="outlined"
                value={currentProduct?.name || ''}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                value={currentProduct?.description || ''}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Price ($)"
                type="number"
                fullWidth
                variant="outlined"
                value={currentProduct?.price || ''}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="stock_quantity"
                label="Stock Quantity"
                type="number"
                fullWidth
                variant="outlined"
                value={currentProduct?.stock_quantity || ''}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Inventory sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
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
              </FormControl>
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
            sx={{ 
              background: themeColors.gradient.primary,
              '&:hover': { background: themeColors.primary.dark },
              borderRadius: '12px',
              px: 3,
              py: 1,
              fontWeight: 'bold'
            }}
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={20} /> : (isEditing ? 'Update' : 'Add')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;