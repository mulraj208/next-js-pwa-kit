import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react"
import layerStyles from "./foundations/layerStyles"

const config = defineConfig({
    theme: {
        layerStyles,
    },
});

export default createSystem(defaultConfig, config);
