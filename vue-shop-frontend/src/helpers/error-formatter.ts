import { AxiosError } from "axios";

const errorFormatter = (e: AxiosError): string[] => {
	// format error messages
	let errors = [];
	if (e?.response?.data?.errors && Array.isArray(e?.response?.data?.errors)) {
		errors = e.response.data.errors;
	} else if (e?.response?.data?.message) {
		errors = [e?.response?.data?.message];
	} else if (e?.code === "401") {
		errors = ["Sie sind nicht berechtigt auf diese Ressourcen zuzugreifen."];
	} else {
		errors = ["Es ist ein unbekannter Fehler aufgetreten"];
	}
	return errors;
};

export default errorFormatter;
