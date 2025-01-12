import React, { useState, useEffect } from 'react';
import { Button, createTheme, IconButton, ThemeProvider } from '@mui/material';
import { Close, Info, OpenInNew, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Fetch from '../../scripts/Fetch';

import classes from './NavMenu.module.css';
import MainNavButton from '../ui/MainNavButton';
import CampaignDisplay from '../ui/CampaignDisplay';
import InfoCard from '../ui/InfoCard';

export default function NavMenu({ Mobile, OnChoice, CompactMode }) {
	const [searchInputVal, setSearchInputVal] = useState('');
	const [campaign, setCampaign] = useState('Loading');

	useEffect(() => {
		Fetch('/campaigns/main').then(fetchedCampaign => setCampaign(fetchedCampaign));
	}, []);

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: "#cccccc",
			}
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontFamily: `"Inter", sans-serif`,
						fontWeight: 600,
						justifyContent: "space-between",
						padding: "0.9rem 1.5rem",
						width: "100%",
						borderRadius: "0.5rem",
						border: "1px solid rgba(255, 255, 255, 0.1)",
						color: "#999999",
						marginTop: "1rem",
					},
				},
			},
		},
	});

	const searchButtonTheme = createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontFamily: `"Inter", sans-serif`,
						fontWeight: 600,
						padding: "0.9rem 0.8rem",
						width: "100%",
						borderRadius: "0.5rem",
						background: "#17191c",
						border: "1px solid rgba(255, 255, 255, 0.1)",
						color: "#cccccc",
					},
				},
			},
		},
	});

	return (
		<div className={ Mobile ? classes.flexDivMobile : classes.flexDiv }>
			<div>
				{
					Mobile &&
					<div className={classes.mobileMenuCloseContainer}>
						<IconButton size="small" onClick={OnChoice} aria-label="close menu">
							<Close fontSize="small" />
						</IconButton>
					</div>
				}
				<MainNavButton OnClick={() => Mobile && OnChoice()} To="/" CompactMode={CompactMode} />
				<ThemeProvider theme={darkTheme}>
					<div className={classes.navMenuInner}>
						<table className={classes.searchTableOuter}>
							<tbody>
								<tr className={classes.removeSearchTableBorder}>
									<th className={classes.searchBoxContainer}>
										<input type="text" onChange={e => setSearchInputVal(e.target.value)} className={classes.searchInput} placeholder="Search" />
									</th>
									<th>
										<ThemeProvider theme={searchButtonTheme}>
											<Button aria-label="search" onClick={() => window.open(`https://www.google.com/search?q=site:sebdoe.com%20${encodeURIComponent(searchInputVal)}`)}>
												<Search fontSize="small" />
											</Button>
										</ThemeProvider>
									</th>
								</tr>
							</tbody>
						</table>
						<Link to="/about" aria-label="about" onClick={() => Mobile && OnChoice()} style={{ textDecoration: 'none' }}>
							<Button aria-label="about">
								<span style={{ color: "#9ea4b0" }}>About This Blog</span>
								<Info fontSize="small" style={{ color: "#9ea4b0" }} />
							</Button>
						</Link>
						<a href="https://doe.lc/" aria-label="personal website" target="_blank" rel="noreferrer" onClick={() => Mobile && OnChoice()} style={{ textDecoration: 'none' }}>
							<Button aria-label="personal website">
								<span style={{ color: "#74ba74" }}>Personal Website</span>
								<OpenInNew fontSize="small" style={{ color: "#74ba74" }} />
							</Button>
						</a>
					</div>
				</ThemeProvider>
			</div>
			{ campaign === 'Loading' ? <InfoCard Loading>Loading</InfoCard> :
				<CampaignDisplay CampaignID={campaign.id} SiteName={campaign.name} Description={campaign.description} Type={campaign.type === 'ref' ? 'referral' : 'affiliate'} Mobile={Mobile} OnChoice={OnChoice} />
			}
		</div>
	)
}
