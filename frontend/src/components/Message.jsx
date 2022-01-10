import React from "react";
import { Alert } from "react-bootstrap";

const Message = (variant) => {
	return <Alert variant={variant.variant}>{variant.children}</Alert>;
};

Message.defaultProps = {
	variant: "info",
};

export default Message;
