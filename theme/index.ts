import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react"
import layerStyles from "./foundations/layerStyles"
import {foundations} from "@/theme/foundations";

const config = defineConfig({
    theme: {
        ...foundations,
        layerStyles,
    },
});

export default createSystem(defaultConfig, config);
