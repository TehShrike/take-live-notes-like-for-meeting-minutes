import cheap_watch from 'cheap-watch'
import cp from 'child_process'

const watcher = new cheap_watch({
	dir: `./input`,
	filter({ path, stats }) {
		console.log(`approving`, path)
		return true
	},
})

watcher.init()

const [ ,, ...inputs ] = process.argv

watcher.on(`+`, () => {
	cp.execSync(inputs.join(` `), { encoding: `utf8` })
})
