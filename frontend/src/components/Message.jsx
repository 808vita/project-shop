import React from "react";
import { Alert } from "react-bootstrap";

const Message = (variant) => {
	return <Alert variant={variant.variant}>{variant.childern}</Alert>;
};

Message.defaultProps = {
	variant: "info",
};

export default Message;
