import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CapitecLogoTransparent from '../assets/capitec-logo.svg';

export default function AppHeader() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <img src={CapitecLogoTransparent} className="logo react" alt="React logo" />
      </Toolbar>
    </AppBar>
  )
}
