import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useTranslation } from 'react-i18next';
import { Badge, IconButton, Menu, MenuItem, Typography, Box, Divider, ListItemIcon, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell = () => {
  const { t } = useTranslation();
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications 
  } = useNotifications();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (notificationId, e) => {
    e.stopPropagation();
    markAsRead(notificationId);
  };

  const handleMarkAllAsRead = (e) => {
    e.stopPropagation();
    markAllAsRead();
  };

  const handleClearAll = (e) => {
    e.stopPropagation();
    clearNotifications();
  };

  const formatTimestamp = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.error('Error formatting timestamp:', error, timestamp);
      return '';
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        aria-controls={open ? 'notification-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        size="small"
      >
        <Badge 
          badgeContent={unreadCount > 0 ? unreadCount : null} 
          color="error"
          invisible={unreadCount === 0}
        >
          <NotificationsIcon fontSize="small" />
        </Badge>
      </IconButton>
      
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'notification-button',
          sx: { py: 0 }
        }}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: '320px',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {t('Notifications')}
          </Typography>
          <Box>
            {notifications.length > 0 && (
              <>
                <IconButton 
                  size="small" 
                  onClick={handleMarkAllAsRead} 
                  title={t('Mark all as read')}
                  disabled={notifications.every(n => n.isRead) || notifications.length === 0}
                  sx={{ color: 'primary.main' }}
                >
                  <DoneAllIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={handleClearAll} 
                  title={t('Clear all')}
                  color="error"
                >
                  <DeleteSweepIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
        
        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('No new notifications')}
            </Typography>
          </Box>
        ) : (
          notifications.map((notification) => (
            <MenuItem 
              key={notification.id}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
              sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: notification.isRead ? 'action.hover' : 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography 
                    variant="body2"
                    sx={{ 
                      fontWeight: notification.isRead ? 'normal' : '600',
                      color: notification.isRead ? 'text.secondary' : 'text.primary',
                      mb: 0.5
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMarkAsRead(notification.id, e)}
                    title={notification.isRead ? t('Mark as unread') : t('Mark as read')}
                    sx={{ ml: 1, color: notification.isRead ? 'primary.main' : 'action.active' }}
                  >
                    <CheckCircleIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography 
                    variant="caption" 
                    color={notification.isRead ? 'primary.main' : 'text.secondary'}
                    sx={{ 
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    {!notification.isRead && (
                      <CircleIcon color="primary" sx={{ fontSize: 8 }} />
                    )}
                    {formatTimestamp(notification.timestamp)}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationBell;