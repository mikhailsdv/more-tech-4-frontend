import React, {forwardRef} from "react"

import Template from "./utils/Template"

export default forwardRef((props, ref) => <Template
	ref={ref}
	tags={["none"]}
	{...props}
>
	<path d="M12.9214 3.13726C12.7931 3.02446 12.6233 2.97766 12.459 3.01006L3.459 4.81013C3.19237 4.86293 3 5.11014 3 5.39936V18.5999C3 18.8879 3.19237 19.1363 3.459 19.1891L12.459 20.9892C12.4928 20.9964 12.5288 21 12.5625 21C12.6919 21 12.8201 20.952 12.9214 20.862C13.0508 20.748 13.125 20.5776 13.125 20.4V3.59928C13.125 3.42047 13.0508 3.25127 12.9214 3.13726ZM12 19.6763L4.125 18.1019V5.89738L12 4.32291V19.6763Z"/>
	<path d="M20.4375 5.39936H12.5625C12.252 5.39936 12 5.66817 12 5.99938C12 6.33059 12.252 6.59941 12.5625 6.59941H19.875V17.3999H12.5625C12.252 17.3999 12 17.6687 12 17.9999C12 18.3311 12.252 18.5999 12.5625 18.5999H20.4375C20.748 18.5999 21 18.3311 21 17.9999V5.99938C21 5.66817 20.748 5.39936 20.4375 5.39936Z"/>
	<path d="M14.8125 7.79946H12.5625C12.252 7.79946 12 8.06827 12 8.39948C12 8.73069 12.252 8.99951 12.5625 8.99951H14.8125C15.123 8.99951 15.375 8.73069 15.375 8.39948C15.375 8.06827 15.123 7.79946 14.8125 7.79946Z"/>
	<path d="M14.8125 10.1996H12.5625C12.252 10.1996 12 10.4684 12 10.7996C12 11.1308 12.252 11.3996 12.5625 11.3996H14.8125C15.123 11.3996 15.375 11.1308 15.375 10.7996C15.375 10.4684 15.123 10.1996 14.8125 10.1996Z"/>
	<path d="M14.8125 12.5997H12.5625C12.252 12.5997 12 12.8685 12 13.1997C12 13.5309 12.252 13.7997 12.5625 13.7997H14.8125C15.123 13.7997 15.375 13.5309 15.375 13.1997C15.375 12.8685 15.123 12.5997 14.8125 12.5997Z"/>
	<path d="M14.8125 14.9998H12.5625C12.252 14.9998 12 15.2686 12 15.5998C12 15.931 12.252 16.1998 12.5625 16.1998H14.8125C15.123 16.1998 15.375 15.931 15.375 15.5998C15.375 15.2686 15.123 14.9998 14.8125 14.9998Z"/>
	<path d="M18.1875 7.79946H17.0625C16.752 7.79946 16.5 8.06827 16.5 8.39948C16.5 8.73069 16.752 8.99951 17.0625 8.99951H18.1875C18.498 8.99951 18.75 8.73069 18.75 8.39948C18.75 8.06827 18.498 7.79946 18.1875 7.79946Z"/>
	<path d="M18.1875 10.1996H17.0625C16.752 10.1996 16.5 10.4684 16.5 10.7996C16.5 11.1308 16.752 11.3996 17.0625 11.3996H18.1875C18.498 11.3996 18.75 11.1308 18.75 10.7996C18.75 10.4684 18.498 10.1996 18.1875 10.1996Z"/>
	<path d="M18.1875 12.5997H17.0625C16.752 12.5997 16.5 12.8685 16.5 13.1997C16.5 13.5309 16.752 13.7997 17.0625 13.7997H18.1875C18.498 13.7997 18.75 13.5309 18.75 13.1997C18.75 12.8685 18.498 12.5997 18.1875 12.5997Z"/>
	<path d="M18.1875 14.9998H17.0625C16.752 14.9998 16.5 15.2686 16.5 15.5998C16.5 15.931 16.752 16.1998 17.0625 16.1998H18.1875C18.498 16.1998 18.75 15.931 18.75 15.5998C18.75 15.2686 18.498 14.9998 18.1875 14.9998Z"/>
	<path d="M10.7366 14.0049L6.79912 9.20471C6.59212 8.9539 6.23775 8.9299 6.00487 9.14831C5.77087 9.36672 5.74725 9.74594 5.952 9.99435L9.8895 14.7945C10.0009 14.9302 10.1561 14.9998 10.3125 14.9998C10.4441 14.9998 10.5757 14.9506 10.6838 14.8509C10.9177 14.6325 10.9414 14.2545 10.7366 14.0049Z"/>
	<path d="M10.6579 8.52669C10.4126 8.32148 10.0594 8.37068 9.86812 8.63109L5.93062 14.0313C5.7405 14.2929 5.78438 14.6709 6.02963 14.8737C6.13313 14.959 6.25463 14.9998 6.375 14.9998C6.5415 14.9998 6.708 14.9206 6.81825 14.7693L10.7558 9.36912C10.947 9.10631 10.9031 8.72949 10.6579 8.52669Z"/>
</Template>)