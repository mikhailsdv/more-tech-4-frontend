import React, {useState, useRef, useCallback, useEffect} from "react"
import {useLocation} from "react-router-dom"
import {useDebounce} from "use-debounce"
import {hasBlurSupport} from "../../js/utils"

import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import Link from "../Link"

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import CloseIcon from "@mui/icons-material/Close"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded"
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined"

import styles from "./index.module.scss"

const Header = props => {
	const {
		title = "Testnik.kz",
		showBookmarksIcon,
		showTopIcon,
		titleLinkHome,
		searchMode,
		onSearch,
		showLinkBack,
		nightModeEnabled,
		nightModeToggle,
		isOverscrolled,
	} = props

	const location = useLocation()

	const [searchQuery, setSearchQuery] = useState("")
	const [debouncedSearchQuery] = useDebounce(searchQuery, 1000)
	const inputEl = useRef()

	const onSearchQueryChange = useCallback(e => {
		const value = e.target.value.replace(/\s+/, " ")
		setSearchQuery(value)
	}, [])

	const clear = useCallback(() => {
		setSearchQuery("")
		onSearch("")
		inputEl.current.focus()
	}, [onSearch])

	useEffect(() => {
		onSearch && onSearch(debouncedSearchQuery.substr(0, 256).trim())
	}, [debouncedSearchQuery, onSearch])

	return (
		<header
			className={styles.root}
			data-overscrolled={isOverscrolled}
			data-disable-blur={!hasBlurSupport}
		>
			<div className={styles.container}>
				{searchMode ? (
					<>
						<SearchRoundedIcon className={styles.searchIcon} />
						<InputBase
							autoFocus
							placeholder="Поиск вопросов и предметов"
							classes={{
								root: styles.inputRoot,
								input: styles.inputInput,
							}}
							value={searchQuery}
							onChange={onSearchQueryChange}
							inputRef={inputEl}
						/>
						<IconButton
							className={styles.closeIcon}
							disabled={searchQuery.length === 0}
							onClick={clear}
						>
							<CloseIcon />
						</IconButton>
					</>
				) : (
					<>
						{showLinkBack && (
							<Link
								to="/"
								block
								internal
								className={styles.linkBack}
							>
								<KeyboardArrowLeftIcon
									className={styles.iconBack}
								/>
							</Link>
						)}
						<Typography
							noWrap
							variant="h6"
							color="inherit"
							className={styles.title}
						>
							{titleLinkHome ? (
								<Link to="/" block internal>
									{title}
								</Link>
							) : (
								title
							)}
						</Typography>

						{showBookmarksIcon && (
							<Link to="/bookmarks" block internal>
								<IconButton className={styles.icon}>
									{location.pathname === "/bookmarks" ? (
										<BookmarkIcon />
									) : (
										<BookmarkBorderIcon />
									)}
								</IconButton>
							</Link>
						)}
						{showTopIcon && (
							<Link to="/top" block internal>
								<IconButton className={styles.icon}>
									{location.pathname === "/top" ? (
										<EmojiEventsRoundedIcon />
									) : (
										<EmojiEventsOutlinedIcon />
									)}
								</IconButton>
							</Link>
						)}
						{nightModeEnabled !== undefined && (
							<IconButton
								className={styles.icon}
								onClick={nightModeToggle}
							>
								{nightModeEnabled ? (
									<DarkModeRoundedIcon />
								) : (
									<DarkModeOutlinedIcon />
								)}
							</IconButton>
						)}
					</>
				)}
			</div>
		</header>
	)
}

export default Header
