import chrome from './chrome'
import firefox from './firefox'

export default process.env.__BROWSER__ === 'chrome' ? chrome : firefox
