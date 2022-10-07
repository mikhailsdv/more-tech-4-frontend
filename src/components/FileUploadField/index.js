import React, {useCallback} from "react"
import classnames from "classnames"

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded"

import styles from "./index.module.scss"

const FileUploadField = props => {
	const {
		onChange,
		value,
		accept,
		placeholder,
		name,
		className,
		classes = {},
	} = props

	const onDrop = useCallback(
		e => {
			const file = e.target?.files?.[0]
			onChange(file)
		},
		[onChange]
	)

	return (
		<div className={classnames(styles.root, className, classes.root)}>
			<input
				className={styles.input}
				type="file"
				name={name}
				value=""
				onChange={onDrop}
				accept={accept}
			/>
			<div className={styles.dropArea} data-active={!value}>
				{placeholder}
			</div>
			<div className={styles.droppedFilesContainer}>
				{value && (
					<div
						className={styles.droppedFile}
						key={`${value.name} ${value.size}`}
					>
						<DescriptionRoundedIcon className={styles.fileIcon} />
						{value.name.length > 30
							? `${value.name.substr(0, 28)}...`
							: value.name}
					</div>
				)}
			</div>
		</div>
	)
}

export default FileUploadField
