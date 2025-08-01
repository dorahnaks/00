import React, { useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  IconButton, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Box,
  Typography,
  InputAdornment,
  Chip,
  Avatar,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Badge
} from '@mui/material';
import { Search, Delete, MarkEmailRead, Reply, Star, RateReview, Message } from '@mui/icons-material';
import { themeColors } from '../../theme/Colors';

const initialFeedback = [
  { id: 1, customerId: 1, customerName: 'Faith', message: 'The fruits are always fresh and delicious!', submittedAt: '2023-05-15', status: 'Read' },
  { id: 2, customerId: 2, customerName: 'Jovia', message: 'Delivery was late but the quality was good.', submittedAt: '2023-05-16', status: 'Unread' },
  { id: 3, customerId: 3, customerName: 'Kemmy', message: 'Great variety of organic products. Highly recommend!', submittedAt: '2023-05-17', status: 'Unread' },
  { id: 4, customerId: 4, customerName: 'Joy', message: 'Love your juice selections! Could you add more sugar-free options?', submittedAt: '2023-05-18', status: 'Unread' },
  { id: 5, customerId: 1, customerName: 'John', message: 'Customer service is excellent. Had an issue with my last order and it was resolved quickly.', submittedAt: '2023-05-19', status: 'Read' },
];

const FeedbackManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [feedbacks, setFeedbacks] = useState(initialFeedback);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [response, setResponse] = useState('');

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpen = (feedback) => {
    setCurrentFeedback(feedback);
    setResponse('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentFeedback(null);
  };

  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
  };

  const markAsRead = (id) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, status: 'Read' } : f
    ));
  };

  const handleSendResponse = () => {
    // In a real app, you would send the response to the backend
    alert(`Response sent to ${currentFeedback.customerName}: ${response}`);
    handleClose();
  };

  const getStatusColor = (status) => {
    return status === 'Unread' ? 'warning' : 'success';
  };

  const getStatusIcon = (status) => {
    return status === 'Unread' ? <MarkEmailRead fontSize="small" /> : <RateReview fontSize="small" />;
  };

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
            Feedback Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Listen to your customers and improve your products
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Badge 
            badgeContent={feedbacks.filter(f => f.status === 'Unread').length}
            color="warning"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.75rem',
                height: '24px',
                minWidth: '24px',
                borderRadius: '12px',
              }
            }}
          >
            <RateReview sx={{ mr: 1, color: themeColors.secondary.main }} />
          </Badge>
          <Typography variant="h6" sx={{ color: themeColors.secondary.main, fontWeight: 'bold' }}>
            Customer Voices
          </Typography>
        </Box>
      </Box>
      
      {/* Search Bar */}
      <Card sx={{ mb: 3, borderRadius: '16px', boxShadow: themeColors.shadow.light }}>
        <CardContent sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search feedback..."
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
        </CardContent>
      </Card>
      
      {/* Feedback Table */}
      <Card sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: themeColors.shadow.light }}>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: themeColors.primary.lighter }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Message</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: themeColors.primary.dark }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback.id} hover sx={{ '&:hover': { backgroundColor: themeColors.primary.lighter } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        mr: 2, 
                        backgroundColor: themeColors.primary.main,
                        color: themeColors.neutral.text.light,
                        boxShadow: themeColors.shadow.light,
                        width: 48,
                        height: 48
                      }}>
                        {feedback.customerName.charAt(0)}
                      </Avatar>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        {feedback.customerName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {feedback.message.length > 50 
                        ? `${feedback.message.substring(0, 50)}...` 
                        : feedback.message}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {feedback.submittedAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      icon={getStatusIcon(feedback.status)}
                      label={feedback.status} 
                      color={getStatusColor(feedback.status)} 
                      size="small"
                      sx={{ 
                        fontWeight: 'bold',
                        borderRadius: '6px',
                        '& .MuiChip-icon': {
                          color: getStatusColor(feedback.status) === 'warning' ? themeColors.status.warning : themeColors.status.success,
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleOpen(feedback)} 
                      sx={{ 
                        color: themeColors.primary.main,
                        '&:hover': { backgroundColor: `${themeColors.primary.main}10` }
                      }}
                    >
                      <Reply />
                    </IconButton>
                    {feedback.status === 'Unread' && (
                      <IconButton 
                        onClick={() => markAsRead(feedback.id)} 
                        sx={{ 
                          color: themeColors.status.success,
                          '&:hover': { backgroundColor: `${themeColors.status.success}10` }
                        }}
                      >
                        <MarkEmailRead />
                      </IconButton>
                    )}
                    <IconButton 
                      onClick={() => handleDelete(feedback.id)} 
                      sx={{ 
                        color: themeColors.status.error,
                        '&:hover': { backgroundColor: `${themeColors.status.error}10` }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      
      {/* Feedback Dialog */}
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
          backgroundColor: themeColors.primary.main, 
          color: themeColors.neutral.text.light,
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center'
        }}>
          <RateReview sx={{ mr: 1 }} />
          Feedback Details
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {currentFeedback && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  mr: 2, 
                  backgroundColor: themeColors.primary.main,
                  color: themeColors.neutral.text.light,
                  boxShadow: themeColors.shadow.light,
                  width: 56,
                  height: 56
                }}>
                  {currentFeedback.customerName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {currentFeedback.customerName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Submitted on {currentFeedback.submittedAt}
                  </Typography>
                </Box>
              </Box>
              <Card sx={{ p: 2, mb: 2, backgroundColor: themeColors.primary.lighter, borderRadius: '12px' }}>
                <Typography variant="body1">{currentFeedback.message}</Typography>
              </Card>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Response"
                variant="outlined"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                sx={{ mt: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Message sx={{ color: themeColors.neutral.text.secondary }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '12px',
                  }
                }}
              />
            </Box>
          )}
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
            Close
          </Button>
          <Button 
            onClick={handleSendResponse} 
            variant="contained" 
            sx={{ 
              backgroundColor: themeColors.primary.main,
              '&:hover': { backgroundColor: themeColors.primary.dark },
              borderRadius: '12px',
              px: 3,
              py: 1,
              boxShadow: themeColors.shadow.light
            }}
          >
            Send Response
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeedbackManagement;