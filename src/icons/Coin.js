import React, {forwardRef} from "react"

import Template from "./utils/Template"

export default forwardRef((props, ref) => {
	const id = `id${Math.random().toString(32)}`
	return (
		<Template ref={ref} tags={["none"]} {...props}>
			<g clipPath={`url(#${id})`}>
				<path
					d="M10 0C4.50391 0 0 4.50391 0 10C0 15.4961 4.50391 20 10 20C15.4961 20 20 15.4961 20 10C20 4.50391 15.4961 0 10 0Z"
					fill="#FFDA2D"
				/>
				<path
					d="M20 10C20 15.4961 15.4961 20 10 20V0C15.4961 0 20 4.50391 20 10Z"
					fill="#FDBF00"
				/>
				<path
					d="M10 2.34375C5.80465 2.34375 2.34375 5.80465 2.34375 10C2.34375 14.1953 5.80465 17.6562 10 17.6562C14.1954 17.6562 17.6562 14.1953 17.6562 10C17.6562 5.80465 14.1954 2.34375 10 2.34375Z"
					fill="#FDBF00"
				/>
				<path
					d="M17.6562 10C17.6562 14.1953 14.1954 17.6562 10 17.6562V2.34375C14.1954 2.34375 17.6562 5.80465 17.6562 10Z"
					fill="#FF9100"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M6.6866 6L6.01453 8.00034H15.3279L16 6H6.6866ZM5.67829 9.00006L5.00622 10.9999H14.3196L14.9917 9.00006H5.67829ZM4.67207 12.0001L4 14H13.3134L13.985 12.0001H4.67207Z"
					fill="#009FDF"
				/>
			</g>
			<defs>
				<clipPath id={id}>
					<rect width="20" height="20" fill="white" />
				</clipPath>
			</defs>
		</Template>
	)
})
