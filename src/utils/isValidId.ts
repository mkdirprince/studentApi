import { validate } from "uuid";

export const isValidId = (id: string) => {
	return validate(id);
};
