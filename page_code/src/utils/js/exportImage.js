/**
 * 导入所有图片并抛出图片集合
 * 
 */

const images = require.context('../image', false, /\.jpg|.png|.svg$/)
const modules = {}
images.keys().forEach((key) => {
	modules[key.replace(/(\.\/|\.jpg|.png|.svg)/g, '')] = images(key)
})

export default modules