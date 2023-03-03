import { extendTheme } from "@chakra-ui/react";
import { ButtonsStyles as Button } from "./buttonStyles";

const components = { Button };
const values = { components };

export const theme = extendTheme(values);