import React from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import EmailIcon from '@mui/icons-material/Email';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InterestsIcon from '@mui/icons-material/Interests';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HandshakeIcon from '@mui/icons-material/Handshake';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, route: '/home' },
  { text: 'People', icon: <PeopleRoundedIcon />, route: '/people' },
  { text: 'INBOX', 
    icon: < EmailIcon/>, 
    route: '/mails',
    submenu: [ 
      { text: 'Email', icon: <ArchiveRoundedIcon />, route: '/email' },
      { text: 'Text', icon: <SendRoundedIcon />, route: '/text' },
      
    ],
  },
  {
    text: 'Market Place',
    icon: <InsightsRoundedIcon/>,
    submenu: [
      { text: 'Email-Marketing', icon: <ContactMailRoundedIcon/>, route: '/emailmarketing' },
      { text: 'Social Media-Marketing', icon: <InterestsIcon />, route: '/social media-marketing' },
    ],
  },
  { text: 'Tasks', icon: <AssignmentIcon />, route: '/tasks' },
  { text: 'Deals', icon: <HandshakeIcon />, route: '/deals' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, route: '/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, route: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, route: '/feedback' },
];

export default function MenuContent() {
  const [openSubmenu, setOpenSubmenu] = React.useState(null);
  const navigate = useNavigate();

  const handleToggle = (menuText) => {
    setOpenSubmenu(openSubmenu === menuText ? null : menuText);
  };

  const handleNavigation = (route) => {
      navigate(route);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => {
                  if (item.submenu) {
                    handleToggle(item.text);
                  } else {
                    handleNavigation(item.route);
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.submenu && (openSubmenu === item.text ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItemButton>
            </ListItem>
            {item.submenu && (
              <Collapse in={openSubmenu === item.text} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation(subItem.route)}>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => handleNavigation(item.route)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}