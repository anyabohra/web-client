'use client'

import ExportedImage from "next-image-export-optimizer";
import githubMark from "../../../public/static/images/github-mark.png"
import {useState, useEffect} from "react";
import {Grid, Box, Container, Divider} from "@mui/material";
import styles from "../../app/page.module.css"
import {Poppins} from "next/font/google";
import Link from "next/link";

import PelicanLogo from "../../../public/static/images/PelicanPlatformLogo_Icon.png"
import {Typography} from "@mui/material";

export const Header = () => {

	let [scrolledTop, setScrolledTop] = useState(true);

	useEffect(() => {
		setScrolledTop(window.scrollY < 50);
		addEventListener("scroll", (event) => {
			setScrolledTop(window.scrollY < 50);
		});
	}, [])

	return (
		<div className={`${styles.header} ${scrolledTop ? styles.headerScrolled : ""}`} style={{
			display: "flex",
			justifyContent: "space-between",
			padding: "1rem",
			position: "relative",
			zIndex: "1",
			width: "100%",
			overflow: "hidden"
		}}>
			<Box display={"flex"}>
				<Link href={"/"}>
					<Box style={{display: "flex"}}>
						<ExportedImage src={PelicanLogo} alt={"Pelican Logo"} height={36}/>
						<Typography variant={"h5"} pl={1} my={"auto"}>Web Client Example</Typography>
					</Box>
				</Link>
			</Box>

			<div>
				<a href={"https://github.com/PelicanPlatform"}>
					<ExportedImage
							src={githubMark}
							alt={"Github Mark"}
							height={32}
					/>
				</a>
			</div>
		</div>
	)
}